// Local static preview with the real server handler (no provider key required).
import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
import handler from '../api/cosmetics-chat.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const port=Number(process.env.PORT||8797);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 res.status=n=>{res.statusCode=n;return res;};res.json=value=>{res.setHeader('content-type','application/json');res.end(JSON.stringify(value));};
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/cosmetics-chat'){
  let chunks='';for await(const c of req){chunks+=c;if(chunks.length>8192)return res.status(413).json({error:'body_too_large'});}
  req.body=chunks;return handler(req,res);
 }
 try{
  let filename=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!filename.startsWith(root+path.sep)&&filename!==root)throw new Error('bad path');
  if((await fs.stat(filename)).isDirectory())filename=path.join(filename,'index.html');
  const content=await fs.readFile(filename);res.setHeader('content-type',types[path.extname(filename)]||'application/octet-stream');res.end(content);
 }catch{res.statusCode=404;res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Plant demos: http://127.0.0.1:${port}`));
