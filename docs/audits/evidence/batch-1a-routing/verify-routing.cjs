// Local filesystem-first rule model, NOT a Vercel/Netlify deployment emulator.
const {chromium,expect}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs=require('node:fs');const path=require('node:path');const http=require('node:http');const crypto=require('node:crypto');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../../..'),dist=path.join(root,'dist');
const output={scope:'Local config-driven filesystem-first rule model; provider CLI/emulation and live deployment NOT verified',node:process.version,cases:[],assets:[],pageErrors:[],guardActions:[],models:[],metadataObservations:[]};
const save=()=>fs.writeFileSync(path.join(__dirname,process.env.ROUTING_RESULTS||'routing-results.json'),JSON.stringify(output,null,2));
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const safe=raw=>{const u=new URL(raw);return u.origin+u.pathname;};
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.txt':'text/plain','.xml':'application/xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.gif':'image/gif','.ico':'image/x-icon','.ttf':'font/ttf','.woff':'font/woff','.woff2':'font/woff2','.webm':'video/webm','.mp4':'video/mp4','.pdf':'application/pdf'};
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
async function test(name,fn){try{await fn();output.cases.push({name,passed:true});console.log('PASS '+name);}catch(e){output.cases.push({name,passed:false,error:e.stack});console.log('FAIL '+name+': '+e.message.slice(0,500));}save();}
async function model(name){
 let fallback;
 if(name==='vercel'){
  const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
  assert.deepEqual(config.rewrites,[{source:'/(.*)',destination:'/index.html'}]);
  const expression=new RegExp('^'+config.rewrites[0].source+'$');fallback=p=>expression.test(p)?config.rewrites[0].destination:null;
 }else if(name==='netlify'){
  const source=fs.readFileSync(path.join(root,'public/_redirects'));const published=fs.readFileSync(path.join(dist,'_redirects'));assert.deepEqual(published,source);
  const lines=published.toString().trim().split(/\r?\n/);assert.deepEqual(lines,['/* /index.html 200']);
  const [from,to,status]=lines[0].split(/\s+/);assert.equal(from,'/*');assert.equal(status,'200');fallback=p=>p.startsWith('/')?to:null;
 }else fallback=()=>null;
 const server=http.createServer((req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
  let filename=path.resolve(dist,'.'+pathname);if(filename!==dist&&!filename.startsWith(dist+path.sep)){res.writeHead(403);return res.end();}
  if(fs.existsSync(filename)&&fs.statSync(filename).isDirectory())filename=path.join(filename,'index.html');
  let routing='filesystem';if(!fs.existsSync(filename)||!fs.statSync(filename).isFile()){
   const target=fallback(pathname);if(!target){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}
   filename=path.join(dist,target.slice(1));routing='spa-fallback';
  }
  const bytes=fs.readFileSync(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename).toLowerCase()]||'application/octet-stream','Content-Length':bytes.length,'X-Local-Routing-Model':routing});res.end(req.method==='HEAD'?undefined:bytes);
 });
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 const base='http://127.0.0.1:'+server.address().port;output.models.push({name,base});return {name,base,server};
}
async function ready(target){await expect(target).toBeVisible();try{await expect.poll(()=>target.evaluate(el=>{for(let a=el;a instanceof HTMLElement;a=a.parentElement)if(Number(getComputedStyle(a).opacity)<.99||(a.style.transform&&a.style.transform!=='none'))return false;return true;})).toBe(true);}catch(e){e.message+='\n'+JSON.stringify(await target.evaluate(el=>{const out=[];for(let a=el;a instanceof HTMLElement;a=a.parentElement)out.push({tag:a.tagName,class:a.className,style:a.getAttribute('style'),opacity:getComputedStyle(a).opacity});return out;}));throw e;}}
async function unlocked(page){await expect(page.locator('dialog[open]')).toHaveCount(0);assert.deepEqual(await page.evaluate(()=>[document.documentElement.style.overflow,document.body.style.overflow]),['','']);}
async function context(browser,width=1440,lang='en'){
 const c=await browser.newContext({viewport:{width,height:900},hasTouch:width<768,isMobile:width<768});
 await c.addInitScript(lang=>{sessionStorage.setItem('modina_loaded','1');localStorage.setItem('i18nextLng',lang);},lang);
 await c.route('**/*',r=>{const q=r.request();if(['GET','HEAD','OPTIONS'].includes(q.method()))return r.continue();const u=new URL(q.url());output.guardActions.push({url:safe(q.url()),method:q.method()});return ['www.google-analytics.com','www.google.com'].includes(u.hostname)&&u.pathname==='/g/collect'?r.fulfill({status:204,body:''}):r.abort();});
 return c;
}
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../public-data.json'),'utf8'));const product=data.productsData[0];
assert.ok(fs.readFileSync(path.join(root,'src/lib/data.ts'),'utf8').includes("name: '"+product.name+"'"));
const source=name=>fs.readFileSync(path.join(root,'src/pages',name+'.tsx'),'utf8');
const newsTitle=source('NewsDetail').match(/title: '([^']+)'/)[1];const blogTitle=source('BlogDetail').match(/\{ id: '1', title: '([^']+)'/)[1];const featuredTitle=source('BlogDetail').match(/id: 'featured',[\s\S]*?title: '([^']+)'/)[1];
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const routes=[['/',/Automotive Components Manufacturer/],['/about',/^About Us \|/],['/products',/^Products \|/],['/products?category=Rims',/^Products \|/],['/gallery',/^Gallery \|/],['/contact',/^Contact Us \|/],['/contact?product='+encodeURIComponent(product.name),/^Contact Us \|/],['/news/1',new RegExp(escape(newsTitle))],['/blog/1',new RegExp(escape(blogTitle))],['/blog/featured',new RegExp(escape(featuredTitle))],['/faq',/^FAQ \|/],['/routing-acceptance-unknown',null]];
async function rendered(page,route,title){
 if(['/news/1','/blog/1','/blog/featured'].includes(route)){
  await expect(page.locator('main h1')).toHaveText(title);
  output.metadataObservations.push({route,title:await page.title(),heading:await page.locator('main h1').innerText(),existingIssue:'PUB-018: metadata unchanged; route content rendered'});
 }else if(title)await expect(page).toHaveTitle(title);else await expect(page.locator('main h1')).toContainText('Not Exist');
 await expect(page.locator('[data-public-main]')).toHaveCount(1);
 if(route.includes('category='))await expect(page.getByRole('button',{name:'Filter by Rims',exact:true})).toHaveAttribute('aria-pressed','true');
 if(route.startsWith('/contact?')){await expect(page.locator('#contact-subject')).toHaveValue('Product Inquiry');assert.ok((await page.locator('#contact-message').inputValue()).includes('\n'+product.name+'\n'));assert.equal(new URL(page.url()).searchParams.get('product'),product.name);}
}
(async()=>{
 const models=[];let browser;
 try{
  const control=await model('no-fallback');models.push(control);
  await test('control/no-fallback-reproduces-nested-404',async()=>{assert.equal((await fetch(control.base+'/')).status,200);assert.equal((await fetch(control.base+'/products')).status,404);assert.equal((await fetch(control.base+'/gallery')).status,404);});
  const providers=[await model('vercel'),await model('netlify')];models.push(...providers);
  browser=await chromium.launch({executablePath:'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe',headless:true});output.browser=browser.version();
  for(const provider of providers){
   await test(provider.name+'/all-published-static-files',async()=>{
    for(const file of walk(dist)){
     const relative=path.relative(dist,file).split(path.sep).join('/');const url=provider.base+'/'+relative.split('/').map(encodeURIComponent).join('/');const response=await fetch(url);const bytes=Buffer.from(await response.arrayBuffer());
     assert.equal(response.status,200);assert.equal(response.headers.get('x-local-routing-model'),'filesystem');assert.equal(hash(bytes),hash(fs.readFileSync(file)));assert.equal(response.headers.get('content-type'),types[path.extname(file).toLowerCase()]||'application/octet-stream');
     output.assets.push({provider:provider.name,path:relative,status:response.status,type:response.headers.get('content-type'),bytes:bytes.length,sha256:hash(bytes)});
    }
   });
   const c=await context(browser);const page=await c.newPage();page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(30000);page.on('pageerror',e=>output.pageErrors.push({provider:provider.name,error:e.message}));
   for(const [route,title] of routes)await test(provider.name+'/direct-refresh'+route,async()=>{
    const expectedURL=provider.base+route;const response=await page.goto(expectedURL,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);assert.equal(response.headers()['x-local-routing-model'],route==='/'?'filesystem':'spa-fallback');await rendered(page,route,title);assert.equal(page.url(),expectedURL);
    const refresh=await page.reload({waitUntil:'domcontentloaded'});assert.equal(refresh.status(),200);await rendered(page,route,title);assert.equal(page.url(),expectedURL);
   });
   await test(provider.name+'/client-navigation-query-history',async()=>{
    await page.goto(provider.base+'/',{waitUntil:'domcontentloaded'});await expect(page).toHaveTitle(routes[0][1]);
    let documents=0;const nav=q=>{if(q.isNavigationRequest()&&q.frame()===page.mainFrame())documents++;};page.on('request',nav);
    const products=page.locator('header').getByRole('link',{name:'Products',exact:true});await ready(products);await products.click();await expect(page).toHaveURL(provider.base+'/products');await rendered(page,'/products',routes[2][1]);
    const company=page.locator('button[aria-controls="desktop-nav-company"]');await company.focus();await page.keyboard.press('Space');await page.locator('#desktop-nav-company a[href="/about"]').click();await expect(page).toHaveURL(provider.base+'/about');await rendered(page,'/about',routes[1][1]);
    await page.goBack();await expect(page).toHaveURL(provider.base+'/products');await rendered(page,'/products',routes[2][1]);await page.goForward();await expect(page).toHaveURL(provider.base+'/about');await rendered(page,'/about',routes[1][1]);
    await page.locator('header').getByRole('link',{name:'Home',exact:true}).click();await expect(page).toHaveURL(provider.base+'/');await rendered(page,'/',routes[0][1]);const rims=page.locator('a[href="/products?category=Rims"]').first();await rims.scrollIntoViewIfNeeded();await ready(rims);await rims.click();await expect(page).toHaveURL(provider.base+'/products?category=Rims');await rendered(page,'/products?category=Rims',routes[3][1]);
    await page.goBack();await expect(page).toHaveURL(provider.base+'/');await page.goForward();await expect(page).toHaveURL(provider.base+'/products?category=Rims');await rendered(page,'/products?category=Rims',routes[3][1]);assert.equal(documents,0,'SPA navigation issued a new main document request');page.off('request',nav);
   });
   await test(provider.name+'/batch-1a-product-enquiry-and-overlays',async()=>{
    await page.goto(provider.base+'/products',{waitUntil:'domcontentloaded'});const details=page.getByRole('button',{name:'View details: '+product.name,exact:true});await details.scrollIntoViewIfNeeded();await ready(details);
    const card=page.locator('.card-premium').first();const next=card.getByRole('button',{name:'Next image',exact:true});await next.hover();await next.click();await expect(card.getByRole('button',{name:'Go to slide 2',exact:true})).toHaveAttribute('aria-pressed','true');await unlocked(page);
    await details.focus();await page.keyboard.press('Enter');await expect(page.locator('#product-detail-title')).toBeFocused();await page.keyboard.press('Escape');await unlocked(page);await expect(details).toBeFocused();await page.keyboard.press('Enter');await page.locator('dialog[open]').getByRole('button',{name:'Request Inquiry',exact:true}).click();await expect(page).toHaveURL(/\/contact\?product=/);await rendered(page,routes[6][0],routes[6][1]);await unlocked(page);
    await page.goBack();await expect(page).toHaveURL(provider.base+'/products');await unlocked(page);await page.goForward();await rendered(page,routes[6][0],routes[6][1]);
    await page.goto(provider.base+'/gallery',{waitUntil:'domcontentloaded'});const image=page.getByRole('button',{name:/^View image:/}).first();await image.scrollIntoViewIfNeeded();await ready(image);await image.focus();await page.keyboard.press('Enter');await expect(page.locator('dialog[open]').getByRole('button',{name:/^Close/})).toBeFocused();await page.keyboard.press('Escape');await unlocked(page);await expect(image).toBeFocused();
    await page.goto(provider.base+'/careers',{waitUntil:'domcontentloaded'});const role=page.getByRole('button',{name:/^View role:/}).first();await role.scrollIntoViewIfNeeded();await ready(role);await role.focus();await page.keyboard.press('Enter');await expect(page.locator('#career-detail-title')).toBeFocused();await page.keyboard.press('Escape');await unlocked(page);await expect(role).toBeFocused();
   });
   await test(provider.name+'/admin-route-boundary-only',async()=>{
    const response=await page.goto(provider.base+'/admin',{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);await expect(page.locator('.admin-root')).toHaveCount(1);await expect(page.locator('.public-site')).toHaveCount(0);await expect(page.locator('[data-public-main]')).toHaveCount(0);
    // No Admin controls, forms, data workflows or business functions are exercised.
   });await c.close();
   const mobile=await context(browser,320,'bn');const mp=await mobile.newPage();mp.setDefaultTimeout(10000);mp.setDefaultNavigationTimeout(30000);
   await test(provider.name+'/320-bengali-client-route-cleanup',async()=>{
    await mp.goto(provider.base+'/products',{waitUntil:'domcontentloaded'});await expect(mp.locator('html')).toHaveAttribute('lang','bn');const opener=mp.getByRole('button',{name:'Open menu',exact:true});await opener.tap();const company=mp.locator('dialog[open] button[aria-controls="mobile-nav-company"]');await ready(company);await company.tap();const about=mp.locator('#mobile-nav-company a[href="/about"]');await ready(about);await about.tap();await expect(mp).toHaveURL(provider.base+'/about');await unlocked(mp);assert.ok(await mp.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   });await mobile.close();
  }
  assert.deepEqual(output.pageErrors,[]);output.assertionsComplete=true;
 }finally{
  if(browser){console.log('Closing owned browser');await browser.close();output.browserClosedNormally=true;}
  for(const m of models){m.server.closeAllConnections();await new Promise(resolve=>m.server.close(resolve));}output.serversClosed=true;output.completedAt=new Date().toISOString();save();
 }
 console.log(`${output.cases.filter(x=>x.passed).length}/${output.cases.length} cases passed; ${output.assets.length} static-file responses verified.`);if(output.cases.some(x=>!x.passed))process.exitCode=1;
})().catch(e=>{output.error=e.stack;save();console.error(e);process.exitCode=1;});
