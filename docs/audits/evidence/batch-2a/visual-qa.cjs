const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../../../..');
const mode = process.argv[2] || 'before';
const groups = {
  group1: ['/products', '/contact', '/careers', '/downloads'],
  group2: ['/', '/about', '/mission', '/sustainability', '/quality', '/certificates', '/gallery'],
  group3: ['/news', '/news/1', '/news/invalid', '/blog', '/blog/1', '/blog/featured', '/blog/invalid', '/faq', '/privacy', '/terms', '/audit-missing-page'],
};
const routes = process.env.BATCH2A_ROUTES ? process.env.BATCH2A_ROUTES.split(',') : mode.startsWith('group') ? groups[mode.split('-')[0]] : [...groups.group2, ...groups.group1, ...groups.group3];
const widths = mode.endsWith('-final') ? [390,1440] : mode==='group3' ? [320,390,1440] : mode === 'sweep' ? [320,360,375,390,430,768,1024,1440] : mode === 'before' ? [390,1440] : [320,360,390,430,768,1440];
const out = {mode, states:[], errors:[], blocked:[], screenshots:[], visibility:[]};
const fontCache=new Map();out.fontCache={hits:0,misses:0};
const save = () => fs.writeFileSync(path.join(__dirname, mode+'-results.json'), JSON.stringify(out,null,2));
const log = fs.openSync(path.join(__dirname, mode+'-server.txt'),'a');
const port=mode==='before'?4197:4198;
const server = spawn(process.execPath,['node_modules/vite/bin/vite.js','preview',...(process.env.BATCH2A_DIST?['--outDir',process.env.BATCH2A_DIST]:[]),'--host','127.0.0.1','--port',String(port),'--strictPort'],{cwd:root,stdio:['ignore',log,log],windowsHide:true});
const slug = route => route === '/' ? 'home' : route.slice(1).replaceAll('/','-');
async function visibleSections(page) {
  const sections = page.locator('main section, main form, main article');
  for(let i=0;i<await sections.count();i++) {
    const s=sections.nth(i); const rect=await s.boundingBox(); if(!rect||rect.height<10)continue;
    // Walk tall sections in viewport-sized steps so nested entrances actually intersect.
    const top=rect.y+await page.evaluate(()=>scrollY);
    for(let y=top;y<top+rect.height;y+=600) {
      await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
      await page.waitForTimeout(100);
    }
  }
  await page.waitForTimeout(1700);
}
(async()=>{let browser;
 try {
  let ready=false;for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:'+port)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}if(!ready)throw Error('Preview not ready');
  browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});out.browser=browser.version();
  for(const lang of ['en','bn'])for(const width of widths){
   const context=await browser.newContext({viewport:{width,height:width<768?844:900},hasTouch:width<1280,isMobile:width<768});
   await context.addInitScript(lang=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng',lang);},lang);
   await context.route('**/*',async r=>{const q=r.request(),u=new URL(q.url());if(u.pathname==='/g/collect'||!['GET','HEAD','OPTIONS'].includes(q.method())){out.blocked.push({origin:u.origin,path:u.pathname,method:q.method()});return r.fulfill({status:204,body:''});}if(q.method()==='GET'&&(['fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname)||/\.(?:ttf|woff2?)(?:$|\?)/.test(u.pathname))){const key=q.url()+'|'+q.headers()['user-agent'];if(fontCache.has(key)){out.fontCache.hits++;return r.fulfill(fontCache.get(key));}const response=await r.fetch();const headers={...response.headers()};delete headers['content-encoding'];delete headers['content-length'];delete headers['transfer-encoding'];const entry={status:response.status(),headers,body:await response.body()};if(entry.status===200)fontCache.set(key,entry);out.fontCache.misses++;return r.fulfill(entry);}return r.continue();});
   const page=await context.newPage();page.on('pageerror',e=>out.errors.push({lang,width,message:e.message}));page.setDefaultTimeout(20000);
   for(const route of routes){
    try {
     await page.goto('http://127.0.0.1:'+port+route,{waitUntil:'domcontentloaded',timeout:30000});await page.locator('main').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(mode==='sweep'?200:1600);
     const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,lang:document.documentElement.lang,headings:[...document.querySelectorAll('main h1')].map(e=>({text:e.textContent,size:getComputedStyle(e).fontSize,lineHeight:getComputedStyle(e).lineHeight,width:e.getBoundingClientRect().width,scrollWidth:e.scrollWidth})),title:document.title}));
     out.states.push({route,lang,width,...state,passed:state.scrollWidth<=width+1});
     if(width===390||width===1440){
      if(mode!=='sweep'){
       const prefix=mode+'-'+slug(route)+'-'+width+'-'+lang;
       await page.screenshot({path:path.join(__dirname,prefix+'-hero.png')});out.screenshots.push(prefix+'-hero.png');
       // Representative body capture: scroll the actual target into view, without opacity overrides.
       const target=page.locator(process.env.BATCH2A_CAPTURE_TARGET || (route==='/products'?'.card-premium':route==='/contact'?'#contact-name':route==='/careers'?'main h2':route==='/downloads'?'main h3':route==='/gallery'?'main button[aria-label^="View image:"]':route==='/faq'?'main button.text-left':route.startsWith('/news/')||route.startsWith('/blog/')?'main article':'main h2')).first();
       if(await target.count()){await target.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(1300);await target.evaluate(async e=>{for(let a=e;a instanceof HTMLElement;a=a.parentElement){if(Number(getComputedStyle(a).opacity)<.99)await new Promise(r=>setTimeout(r,1200));}});}
       out.visibility.push({route,width,lang,hidden:await page.locator('main [style]').evaluateAll(es=>es.filter(e=>getComputedStyle(e).opacity==='0'&&e.getBoundingClientRect().height>0&&e.getBoundingClientRect().top<innerHeight&&e.getBoundingClientRect().bottom>0).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70)})))});
       await page.screenshot({path:path.join(__dirname,prefix+'-content.png')});out.screenshots.push(prefix+'-content.png');
      }
     }
    }catch(e){out.states.push({route,lang,width,passed:false,error:e.message});}
    save();console.log(mode,lang,width,route);
   }
   await context.close();
  }
  out.completed=true;
 }catch(e){out.error=e.stack;process.exitCode=1;}
 finally{if(browser){out.teardown=await Promise.race([browser.close().then(()=>({normal:true})),new Promise(r=>setTimeout(()=>r({normal:false,connected:browser.isConnected(),bounded:true}),15000))]);}server.kill();await new Promise(r=>server.exitCode!==null?r():server.once('exit',r));fs.closeSync(log);out.serverStopped=true;save();console.log('RESULT',out.states.length,'states',out.states.filter(x=>!x.passed).length,'failures');if(out.states.some(x=>!x.passed))process.exitCode=1;setTimeout(()=>process.exit(process.exitCode||0),100).unref();}
})();
