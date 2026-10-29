const {chromium,expect}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');const fs=require('node:fs');const path=require('node:path');
(async()=>{const out=[];const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const origin of ['https://modina-rim-and-parts-ltd.vercel.app','https://modinarimandpartsltd.netlify.app']){
 const record={origin};out.push(record);const context=await browser.newContext({viewport:{width:1440,height:900}});
 await context.addInitScript(()=>sessionStorage.setItem('modina_loaded','1'));await context.route('**/*',r=>['GET','HEAD','OPTIONS'].includes(r.request().method())?r.continue():r.fulfill({status:204,body:''}));const page=await context.newPage();page.setDefaultTimeout(12000);
 try{const home=await page.goto(origin+'/',{waitUntil:'domcontentloaded',timeout:30000});record.homeStatus=home.status();
 const link=page.locator('header').getByRole('link',{name:'Products',exact:true});await link.click();await expect(page).toHaveURL(origin+'/products');await expect(page.locator('.card-premium').first()).toBeVisible();record.spaProducts=true;
 const response=await page.reload({waitUntil:'domcontentloaded',timeout:30000});record.reloadStatus=response.status();record.reloadBody=(await page.locator('body').innerText()).slice(0,700);
 }catch(e){record.error=e.message;}finally{await context.close();console.log(JSON.stringify(record));}
}}finally{await browser.close();fs.writeFileSync(path.join(__dirname,'host-routing.json'),JSON.stringify({cases:out,closedNormally:true},null,2));}})().catch(e=>{console.error(e);process.exitCode=1;});
