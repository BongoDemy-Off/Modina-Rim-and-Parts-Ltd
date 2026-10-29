// Acceptance-only runner preparation. Original evidence is read, never edited.
const fs = require('node:fs');
const path = require('node:path');
const dir = __dirname;
let s = fs.readFileSync(path.join(dir, '../batch-1a/regression.cjs'), 'utf8');
const replace = (a,b) => { if (!s.includes(a)) throw Error('Missing source fragment: '+a.slice(0,80)); s=s.replace(a,b); };
replace("'http://127.0.0.1:4181'", "'http://127.0.0.1:4191'");
replace("../public-data.json", "../public-data.json");
replace("'../axe.min.js'", "'../axe.min.js'");
replace("'before-observations.json'", "'../batch-1a/before-observations.json'");
replace("browser: '', cases", "browser: '', runtime: process.version, navigation: [], resources: [], cases");
replace("  const server = await chromium.launchServer({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });\n  const browser = await chromium.connect(server.wsEndpoint());", "  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });");
s=s.replace(/await context\.route\('\*\*\/\*', r => \['GET', 'HEAD', 'OPTIONS'\]\.includes\(r\.request\(\)\.method\(\)\) \? r\.continue\(\) : r\.abort\(\)\);/g, 'await safety(context);');
s=s.replaceAll('await page.goto(', 'await navigate(page, ');
replace("page.setDefaultNavigationTimeout(30000);", "page.setDefaultNavigationTimeout(30000); instrument(page, lang, width);");
replace("    page.setDefaultNavigationTimeout(30000);\n    await test('products/search-filters-pagination'", "    page.setDefaultNavigationTimeout(30000); instrument(page, 'en', 1440);\n    page.on('pageerror',e=>results.console.push({type:'pageerror',lang:'en',width:1440,text:redact(e.message)}));\n    page.on('console',m=>{if(m.type()==='error')results.console.push({type:'console',lang:'en',width:1440,text:redact(m.text())});});\n    await test('products/search-filters-pagination'");
// All remaining legacy timing waits become conditions or rendering-frame waits.
replace("  await page.waitForTimeout(850);", "  if (await target.evaluate(el=>el.classList.contains('product-carousel-arrow')) && await page.evaluate(()=>matchMedia('(hover: hover) and (pointer: fine)').matches)) await target.hover();\n  await ready(target);");
s=s.replaceAll('await page.waitForTimeout(450);', 'await frames(page);');
s=s.replaceAll('await page.waitForTimeout(500);', 'await ready(dialog.locator(initial));');
s=s.replaceAll('await page.waitForTimeout(900);', 'await ready(page.locator(selector).first());');
s=s.replaceAll('await page.waitForTimeout(700);', 'await ready(page.locator("main"));');
s=s.replaceAll('await page.waitForTimeout(650);', 'await ready(dialog.locator(\'button[aria-controls="mobile-nav-company"]\'));');
s=s.replaceAll('await page.waitForTimeout(400);', 'await ready(page.locator(\'dialog[open] #mobile-navigation\'));');
replace("await disclosure.focus(); await page.keyboard.press('Space'); await expect(disclosure).toHaveAttribute('aria-expanded', 'true');", `await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
          const links = dialog.locator('#mobile-nav-company a');
          await expect(links.first()).toBeVisible(); await ready(links.first());
          assert.ok(await links.count() > 0);
          results.resources.push({ type: 'touch-proof', lang, width, events: await page.evaluate(() => window.acceptancePointers), hit: await disclosure.evaluate(el => { const r=el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)); }) });
          await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
          await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
          await links.first().tap(); await expect(page).toHaveURL(/\\/about$/); await unlocked(page);
          await navigate(page, baseURL+'/products', {waitUntil:'domcontentloaded'});
          await opener.tap(); await ready(dialog.locator('button[aria-controls="mobile-nav-company"]'));
          await dialog.locator('button[aria-controls="mobile-nav-company"]').tap();`);
replace("await opener.click(); await ready(page.locator('dialog[open] #mobile-navigation'));", "await opener.tap(); await ready(page.locator('dialog[open] #mobile-navigation'));");
replace("save(); results.teardown = await require('./browser-cleanup.cjs')(server, browser); save();", "results.assertionsFinishedAt=new Date().toISOString(); save(); console.log('Closing browser after assertions'); const closeStart=Date.now(); await browser.close(); results.teardown = { closedNormally: true, durationMs:Date.now()-closeStart }; results.completed = true; save();");
replace("  process.exit(process.exitCode || 0);", "");
replace("  try { await fn(); results.cases.push", "  results.currentCase=name;\n  try { await fn(); results.cases.push");
// No fixed waits remain in the acceptance sweep.
if (s.includes('waitForTimeout')) throw Error('Unexpected fixed timing wait remains');
const helpers = `
const safeURL = raw => { const u=new URL(raw); return u.origin+u.pathname; };
async function safety(context) {
  await context.route('**/*', r => {
    const q=r.request(); const u=new URL(q.url());
    if (['GET','HEAD','OPTIONS'].includes(q.method())) return r.continue();
    const analytics=['www.google-analytics.com','www.google.com'].includes(u.hostname) && u.pathname==='/g/collect';
    results.resources.push({type:analytics?'locally-fulfilled-analytics':'blocked-write',url:safeURL(q.url()),method:q.method(),resourceType:q.resourceType()});
    return analytics ? r.fulfill({status:204,body:''}) : r.abort();
  });
  await context.addInitScript(() => { window.acceptancePointers=[]; addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(b)window.acceptancePointers.push({pointerType:e.pointerType,name:b.getAttribute('aria-controls')||b.getAttribute('aria-label')||b.textContent.trim()});},true); });
}
function instrument(page,lang,width) {
 page.on('requestfailed',r=>results.resources.push({type:'failed',lang,width,url:safeURL(r.url()),method:r.method(),pageURL:safeURL(page.url()),resourceType:r.resourceType(),error:r.failure()?.errorText}));
 page.on('response',r=>{if(r.status()>=400)results.resources.push({type:'http-error',lang,width,url:safeURL(r.url()),status:r.status(),resourceType:r.request().resourceType()});});
}
async function navigate(page,url,options) {
 const start=Date.now(), pending=new Map();
 const req=r=>pending.set(r,safeURL(r.url())); const done=r=>pending.delete(r);
 page.on('request',req);page.on('requestfinished',done);page.on('requestfailed',done);
 const slow=setTimeout(()=>results.navigation.push({case:results.currentCase,url,stage:'pending-at-8s',pending:[...pending].map(([r,url])=>({url,type:r.resourceType()}))}),8000);
 try { const response=await page.goto(url,options); results.navigation.push({case:results.currentCase,url,status:response?.status(),domcontentloadedMs:Date.now()-start}); return response; }
 finally {clearTimeout(slow);page.off('request',req);page.off('requestfinished',done);page.off('requestfailed',done);save();}
}
async function frames(page) { await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))); }
async function ready(target) {
 await expect(target).toBeVisible();
 await expect.poll(()=>target.evaluate(el=>{for(let a=el;a instanceof HTMLElement;a=a.parentElement){const c=getComputedStyle(a);if(Number(c.opacity)<.99||c.visibility==='hidden')return false;}return true;})).toBe(true);
}
`;
s=s.replace('async function test(name, fn) {', helpers+'\nasync function test(name, fn) {');
fs.writeFileSync(path.join(dir,'regression.cjs'),s);
fs.writeFileSync(path.join(dir,'pointer.cjs'), `const {expect}=require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
module.exports=async(page,target)=>{await target.scrollIntoViewIfNeeded();await expect.poll(()=>target.evaluate(el=>{for(let a=el;a instanceof HTMLElement;a=a.parentElement)if(Number(getComputedStyle(a).opacity)<.99)return false;const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);if(await page.evaluate(()=>navigator.maxTouchPoints>0))await target.tap();else await target.click();};`);
console.log('Acceptance runner prepared; original evidence unchanged.');
