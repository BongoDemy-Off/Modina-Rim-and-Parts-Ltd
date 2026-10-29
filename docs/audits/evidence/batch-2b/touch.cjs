const {chromium,expect}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const result={cases:[],readiness:[]};const save=()=>fs.writeFileSync(path.join(__dirname,'touch-results.json'),JSON.stringify(result,null,2));
const ready=async locator=>{const start=Date.now();await expect(locator).toBeVisible();await expect.poll(async()=>{const values=await locator.evaluate(el=>{const out=[];for(let a=el;a instanceof HTMLElement;a=a.parentElement)out.push({tag:a.tagName,opacity:getComputedStyle(a).opacity});return out;});result.readiness.push({elapsedMs:Date.now()-start,values});return values.every(x=>Number(x.opacity)>=.99);},{timeout:12000}).toBe(true);};
(async()=>{const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const [lang,width,reducedMotion]of[['bn',320,'no-preference'],['bn',390,'reduce'],['en',320,'reduce'],['en',390,'no-preference']]){
 const state={lang,width,reducedMotion,errors:[],pointers:[]};
 const context=await browser.newContext({viewport:{width,height:844},hasTouch:true,isMobile:true,reducedMotion});
 await context.addInitScript(lang=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng',lang);window.proof=[];addEventListener('pointerdown',e=>window.proof.push({pointerType:e.pointerType,name:e.target.closest('button')?.getAttribute('aria-controls')||e.target.closest('button')?.getAttribute('aria-label')}),true);},lang);
 await context.route('**/*',r=>{const q=r.request();if(new URL(q.url()).pathname==='/g/collect')return r.fulfill({status:204,body:''});if(['GET','HEAD','OPTIONS'].includes(q.method()))return r.continue();const u=new URL(q.url());return ['www.google.com','www.google-analytics.com'].includes(u.hostname)&&u.pathname==='/g/collect'?r.fulfill({status:204,body:''}):r.abort();});
 const page=await context.newPage();page.on('pageerror',e=>state.errors.push(e.message));page.setDefaultTimeout(12000);
 try{
 await page.goto('http://127.0.0.1:4191/products',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(800);
 const opener=page.getByRole('button',{name:'Open menu',exact:true});await ready(opener);state.menuRadius=await opener.evaluate(el=>getComputedStyle(el).borderRadius);assert.equal(state.menuRadius,'6px');
 await opener.tap();const dialog=page.locator('dialog[open]');await expect(dialog.locator('#mobile-navigation a[href="/"]').last()).toBeFocused();
 const disclosure=dialog.locator('button[aria-controls="mobile-nav-company"]');await ready(disclosure);await disclosure.tap();await expect(disclosure).toHaveAttribute('aria-expanded','true');
 const links=dialog.locator('#mobile-nav-company a');await ready(links.first());state.links=await links.evaluateAll(els=>els.map(el=>({text:el.textContent.trim(),href:el.getAttribute('href'),inert:!!el.closest('[inert]')})));assert.ok(state.links.length>0&&state.links.every(x=>!x.inert));
 state.control=await disclosure.evaluate(el=>{const r=el.getBoundingClientRect();return {rect:r.toJSON(),hit:el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)),expanded:el.getAttribute('aria-expanded')};});assert.equal(state.control.hit,true);
 await page.screenshot({path:path.join(__dirname,`touch-settled-${width}-${lang}.png`)});
 await disclosure.tap();await expect(disclosure).toHaveAttribute('aria-expanded','false');await expect.poll(()=>links.count()).toBe(0);
 await dialog.getByRole('button',{name:'Close menu',exact:true}).tap();await expect(dialog).toHaveCount(0);await expect(opener).toBeFocused();
 await opener.tap();await ready(page.locator('dialog[open] #mobile-navigation'));await page.touchscreen.tap(8,420);await expect(dialog).toHaveCount(0);await expect(opener).toBeFocused();
 await opener.tap();await page.setViewportSize({width:1280,height:900});await expect(dialog).toHaveCount(0);await expect(page.locator('[data-public-main]')).toBeFocused();
 state.end=await page.evaluate(()=>({overflow:[document.documentElement.style.overflow,document.body.style.overflow],scrollWidth:document.documentElement.scrollWidth,width:innerWidth,pointers:window.proof}));assert.deepEqual(state.end.overflow,['','']);assert.ok(state.end.scrollWidth<=state.end.width);assert.deepEqual(state.errors,[]);
 assert.ok(state.end.pointers.some(e=>e.pointerType==='touch'&&e.name==='mobile-nav-company'));
 state.passed=true;console.log(`PASS ${lang}/${width}/${reducedMotion} genuine-touch`);
 }catch(e){state.passed=false;state.error=e.stack;state.failureDOM=await page.evaluate(()=>({visibility:document.visibilityState,fonts:document.fonts.status,ancestors:[...document.querySelectorAll('header,header [style]')].map(e=>({tag:e.tagName,opacity:getComputedStyle(e).opacity,style:e.getAttribute('style')}))}));await page.screenshot({path:path.join(__dirname,`touch-failure-${lang}-${width}.png`),timeout:30000});console.error(e);}finally{result.cases.push(state);await context.close();save();}
}}finally{result.teardown=await Promise.race([browser.close().then(()=>({closedNormally:true})),new Promise(r=>setTimeout(()=>r({closedNormally:false,bounded:true,connected:browser.isConnected()}),15000))]);save();}if(result.cases.some(x=>!x.passed))process.exitCode=1;})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{setTimeout(()=>process.exit(process.exitCode||0),100).unref();});
