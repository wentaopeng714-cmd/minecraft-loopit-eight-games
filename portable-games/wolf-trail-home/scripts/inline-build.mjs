import fs from 'node:fs';
import path from 'node:path';
const dist=path.resolve('dist');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const local=p=>{const f=path.resolve(dist,p.replace(/^\.\//,''));if(!f.startsWith(dist+path.sep))throw Error('Nonlocal build asset');return f;};
html=html.replace(/<script([^>]*?)src="([^"]+)"([^>]*)><\/script>/g,(_,before,src,after)=>{
 if(/^https?:/.test(src))throw Error('External runtime script is not portable');
 const code=fs.readFileSync(local(src),'utf8').replace(/<\/script/gi,'<\\/script');
 return '<script type="module">'+code+'</script>';
});
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,(_,href)=>'<style>'+fs.readFileSync(local(href),'utf8').replace(/<\/style/gi,'<\\/style')+'</style>');
html=html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g,'');
if(/<script[^>]*\bsrc=|<link[^>]*rel="stylesheet"/.test(html))throw Error('External build entry remains');
fs.writeFileSync(path.join(dist,'index.html'),html);
for(const name of fs.readdirSync(dist))if(!['index.html','THIRD_PARTY_NOTICES.txt'].includes(name))fs.rmSync(path.join(dist,name),{recursive:true,force:true});
console.log('Portable single HTML: '+Buffer.byteLength(html)+' bytes');
