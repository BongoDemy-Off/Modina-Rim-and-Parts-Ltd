const {chromium}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const path=require('node:path');
const output={runtime:process.version,pages:[]};
const safe=raw=>{try{const u=new URL(raw);return u.origin+u.pathname;}catch{return '[non-HTTP resource]';}};
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});output.browser=browser.version();
 try{
  for(const origin of ['https://modina-rim-and-parts-ltd.vercel.app','https://modinarimandpartsltd.netlify.app'])for(const route of ['/products','/gallery']){
   const record={url:origin+route,requests:[],failures:[],httpErrors:[],preventedWrites:[],errors:[]};output.pages.push(record);
   const context=await browser.newContext({viewport:{width:1440,height:900},hasTouch:false,isMobile:false});
   await context.addInitScript(()=>sessionStorage.setItem('modina_loaded','1'));
   await context.route('**/*',r=>{
    const q=r.request();if(['GET','HEAD','OPTIONS'].includes(q.method()))return r.continue();
    const u=new URL(q.url()),analytics=['www.google-analytics.com','www.google.com'].includes(u.hostname)&&u.pathname==='/g/collect';
    record.preventedWrites.push({url:safe(q.url()),method:q.method(),resourceType:q.resourceType(),action:analytics?'local 204 response':'abort'});
    return analytics?r.fulfill({status:204,body:''}):r.abort();
   });
   const page=await context.newPage();const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');const requests=new Map();
   cdp.on('Network.requestWillBeSent',e=>{const q={url:safe(e.request.url),resourceType:e.type,method:e.request.method};requests.set(e.requestId,q);record.requests.push(q);});
   cdp.on('Network.loadingFailed',e=>record.failures.push({...requests.get(e.requestId),error:e.errorText,blockedReason:e.blockedReason,cors:e.corsErrorStatus,canceled:e.canceled}));
   page.on('pageerror',e=>record.errors.push(e.message));
   page.on('response',r=>{if(r.status()>=400)record.httpErrors.push({url:safe(r.url()),status:r.status(),resourceType:r.request().resourceType()});});
   try{
    const start=Date.now();const response=await page.goto(origin+'/',{waitUntil:'domcontentloaded',timeout:30000});record.homeStatus=response.status();record.domcontentloadedMs=Date.now()-start;
    if(route==='/products')await page.locator('header').getByRole('link',{name:'Products',exact:true}).click();
    else {await page.locator('header').getByText('Media',{exact:true}).hover();await page.locator('header').getByRole('link',{name:'Gallery',exact:true}).click();}
    await page.waitForURL(record.url);record.spaURL=page.url();
    const target=page.locator(route==='/gallery'?'main img':'main .card-premium').first();await target.scrollIntoViewIfNeeded({timeout:15000});
    try{await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(i=>i.complete),{},{timeout:15000});record.imagesSettled=true;}catch{record.imagesSettled=false;}
    record.images=await page.locator('main img').evaluateAll(els=>els.map(i=>({url:(()=>{const u=new URL(i.currentSrc||i.src);return u.origin+u.pathname;})(),complete:i.complete,width:i.naturalWidth,alt:i.alt})));
   }catch(e){record.navigationError=e.message;}
   await context.close();fs.writeFileSync(path.join(__dirname,'external-spa-resources.json'),JSON.stringify(output,null,2));console.log(JSON.stringify({url:record.url,status:record.status,failures:record.failures,httpErrors:record.httpErrors,navigationError:record.navigationError}));
  }
 }finally{await browser.close();output.teardown={closedNormally:true};fs.writeFileSync(path.join(__dirname,'external-spa-resources.json'),JSON.stringify(output,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});
