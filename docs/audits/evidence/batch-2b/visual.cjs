const {chromium}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path');
const mode=process.argv[2]||'before',base=process.env.QA_URL||'http://127.0.0.1:4199';
const groups={group1:['/products','/contact'],group2:['/downloads','/careers'],group3:['/'],group4:['/about','/mission','/sustainability'],group5:['/quality','/certificates','/gallery'],group6:['/news','/news/1','/news/invalid','/blog','/blog/1','/blog/featured','/blog/invalid','/faq','/privacy','/terms','/audit-missing-page']};
const routes=process.env.QA_ROUTES?.split(',')||groups[mode.split('-')[0]]||Object.values(groups).flat();
const result={mode,base,states:[],errors:[],captures:[]},cache=new Map();
const save=()=>fs.writeFileSync(path.join(__dirname,mode+'-results.json'),JSON.stringify(result,null,2));
async function capture(page,file){
 const session=await page.context().newCDPSession(page);
 const shot=await session.send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(path.join(__dirname,file),Buffer.from(shot.data,'base64'));await session.detach();
}
async function viewportReady(page){
 let stable=0;
 for(let i=0;i<120;i++){
  const pending=await page.evaluate(()=>[...document.querySelectorAll('header a[href],header button,main h1,main section:first-child a,main section:first-child p')].filter(e=>{const r=e.getBoundingClientRect();return r.height&&r.top<innerHeight&&r.bottom>0&&!e.closest('[aria-hidden="true"]')}).filter(e=>{for(let a=e;a instanceof HTMLElement;a=a.parentElement)if(+getComputedStyle(a).opacity<.99)return true;return false}).map(e=>e.textContent.slice(0,50)));
  if(!pending.length){if(++stable>=3)return;}else stable=0;
  await page.waitForTimeout(150);
 }throw Error('Viewport entrances did not settle');
}
async function settled(page,target){
 await target.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
 let previous='',stable=0;
 for(let i=0;i<60;i++){
  const s=await target.evaluate(e=>{const r=e.getBoundingClientRect();let visible=true;for(let a=e;a instanceof HTMLElement;a=a.parentElement){if(+getComputedStyle(a).opacity<.99)visible=false}return {visible,rect:[r.x,r.y,r.width,r.height].map(n=>Math.round(n*2)/2),images:[...e.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0)}});
  const key=JSON.stringify(s);stable=s.visible&&key===previous?stable+1:0;previous=key;
  if(stable>=3)return s;await page.waitForTimeout(120);
 }throw Error('Target did not settle');
}
(async()=>{let browser;try{
 browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});result.browser=browser.version();
 const sweep=mode==='sweep',widths=process.env.QA_WIDTHS?.split(',').map(Number)||(sweep?[320,360,375,390,430,768,1024,1440]:[390,1440]);
 for(const lang of process.env.QA_LANGS?.split(',')||['en','bn'])for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:width<768?844:900},hasTouch:width<768,isMobile:width<768});
  await context.addInitScript(l=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng',l)},lang);
  await context.route('**/*',async r=>{const q=r.request(),u=new URL(q.url());if(!['GET','HEAD','OPTIONS'].includes(q.method())||u.pathname==='/g/collect')return r.fulfill({status:204,body:''});if(['fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname)||/\.(ttf|woff2?)$/.test(u.pathname)){if(cache.has(q.url()))return r.fulfill(cache.get(q.url()));const res=await r.fetch();const headers={...res.headers()};delete headers['content-encoding'];delete headers['content-length'];delete headers['transfer-encoding'];const entry={status:res.status(),headers,body:await res.body()};cache.set(q.url(),entry);return r.fulfill(entry)}return r.continue()});
  const page=await context.newPage();page.on('pageerror',e=>result.errors.push({lang,width,error:e.message}));
  for(const route of routes){try{
   await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});await page.bringToFront();await page.locator('main').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(sweep?100:1800);
   const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.title,lang:document.documentElement.lang,targets:[...document.querySelectorAll('main input,main form,main h2')].slice(0,4).map(e=>({text:(e.textContent||e.getAttribute('placeholder')||'').slice(0,60),top:Math.round(e.getBoundingClientRect().top+scrollY)}))}));result.states.push({route,lang,...state,passed:state.scrollWidth<=width+1});
   if(!sweep&&(lang==='en'||width===390||process.env.QA_CAPTURE_ALL==='1')){
    const slug=route==='/'?'home':route.slice(1).replaceAll('/','-'),prefix=mode+'-'+slug+'-'+width+'-'+lang;
    if(route==='/'){
     const pause=page.getByRole('button',{name:lang==='en'?'Pause rotation':'স্লাইড পরিবর্তন থামান',exact:true});if(await pause.count())await pause.evaluate(e=>e.click());
     await page.getByRole('button',{name:'Go to slide 1',exact:true}).evaluate(e=>e.click());
     let ready=false;for(let i=0;i<60;i++){ready=await page.locator('main section').first().locator('img').first().evaluate(e=>e.getAttribute('src')==='/hero_products.jpg'&&e.complete&&e.naturalWidth>0&&+getComputedStyle(e).opacity>=.99);if(ready)break;await page.waitForTimeout(100)}if(!ready)throw Error('Selected Home slide did not settle');
    }
    await viewportReady(page);await capture(page,prefix+'-hero.png');result.captures.push(prefix+'-hero.png');
    const selector=route==='/products'?'.card-premium':route==='/contact'?'#contact-name':route==='/careers'?'main .card-premium':route==='/downloads'?'main h3':route==='/gallery'?'main button[aria-label^="View image:"]':route==='/faq'?'main button.text-left':route.includes('/news/')||route.includes('/blog/')?'main article':'main h2';
    const target=page.locator(selector).first();if(await target.count()){
     const readiness=await settled(page,target);await viewportReady(page);await capture(page,prefix+'-body.png');result.captures.push({file:prefix+'-body.png',readiness});
    }
   }
  }catch(e){result.states.push({route,width,lang,passed:false,error:e.message})}save();console.log(mode,lang,width,route)}await context.close();
 }
 result.completed=true;
}catch(e){result.error=e.stack;process.exitCode=1}finally{
 if(browser)result.teardown=await Promise.race([browser.close().then(()=>({normal:true})),new Promise(r=>setTimeout(()=>r({normal:false,bounded:true,connected:browser.isConnected()}),8000))]);
 if(result.states.some(s=>!s.passed)||result.errors.length||result.error)process.exitCode=1;save();console.log('RESULT',result.states.length,result.states.filter(s=>!s.passed).length,'failed');setTimeout(()=>process.exit(process.exitCode||0),100).unref();
}})();
