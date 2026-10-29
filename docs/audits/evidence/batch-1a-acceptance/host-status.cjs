const {chromium}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');const fs=require('node:fs');const path=require('node:path');
(async()=>{const out=[];const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const origin of ['https://modina-rim-and-parts-ltd.vercel.app','https://modinarimandpartsltd.netlify.app']){
 const context=await browser.newContext();await context.route('**/*',r=>['GET','HEAD','OPTIONS'].includes(r.request().method())?r.continue():r.abort());const page=await context.newPage();
 for(const route of ['/','/products']){const record={url:origin+route};try{const r=await page.goto(record.url,{waitUntil:'domcontentloaded',timeout:30000});record.status=r.status();record.server=(await r.allHeaders()).server;record.body=(await page.locator('body').innerText()).slice(0,2000);if(route==='/')await page.screenshot({path:path.join(__dirname,new URL(origin).hostname+'-root.png')});}catch(e){record.error=e.message;}out.push(record);console.log(JSON.stringify(record));}
 await context.close();
}}finally{await browser.close();fs.writeFileSync(path.join(__dirname,'host-status.json'),JSON.stringify({pages:out,closedNormally:true},null,2));}})().catch(e=>{console.error(e);process.exitCode=1;});
