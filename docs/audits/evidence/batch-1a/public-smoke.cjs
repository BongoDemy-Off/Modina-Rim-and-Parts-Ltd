const { chromium } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const routes = ['/', '/about', '/mission', '/sustainability', '/products', '/quality', '/certificates', '/downloads', '/news', '/news/1', '/news/invalid', '/blog', '/blog/1', '/blog/featured', '/blog/invalid', '/contact', '/gallery', '/careers', '/faq', '/privacy', '/terms', '/batch-missing-page'];
(async () => {
  const server = await chromium.launchServer({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const browser = await chromium.connect(server.wsEndpoint());
  const results = { states: [], errors: [] };
  try {
    const context = await browser.newContext();
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    await context.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
    const page = await context.newPage();
    page.on('pageerror', e => results.errors.push(e.message.replace(/AIza[\w-]+/g, '[REDACTED]')));
    for (const width of [320, 1440]) for (const route of routes) {
      await page.setViewportSize({ width, height: width === 320 ? 844 : 900 });
      await page.goto(`http://127.0.0.1:4181${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      const state = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, hasMain: !!document.querySelector('main'), text: document.querySelector('main')?.innerText.length, headerHeight: document.querySelector('header').getBoundingClientRect().height }));
      assert.ok(state.hasMain && state.text > 0 && state.scrollWidth <= width, `${route}/${width} rendering failed`);
      results.states.push({ route, ...state });
    }
    const fresh = await browser.newPage({ viewport: { width: 320, height: 844 } });
    await fresh.goto('http://127.0.0.1:4181/', { waitUntil: 'domcontentloaded' });
    await fresh.waitForFunction(() => sessionStorage.getItem('modina_loaded') === '1', { timeout: 15000 });
    results.freshPreloader = true;
    assert.deepEqual(results.errors, []);
    console.log(`${results.states.length} public states and fresh-session preloader passed.`);
  } finally {
    fs.writeFileSync(path.join(__dirname, 'public-smoke-results.json'), JSON.stringify(results, null, 2));
    await server.kill(); await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
