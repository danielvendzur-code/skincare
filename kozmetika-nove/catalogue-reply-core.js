/* Catalogue-grounded replies share the advisor's category, availability and budget rules. */
globalThis.CXCatalogueReplyCore=(catalogues,slug,text)=>{
 const catalogue=catalogues[slug];if(!catalogue?.products?.length||!globalThis.CXAdvisorCore)return null;
 const core=globalThis.CXAdvisorCore, q=core.norm(text);
 if(/\bliec|vyliec|chorob|ekzem|rosacea|dermatit|\bliek\b/.test(q))return 'Otázku liečby kožného ochorenia riešte s lekárom. Môžem vám ukázať kozmetické produkty a odkazy na ich úplné zloženie.';
 if(/doprava|dorucen|reklamac|platba|otvarac|kontakt|adresa/.test(q))return null;
 const category=/licen|pudr|rten|ruz\b/.test(q)?'makeup':/brad|vous/.test(q)?'beard':/detsk|deti|dieta|babat|baby/.test(q)?'baby':/\bocny\b|\bocne\b|okolie oci/.test(q)?'eyes':/pery|rty|balzam na per/.test(q)?'lips':/svieck|svick|difuz|vone do dom/.test(q)?'home':/\bcaj\b/.test(q)?'tea':/dopln.*vyziv|vitamin|kapsul/.test(q)?'wellness':/vlas|samp|kondicion/.test(q)?'hair':/telov|telo|mydl|deodor|sprch|kupel|nohy|ruky/.test(q)?'body':/sada|sady|darcek|balicek/.test(q)?'sets':'face';
 const engine=core.create(catalogue.products);
 const generic=/^(?:prosim|prosimvas|hladam|chcem|potrebujem|odporucte|odporuc|produkt|produkty|krem|pletovy|plet|pokozku|serum|olej|maska|hydratacny|suchu|mastnu|citlivu|starostlivost)$/;
 const tokens=q.split(/[^\p{L}\p{N}]+/u).filter(t=>t.length>3&&!generic.test(t)&&!/^(hydratac|regenerac|vyziv|pletov|telov|such|mastn|citliv|vrask)/.test(t));
 const byName=engine.products.filter(p=>p.available!==false).map(p=>({p,score:tokens.filter(t=>core.norm(p.name).includes(t)).length})).sort((a,b)=>b.score-a.score);
 const uniqueToken=tokens.find(t=>t.length>=6&&byName.filter(x=>core.norm(x.p.name).includes(t)).length===1);
 const specific=byName[0]?.score>=2?byName[0].p:uniqueToken?byName.find(x=>core.norm(x.p.name).includes(uniqueToken))?.p:null;
 if(/zlozen|ingredien|obsahuj/.test(q)&&specific)return 'Úplné zloženie nájdete pri '+specific.name+': '+specific.url+'.';
 const profile=/such|pnut|dehydrat/.test(q)?'dry':/mast|maz|akne/.test(q)?'oily':/citliv|reakt/.test(q)?'sensitive':'any';
 const goal=/vrask|zrel|anti.?aging/.test(q)?'mature':/hydrat/.test(q)?'hydrate':/odlic|cisten/.test(q)?'clean':'any';
 const budget=q.match(/\bdo\s*(\d+(?:[.,]\d+)?)/)?.[1]?.replace(',','.');
 const currency=engine.products.find(p=>p.priceAmount)?.currency;
 if(budget&&currency==='CZK'&&/eur|€/.test(q))return 'Táto ponuka má ceny v Kč. Zadajte prosím rozpočet v Kč alebo vyberajte bez cenového limitu.';
 const answers={category:specific?.category||category,profile,goal,budget};
 const form=/\bkrem/.test(q)?/krem/:/\bserum|\bsera\b|\bserom/.test(q)?/ser/:/\bolej/.test(q)?/olej/:/\bmask/.test(q)?/mask/:null;
 if(form&&!specific&&!engine.categoryPool(answers).some(p=>form.test(core.norm(p.kind))))return 'Takúto formu produktu v tejto oblasti ponuky nemáme. Vyberte inú formu vo Výbere starostlivosti.';
 if(specific){answers.kind=specific.kind;answers.profile='any';answers.goal='any';}
 let rows=engine.recommend(answers).matches;if(form&&!specific)rows=rows.filter(p=>form.test(core.norm(p.kind)));
 if(specific&&rows.some(p=>p.id===specific.id))rows=[specific,...rows.filter(p=>p.id!==specific.id)];
 if(!rows.length)return 'V overenej ponuke sa nenašla táto kombinácia potrieb a rozpočtu. Skúste upraviť jednu podmienku vo Výbere starostlivosti.';
 if(/zlozen|ingredien|obsahuj/.test(q))return 'Úplné zloženie nájdete pri '+rows[0].name+': '+rows[0].url+'.';
 return rows.slice(0,2).map(p=>p.name+(p.volume&&p.volume!=='Balenie podľa e-shopu'?' ('+p.volume+')':'')+' — '+p.price+'. '+p.url).join('\n\n');
};
