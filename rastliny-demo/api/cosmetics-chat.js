import {getBrand} from '../catalogue-loader.mjs';
import {catalogueReply,tidy,rankProducts} from '../advisor.mjs';
import '../chat-brain.js';
import '../chat-adapters.js';
import {aiAnswer} from './ai-chat.js';
const adapters=new Map();

// Preserve the existing skincare endpoint. Product cards always come from the canonical catalogue.
export function createHandler({apiKey=process.env.ANTHROPIC_API_KEY,fetchImpl=fetch}={}) {
 return async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method_not_allowed'});}
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return res.status(400).json({error:'invalid_json'});}
  const brand=await getBrand(body?.demoId);
  if(!brand)return res.status(404).json({error:'unknown_demo'});
  const messages=Array.isArray(body?.messages)?body.messages.slice(-8).filter(m=>['user','assistant'].includes(m?.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,500)})):[];
  if(!messages.length||messages.at(-1).role!=='user'||!messages.at(-1).content.trim())return res.status(400).json({error:'user_message_required'});
  /* Conversation-aware catalogue answer first (named products, exclusions, changed budget, other options),
     then the advisor's answer; Claude answers the customer in its own words from the same verified data. */
  let draft=null,products=[];
  if(globalThis.CXChatBrain){if(!adapters.has(body.demoId))adapters.set(body.demoId,globalThis.CXChatBrain.adapters.plants(brand,{rankProducts,tidy}));const ad=adapters.get(body.demoId);ad._listed=[];draft=globalThis.CXChatBrain.reply(ad,messages.at(-1).content,messages);products=[...new Set(ad._listed)].slice(0,3);}
  if(!draft){const fallback=catalogueReply(brand,messages);draft=fallback.text;products=fallback.products;}
  const ai=await aiAnswer({family:'plants',brand:brand.name,web:brand.website,catalogue:brand,messages,draft,apiKey,fetchImpl,
   extra:['Jedovatosť pre zvieratá a deti, choroby a škodcov posudzujte iba podľa návrhu odpovede; nič k tomu nepridávajte zo všeobecných znalostí.']});
  return res.status(200).json({reply:ai||draft,products,mode:ai?'ai':'catalogue'});
 };
}
export default createHandler();
