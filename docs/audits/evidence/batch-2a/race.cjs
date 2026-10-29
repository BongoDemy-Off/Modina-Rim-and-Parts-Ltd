const {chromium,expect}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs=require('node:fs');const path=require('node:path');
const out=[];const save=()=>fs.writeFileSync(path.join(__dirname,'race-results.json'),JSON.stringify(out,null,2));
const snapshot=page=>page.evaluate(()=>({metrics:batchHarness.metrics,dialog:[...document.querySelectorAll('dialog')].map(e=>({open:e.open,modal:e.matches(':modal'),html:e.innerHTML,styles:[...e.querySelectorAll('div,h2')].map(e=>({tag:e.tagName,style:e.getAttribute('style'),opacity:getComputedStyle(e).opacity,rect:e.getBoundingClientRect().toJSON()}))})),scroll:[document.documentElement.style.overflow,document.body.style.overflow]}));
(async()=>{const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const reducedMotion of ['no-preference','reduce']){
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion});page.setDefaultTimeout(6000);
 await page.goto('http://127.0.0.1:4193/docs/audits/evidence/batch-1a-acceptance/lifecycle-harness.html',{waitUntil:'domcontentloaded'});
 const record={reducedMotion,cycles:[]};out.push(record);
 try{for(let i=0;i<20;i++){
  await page.locator('#opener').click();await expect(page.locator('dialog[open]')).toHaveCount(1);
  await page.evaluate(()=>batchHarness.setOpen(false));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)));await page.evaluate(()=>batchHarness.setOpen(true));
  try{await expect.poll(()=>page.locator('#fixture-title').evaluate(el=>{for(let a=el;a instanceof HTMLElement;a=a.parentElement)if(Number(getComputedStyle(a).opacity)<.99)return false;return true;})).toBe(true);await expect(page.locator('dialog[open]')).toHaveCount(1);}
  catch(e){record.failure={cycle:i+1,error:e.message,state:await snapshot(page)};await page.screenshot({path:path.join(__dirname,'race-failure.png')});throw e;}
  await page.keyboard.press('Escape');await expect(page.locator('dialog[open]')).toHaveCount(0);record.cycles.push({cycle:i+1,passed:true});save();
 }record.passed=true;}catch(e){record.passed=false;console.error(e.message);}finally{await page.close();save();}
}}finally{const teardown=await Promise.race([browser.close().then(()=>({closedNormally:true})),new Promise(r=>setTimeout(()=>r({closedNormally:false,bounded:true,connected:browser.isConnected()}),15000))]);fs.writeFileSync(path.join(__dirname,'race-teardown.json'),JSON.stringify(teardown,null,2));save();}console.log(out.map(x=>({reducedMotion:x.reducedMotion,passed:x.passed,cycles:x.cycles.length,failure:x.failure?.cycle})));if(out.some(x=>!x.passed))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{setTimeout(()=>process.exit(process.exitCode||0),100).unref();});
