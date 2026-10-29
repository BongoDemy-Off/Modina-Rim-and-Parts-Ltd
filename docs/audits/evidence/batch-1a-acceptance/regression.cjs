const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const pointerActivate = require('./pointer.cjs');
const baseURL = process.env.BATCH_1A_URL || 'http://127.0.0.1:4191';
const results = { baseURL, browser: '', runtime: process.version, navigation: [], resources: [], cases: [], console: [], axe: [], geometry: [] };
const output = path.join(__dirname, process.env.BATCH_1A_RESULT || 'regression-results.json');
const save = () => fs.writeFileSync(output, JSON.stringify(results, null, 2));
const redact = text => text.replace(/AIza[\w-]+/g, '[REDACTED]');
const widths = [320, 390, 430, 768, 1024, 1440];
const allProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../public-data.json'), 'utf8')).productsData;


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

async function test(name, fn) {
  if (process.env.BATCH_1A_FILTER && !new RegExp(process.env.BATCH_1A_FILTER).test(name)) return;
  results.currentCase=name;
  try { await fn(); results.cases.push({ name, passed: true }); console.log(`PASS ${name}`); }
  catch (error) { results.cases.push({ name, passed: false, error: redact(error.stack || String(error)) }); console.log(`FAIL ${name}: ${error.message.slice(0, 350)}`); }
  save();
}
async function settle(page, target) {
  await target.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForFunction(() => [...document.querySelectorAll('main')].every(el => getComputedStyle(el).opacity === '1'));
  if (await target.evaluate(el=>el.classList.contains('product-carousel-arrow')) && await page.evaluate(()=>matchMedia('(hover: hover) and (pointer: fine)').matches)) await target.hover();
  await ready(target);
}
async function unlocked(page) {
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  assert.deepEqual(await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow]), ['', '']);
}
async function scan(page, state) {
  await page.addScriptTag({ path: path.join(__dirname, '../axe.min.js') });
  const report = await page.evaluate(async () => {
    const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
    return r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
  });
  results.axe.push({ state, violations: report }); save();
  const targeted = report.filter(v => ['aria-dialog-name', 'select-name', 'button-name', 'label', 'nested-interactive', 'aria-valid-attr-value', 'aria-allowed-attr'].includes(v.id));
  assert.deepEqual(targeted, [], `Targeted accessibility failures in ${state}`);
}
async function modalChecks(page, trigger, initial, screenshot) {
  await trigger.focus();
  const before = await page.evaluate(() => ({ scrollY, headerWidth: document.querySelector('header').getBoundingClientRect().width }));
  await page.keyboard.press('Enter');
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toHaveCount(1);
  await expect(dialog.locator(initial)).toBeFocused();
  await ready(dialog.locator(initial));
  assert.equal(await dialog.evaluate(el => el.matches(':modal')), true);
  assert.equal(await page.evaluate(() => document.documentElement.style.overflow), 'hidden');
  const after = await page.evaluate(() => ({ scrollY, headerWidth: document.querySelector('header').getBoundingClientRect().width }));
  assert.ok(Math.abs(before.headerWidth - after.headerWidth) < 1, 'Header shifted on modal open');
  assert.equal(before.scrollY, after.scrollY);
  await page.locator('header a').first().evaluate(el => el.focus());
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog[open]')), true, 'Background acquired focus');
  for (const key of ['Shift+Tab', ...Array(12).fill('Tab'), ...Array(12).fill('Shift+Tab')]) {
    await page.keyboard.press(key);
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog[open]')), true, `Focus escaped with ${key}`);
  }
  const close = dialog.getByRole('button', { name: /^Close/ }).first();
  await expect(close).toBeVisible();
  await expect.poll(async () => {
    const r = await close.boundingBox();
    return !!r && r.x >= -1 && r.x + r.width <= page.viewportSize().width + 1 && r.y >= -1 && r.y + r.height <= page.viewportSize().height + 1;
  }, { timeout: 10000 }).toBe(true);
  const box = await close.boundingBox();
  if (!(box.x >= 0 && box.x + box.width <= page.viewportSize().width + 1 && box.y >= 0 && box.y + box.height <= page.viewportSize().height + 1)) {
    console.log('CLOSE GEOMETRY', JSON.stringify({ box, viewport: page.viewportSize(), containers: await dialog.evaluate(el => [el, ...el.querySelectorAll('div')].filter(e => e.scrollTop).map(e => ({ class: e.className, scrollTop: e.scrollTop, rect: e.getBoundingClientRect().toJSON() }))) }));
    await page.screenshot({ path: path.join(__dirname, 'close-geometry-diagnostic.png') });
  }
  assert.ok(box.x >= 0 && box.x + box.width <= page.viewportSize().width + 1 && box.y >= 0 && box.y + box.height <= page.viewportSize().height + 1, `Close outside viewport: ${JSON.stringify(box)}`);
  if (screenshot) {
    try { await page.screenshot({ path: path.join(__dirname, screenshot), timeout: 15000 }); }
    catch (error) {
      results.visualLimitations ||= [];
      results.visualLimitations.push({ screenshot, error: error.message });
      console.log(`SCREENSHOT LIMITATION ${screenshot}: ${error.message.slice(0, 150)}`);
    }
  }
  await page.keyboard.press('Escape');
  await unlocked(page);
  await expect(trigger).toBeFocused();
}

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  results.browser = browser.version();
  try {
    for (const lang of ['en', 'bn']) for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, hasTouch: width < 1440, isMobile: width < 768 });
      await context.addInitScript(lang => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', lang); }, lang);
      await safety(context);
      const page = await context.newPage(); page.setDefaultTimeout(8000);
      page.setDefaultNavigationTimeout(30000); instrument(page, lang, width);
      page.on('pageerror', e => results.console.push({ type: 'pageerror', lang, width, text: redact(e.message) }));
      page.on('console', m => { if (m.type() === 'error') results.console.push({ type: 'console', lang, width, text: redact(m.text()) }); });
      for (const [route, selector, initial] of [
        ['products', 'button[aria-label^="View details:"]', '#product-detail-title'],
        ['gallery', 'button[aria-label^="View image:"]', 'button'],
        ['careers', 'button[aria-label^="View role:"]', '#career-detail-title'],
        ['contact', 'form', null]
      ]) await test(`${lang}/${width}/${route}`, async () => {
        await navigate(page, `${baseURL}/${route}`, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        const target = page.locator(`main ${selector}`).first(); await settle(page, target);
        const geometry = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, headerHeight: document.querySelector('header').getBoundingClientRect().height }));
        results.geometry.push({ lang, route, ...geometry });
        assert.ok(geometry.scrollWidth <= width, 'Document overflow');
        assert.ok(width < 640 ? Math.abs(geometry.headerHeight - 112) < 1 : geometry.headerHeight >= 63.9 && geometry.headerHeight <= 72.1, 'Navbar composition changed');
        if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(__dirname, `after-${route}-${width}-${lang}.png`) });
        if (route === 'contact') {
          assert.deepEqual(await page.locator('main input,main textarea,main select').evaluateAll(els => els.map(e => ({ name: e.name, labels: e.labels.length })).filter(e => e.labels !== 1)), []);
          assert.equal(await page.locator('select[name="subject"]').inputValue(), '');
          assert.equal(await page.locator('textarea').inputValue(), '');
          if (width === 390) await scan(page, `${lang}/${width}/contact`);
        } else {
          if (route === 'products') {
            assert.equal(await target.evaluate(el => getComputedStyle(el).opacity), '1');
            const card = page.locator('.card-premium').first();
            const imageBefore = await card.locator('img').last().getAttribute('src');
            await settle(page, card.getByRole('button', { name: 'Next image', exact: true }));
            await pointerActivate(page, card.getByRole('button', { name: 'Next image', exact: true }));
            await frames(page);
            assert.notEqual(await card.locator('img').last().getAttribute('src'), imageBefore);
            await expect(page.locator('dialog[open]')).toHaveCount(0);
            await card.getByRole('button', { name: 'Go to slide 1', exact: true }).focus();
            await page.keyboard.press('Space');
            await expect(card.getByRole('button', { name: 'Go to slide 1', exact: true })).toHaveAttribute('aria-pressed', 'true');
          }
          await modalChecks(page, target, initial, [390, 1440].includes(width) ? `after-${route}-open-${width}-${lang}.png` : null);
          await target.click();
          await frames(page);
          if (route === 'careers') assert.deepEqual(await page.locator('dialog[open] input,dialog[open] textarea').evaluateAll(els => els.filter(e => e.labels.length !== 1).map(e => e.name)), []);
          if (width === 390) await scan(page, `${lang}/${width}/${route}-open`);
          await page.locator('dialog[open]').getByRole('button', { name: /^Close/ }).first().click();
          await unlocked(page);
          if (route !== 'products') {
            const filter = page.locator('main').getByRole('button', { name: route === 'gallery' ? /^Machinery/ : 'Quality', exact: route !== 'gallery' });
            await filter.click(); await expect(filter).toHaveAttribute('aria-pressed', 'true');
            await ready(page.locator(selector).first());
            await expect(page.locator(selector)).toHaveCount(route === 'gallery' ? 2 : 1);
          }
        }
      });
      await test(`${lang}/${width}/navigation`, async () => {
        await navigate(page, `${baseURL}/products`, { waitUntil: 'domcontentloaded' });
        if (width < 1280) {
          const opener = page.getByRole('button', { name: 'Open menu', exact: true });
          await opener.focus(); await page.keyboard.press('Space');
          const dialog = page.locator('dialog[open]');
          await expect(dialog.locator('#mobile-navigation a[href="/"]').last()).toBeFocused();
          await expect(opener).toHaveAttribute('aria-expanded', 'true');
          await ready(dialog.locator('button[aria-controls="mobile-nav-company"]'));
          const disclosure = dialog.locator('button[aria-controls="mobile-nav-company"]');
          await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
          const links = dialog.locator('#mobile-nav-company a');
          await expect(links.first()).toBeVisible(); await ready(links.first());
          assert.ok(await links.count() > 0);
          results.resources.push({ type: 'touch-proof', lang, width, events: await page.evaluate(() => window.acceptancePointers), hit: await disclosure.evaluate(el => { const r=el.getBoundingClientRect(); return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)); }) });
          await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
          await disclosure.tap(); await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
          await links.first().tap(); await expect(page).toHaveURL(/\/about$/); await unlocked(page);
          await navigate(page, baseURL+'/products', {waitUntil:'domcontentloaded'});
          await opener.tap(); await ready(dialog.locator('button[aria-controls="mobile-nav-company"]'));
          await dialog.locator('button[aria-controls="mobile-nav-company"]').tap();
          if (width === 390) { await scan(page, `${lang}/menu-open`); await page.screenshot({ path: path.join(__dirname, `after-menu-390-${lang}.png`) }); }
          await page.keyboard.press('Escape'); await unlocked(page); await expect(opener).toBeFocused();
          await opener.tap(); await ready(page.locator('dialog[open] #mobile-navigation'));
          await page.setViewportSize({ width: 1440, height: 900 });
          await unlocked(page);
          assert.equal(await page.locator('[data-public-main]').evaluate(el => el === document.activeElement), true, 'Breakpoint fallback was not main');
        } else {
          for (const id of ['quality', 'company', 'media']) {
            const trigger = page.locator(`button[aria-controls="desktop-nav-${id}"]`);
            await trigger.focus(); await page.keyboard.press('Space');
            await expect(trigger).toHaveAttribute('aria-expanded', 'true');
            await page.keyboard.press('Tab'); await expect(page.locator(`#desktop-nav-${id} a`).first()).toBeFocused();
            await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
            await expect(trigger).toHaveAttribute('aria-expanded', 'false');
            await page.mouse.move(0, 800); await trigger.hover(); await expect(trigger).toHaveAttribute('aria-expanded', 'true');
            await page.mouse.click(10, 500); await expect(trigger).toHaveAttribute('aria-expanded', 'false');
          }
        }
      });
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    await safety(context);
    const page = await context.newPage(); page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000); instrument(page, 'en', 1440);
    page.on('pageerror',e=>results.console.push({type:'pageerror',lang:'en',width:1440,text:redact(e.message)}));
    page.on('console',m=>{if(m.type()==='error')results.console.push({type:'console',lang:'en',width:1440,text:redact(m.text())});});
    await test('products/search-filters-pagination', async () => {
      await navigate(page, `${baseURL}/products`, { waitUntil: 'domcontentloaded' }); await ready(page.locator("main"));
      const cards = page.locator('button[aria-label^="View details:"]');
      await expect(cards).toHaveCount(9);
      await page.getByRole('button', { name: /^Next$/ }).click(); await ready(page.locator("main")); await expect(cards).toHaveCount(9);
      await page.getByRole('button', { name: /^Next$/ }).click(); await ready(page.locator("main")); await expect(cards).toHaveCount(3);
      await page.getByRole('button', { name: 'Filter by Hardware', exact: true }).click(); await ready(page.locator("main")); await expect(cards).toHaveCount(3);
      await page.getByRole('textbox', { name: 'Search products', exact: true }).fill('no-such-batch-product');
      await expect(page.getByText('No results found', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Clear Filter', exact: true }).click(); await ready(page.locator("main")); await expect(cards).toHaveCount(9);
      await page.getByRole('textbox', { name: 'Search products', exact: true }).fill('Wasar'); await ready(page.locator("main")); await expect(cards).toHaveCount(1);
    });
    await test('enquiry/all-products-and-direct-defaults', async () => {
      assert.ok(Array.isArray(allProducts) && allProducts.length === 21);
      for (const product of allProducts) {
        await navigate(page, `${baseURL}/contact?product=${encodeURIComponent(product.name)}`, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('select[name="subject"]')).toHaveValue('Product Inquiry');
        assert.ok((await page.locator('textarea').inputValue()).includes(`\n${product.name}\n`));
      }
      for (const query of ['', '?product=', '?product=Unknown']) {
        await navigate(page, `${baseURL}/contact${query}`, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('select')).toHaveValue(''); await expect(page.locator('textarea')).toHaveValue('');
      }
      assert.equal(await page.locator('#contact-email').evaluate(el => { el.value = 'invalid'; return el.validity.typeMismatch; }), true);
      assert.equal(await page.locator('#contact-name').evaluate(el => el.validity.valueMissing), true);
    });
    await test('enquiry/history-edited-values-and-route-departure', async () => {
      await navigate(page, `${baseURL}/products`, { waitUntil: 'domcontentloaded' });
      const trigger = page.locator('button[aria-label^="View details:"]').first(); await settle(page, trigger); await trigger.click();
      await page.locator('dialog[open]').getByRole('button', { name: 'Request Inquiry', exact: true }).click();
      await expect(page).toHaveURL(/\/contact\?product=/); await unlocked(page);
      const original = await page.locator('textarea').inputValue();
      await page.locator('#contact-message').fill('Edited enquiry retained.');
      await page.locator('#contact-subject').selectOption('Partnership');
      // Public router navigation to another query via a temporary test-owned link.
      await page.evaluate(name => { const link = document.createElement('a'); link.id = 'batch-query-link'; link.href = `/contact?product=${encodeURIComponent(name)}`; link.textContent = 'test query'; document.body.append(link); }, allProducts[1].name);
      // popstate with the router history index models same-route Back/Forward without reload.
      await page.evaluate(name => { const s = history.state; history.pushState({ ...s, key: 'batch-query', idx: s.idx + 1 }, '', `/contact?product=${encodeURIComponent(name)}`); dispatchEvent(new PopStateEvent('popstate', { state: history.state })); }, allProducts[1].name);
      await expect(page.locator('textarea')).toHaveValue('Edited enquiry retained.');
      await expect(page.locator('select')).toHaveValue('Partnership');
      await page.goBack(); await expect(page.locator('textarea')).toHaveValue('Edited enquiry retained.');
      await page.goForward(); await expect(page.locator('select')).toHaveValue('Partnership');
      await page.goBack(); await page.goBack(); await expect(page).toHaveURL(/\/products$/); await unlocked(page);
      await page.goForward(); await expect(page.locator('textarea')).toHaveValue(original);
    });
    await test('radius-and-admin-isolation', async () => {
      await navigate(page, `${baseURL}/products`, { waitUntil: 'domcontentloaded' });
      const radius = async selector => page.locator(selector).first().evaluate(el => getComputedStyle(el).borderRadius);
      assert.equal(await radius('button[aria-label="Filter by All"]'), '8px');
      assert.ok(parseFloat(await radius('button[aria-label="Next image"]')) >= 22);
      assert.ok(parseFloat(await radius('button[aria-label="Open chat"]')) >= 28);
      assert.equal(await radius('.btn-primary'), '8px'); assert.equal(await radius('.btn-secondary'), '8px');
      await page.locator('.card-premium').first().locator('button[aria-label^="View details:"]').focus();
      const outline = await page.locator('.card-premium').first().locator('button[aria-label^="View details:"]').evaluate(el => getComputedStyle(el).outlineWidth);
      assert.ok(parseFloat(outline) >= 2);
      await page.evaluate(() => { const b = document.createElement('button'); b.id = 'square-fixture'; b.className = 'rounded-none'; document.querySelector('.public-site').append(b); });
      assert.equal(await radius('#square-fixture'), '0px');
      await navigate(page, `${baseURL}/admin`, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('.admin-root button');
      const styles = await page.locator('.admin-root button').evaluateAll(bs => bs.slice(0, 15).map(b => ({ text: b.textContent.trim(), class: b.className, radius: getComputedStyle(b).borderRadius, background: getComputedStyle(b).backgroundColor, height: getComputedStyle(b).height })));
      const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, '../batch-1a/before-observations.json'), 'utf8')).find(x => x.route === 'admin').state;
      assert.deepEqual(styles, baseline);
    });
    await context.close();
  } finally { results.assertionsFinishedAt=new Date().toISOString(); save(); console.log('Closing browser after assertions'); const closeStart=Date.now(); await browser.close(); results.teardown = { closedNormally: true, durationMs:Date.now()-closeStart }; results.completed = true; save(); }
  const failed = results.cases.filter(c => !c.passed);
  console.log(`${results.cases.length - failed.length}/${results.cases.length} cases passed; ${results.axe.length} axe scans.`);
  if (failed.length) process.exitCode = 1;

})().catch(e => { console.error(e); save(); process.exitCode = 1; });
