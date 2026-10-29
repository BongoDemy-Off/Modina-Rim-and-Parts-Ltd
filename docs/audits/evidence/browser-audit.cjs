const fs=require('fs');
const path=require('path');
const {chromium}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out=__dirname;
const routes=['/','/about','/mission','/sustainability','/products','/quality','/certificates','/downloads','/news','/news/1','/news/invalid','/blog','/blog/1','/blog/featured','/blog/invalid','/contact','/gallery','/careers','/faq','/privacy','/terms','/audit-missing-page'];
const widths=[320,360,375,390,430,768,1024,1440];
const slug=r=>r==='/'?'home':r.slice(1).replaceAll('/','-');
async function measure(page){return page.evaluate(()=>{
 const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
 const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'};
 return {title:document.title,lang:document.documentElement.lang,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,header:rect(document.querySelector('header')),h1:[...document.querySelectorAll('h1')].map(e=>({text:e.innerText,rect:rect(e),size:getComputedStyle(e).fontSize})),canonical:document.querySelector('link[rel=canonical]')?.href,description:[...document.querySelectorAll('meta[name=description]')].map(e=>e.content),ogImage:document.querySelector('meta[property="og:image"]')?.content,headings:[...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(e=>({tag:e.tagName,text:e.innerText})),overflow:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>visible(e)&&(e.getBoundingClientRect().right>innerWidth+2||e.getBoundingClientRect().left< -2)).slice(0,24).map(e=>({tag:e.tagName,text:e.innerText?.slice(0,75),class:e.className?.baseVal??e.className,rect:rect(e)})),images:[...document.images].map(e=>({src:e.currentSrc||e.src,alt:e.alt,loaded:e.complete,broken:e.complete&&e.naturalWidth===0,natural:[e.naturalWidth,e.naturalHeight],rect:rect(e),loading:e.loading,objectFit:getComputedStyle(e).objectFit})),controls:[...document.querySelectorAll('button,input,select,textarea')].filter(visible).map(e=>({tag:e.tagName,name:e.getAttribute('aria-label')||e.innerText||e.getAttribute('placeholder'),id:e.id,rect:rect(e),font:getComputedStyle(e).fontSize,role:e.getAttribute('role'),expanded:e.getAttribute('aria-expanded')})),tinyText:[...document.querySelectorAll('main p,main a,main span,footer a')].filter(e=>visible(e)&&e.innerText?.trim()&&parseFloat(getComputedStyle(e).fontSize)<14).slice(0,40).map(e=>({text:e.innerText.slice(0,70),size:getComputedStyle(e).fontSize,class:e.className})),links:[...document.querySelectorAll('main a')].map(e=>({text:e.innerText,href:e.getAttribute('href')})),dialogs:[...document.querySelectorAll('[role=dialog]')].length};
 });}
async function reveal(page){await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}scrollTo(0,0)});await page.waitForTimeout(1600);}
async function run(){
 const browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},locale:'en-US',hasTouch:true,isMobile:true});
 await context.route('**/*',route=>['GET','HEAD','OPTIONS'].includes(route.request().method())?route.continue():route.abort());
 await context.addInitScript(()=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng','en')});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message.replace(/AIza[\w-]+/g,'[REDACTED]')));
 const results=[];let axeSource;try{const response=await fetch('https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js');if(response.ok){axeSource=await response.text();fs.writeFileSync(path.join(out,'axe.min.js'),axeSource);}}catch(e){fs.writeFileSync(path.join(out,'axe-unavailable.txt'),e.message)}
 fs.writeFileSync(path.join(out,'environment.json'),JSON.stringify({browser:browser.version(),engine:'Chromium',playwright:'1.62.1',baseURL:'http://127.0.0.1:4173',touch:true,physicalDevices:false,widths,axeAvailable:!!axeSource},null,2));
 for(const r of routes){
  await page.goto('http://127.0.0.1:4173'+r,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1500);
  for(const width of widths){await page.setViewportSize({width,height:width>=768?900:844});await page.waitForTimeout(120);if([320,390,1440].includes(width))await reveal(page);const data=await measure(page);data.route=r;data.width=width;
   if([390,1440].includes(width)||(width===320&&['/','/products','/gallery','/contact','/certificates'].includes(r))){data.screenshot=`${slug(r)}-${width}-en.png`;await page.screenshot({path:path.join(out,data.screenshot),fullPage:true,animations:'disabled'});}
   if(axeSource&&width===390){await page.addScriptTag({content:axeSource});data.axe=await page.evaluate(async()=>{const a=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:a.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,helpUrl:v.helpUrl,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:a.incomplete.map(v=>({id:v.id,count:v.nodes.length})),passes:a.passes.length}});}
   results.push(data);
  }
  fs.writeFileSync(path.join(out,'route-results.json'),JSON.stringify(results,null,2));console.log('AUDITED',r);
 }
 fs.writeFileSync(path.join(out,'page-errors.json'),JSON.stringify(errors,null,2));await browser.close();
}
run().catch(e=>{console.error(e);process.exit(1)});
