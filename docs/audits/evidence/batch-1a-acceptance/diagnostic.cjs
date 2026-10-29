const { chromium } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const events = [];
const start = Date.now();
const safe = value => { try { const u = new URL(value); return u.origin + u.pathname; } catch { return String(value).replace(/AIza[\w-]+/g, '[REDACTED]'); } };
const log = (type, data = {}) => { const e = { ms: Date.now() - start, type, ...data }; events.push(e); console.log(JSON.stringify(e)); };
const save = () => fs.writeFileSync(path.join(__dirname, 'diagnostic.json'), JSON.stringify(events, null, 2));
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  log('browser', { version: browser.version(), node: process.version });
  try {
    const context = await browser.newContext({ viewport: { width: 320, height: 844 }, hasTouch: true, isMobile: true });
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'bn'); window.acceptanceInput = []; document.addEventListener('pointerdown', e => window.acceptanceInput.push({ pointerType: e.pointerType, name: e.target.closest('button')?.textContent.trim() }), true); });
    await context.route('**/*', r => {
      const req = r.request();
      if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method())) { log('intentional-block', { url: safe(req.url()), method: req.method(), resourceType: req.resourceType() }); return r.abort(); }
      return r.continue();
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page); await cdp.send('Network.enable');
    const requests = new Map();
    cdp.on('Network.requestWillBeSent', e => { requests.set(e.requestId, { url: safe(e.request.url), type: e.type, began: Date.now() - start }); });
    cdp.on('Network.loadingFailed', e => log('cdp-failure', { ...requests.get(e.requestId), error: e.errorText, blockedReason: e.blockedReason, cors: e.corsErrorStatus, canceled: e.canceled }));
    page.on('requestfailed', r => log('requestfailed', { url: safe(r.url()), resourceType: r.resourceType(), error: r.failure()?.errorText }));
    page.on('response', r => { if (r.status() >= 400) log('http-error', { url: safe(r.url()), status: r.status(), resourceType: r.request().resourceType() }); });
    page.on('pageerror', e => log('pageerror', { error: e.message }));
    page.on('domcontentloaded', () => log('domcontentloaded', { url: safe(page.url()) }));
    log('navigation-start');
    await page.goto('http://127.0.0.1:4191/products', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
    const company = page.locator('#mobile-navigation button[aria-controls="mobile-nav-company"]');
    await page.waitForFunction(() => { const e = document.querySelector('#mobile-navigation button[aria-controls="mobile-nav-company"]'); if (!e) return false; const r = e.getBoundingClientRect(); return r.x >= 0 && r.right <= innerWidth && getComputedStyle(e.parentElement.parentElement).opacity === '1'; });
    log('before-company-tap', await company.evaluate(e => { const r = e.getBoundingClientRect(); return { rect: r.toJSON(), hit: e.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)), outer: e.parentElement.parentElement.getAttribute('style') }; }));
    await company.tap({ timeout: 8000 });
    log('after-company-tap', { expanded: await company.getAttribute('aria-expanded'), pointers: await page.evaluate(() => window.acceptanceInput) });
    await page.screenshot({ path: path.join(__dirname, 'bn-320-touch.png'), timeout: 15000 });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('dialog[open]'));
    log('closed', await page.evaluate(() => ({ root: document.documentElement.style.overflow, body: document.body.style.overflow })));
    await context.close(); log('context-closed');
  } catch (error) { log('test-error', { error: error.message }); process.exitCode = 1; }
  finally { save(); log('browser-closing'); await browser.close(); log('browser-closed'); save(); }
})().catch(e => { log('fatal', { error: e.message }); save(); process.exitCode = 1; });
