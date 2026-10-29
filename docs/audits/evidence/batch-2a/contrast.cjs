const fs=require('node:fs'),path=require('node:path');const {spawn}=require('node:child_process');
const {chromium}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../../../..'),result={states:[],errors:[],blocked:[]},name=process.argv[2]||'contrast';
const save=()=>fs.writeFileSync(path.join(__dirname,name+'-results.json'),JSON.stringify(result,null,2));
const log=fs.openSync(path.join(__dirname,name+'-server.txt'),'a');const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview',...(process.env.BATCH2A_DIST?['--outDir',process.env.BATCH2A_DIST]:[]),'--host','127.0.0.1','--port','4202','--strictPort'],{cwd:root,stdio:['ignore',log,log],windowsHide:true});
(async()=>{let browser,service;try{
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4202')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 service=await chromium.launchServer({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});result.browserPid=service.process().pid;browser=await chromium.connect(service.wsEndpoint());
 const routes=process.env.BATCH2A_ROUTES?process.env.BATCH2A_ROUTES.split(','):['/','/about','/mission','/sustainability','/products','/quality','/certificates','/downloads','/news','/news/1','/news/invalid','/blog','/blog/1','/blog/featured','/blog/invalid','/contact','/gallery','/careers','/faq','/privacy','/terms','/audit-missing-page'];
 for(const lang of ['en','bn']){
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});await context.addInitScript(lang=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng',lang);},lang);
 await context.route('**/*',r=>{const q=r.request(),u=new URL(q.url());if(u.pathname==='/g/collect'||!['GET','HEAD','OPTIONS'].includes(q.method())){result.blocked.push({origin:u.origin,path:u.pathname,method:q.method()});return r.fulfill({status:204,body:''});}return r.continue();});
 const page=await context.newPage();page.on('pageerror',e=>result.errors.push(e.message));
 for(const route of routes){await page.goto('http://127.0.0.1:4202'+route,{waitUntil:'domcontentloaded'});await page.locator('main').waitFor();
 const targets=page.locator('main h2,main h3,main input,footer');for(let i=0;i<await targets.count();i++){await targets.nth(i).evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(100);}await page.waitForTimeout(1800);
 await page.addScriptTag({path:path.join(__dirname,'../axe.min.js')});
 const violations=await page.evaluate(async()=>{const r=await axe.run({include:[['.public-site']]},{runOnly:{type:'rule',values:['color-contrast']},iframes:false});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))}));});
 result.states.push({route,lang,violations});save();console.log(lang,route,violations.reduce((s,v)=>s+v.nodes.length,0),'contrast nodes');
 }
 await context.close();}
 result.completed=true;
 }catch(e){result.error=e.stack;process.exitCode=1;}
 finally{if(browser)await browser.close();if(service){result.teardown=await Promise.race([service.close().then(()=>({normal:true})),new Promise(r=>setTimeout(()=>r({normal:false,bounded:true}),15000))]);}server.kill();await new Promise(r=>server.exitCode!==null?r():server.once('exit',r));fs.closeSync(log);result.serverStopped=true;save();setTimeout(()=>process.exit(process.exitCode||0),100).unref();}
})();
