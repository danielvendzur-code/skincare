const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../kozmetika-nove'),expected={'advisor-core.js':'360d5490fbe0e2b9aad7e6b179ff51f022e34170210fda19e0c1367a10658ae8','catalogue-config.js':'640c1bd8887067e4795041fd1e1f01bd3eee9a3bc8add25cfc1086e1505cfa78'};
for(const [file,sha]of Object.entries(expected))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(root+'/releases/mydlitto-20261021/'+file)).digest('hex'),sha);
assert.ok(fs.readFileSync(root+'/advisor-boot.js','utf8').includes("slug==='mydlitto'&&/^\\/(advisor-core|catalogue-config)\\.js"));
console.log('PASS: older sent Mydlitto keeps the exact two shared modules from its current production ee5d22b.');
