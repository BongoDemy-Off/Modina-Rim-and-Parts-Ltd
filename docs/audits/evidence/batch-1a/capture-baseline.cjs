const { chromium } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const observations = [];
  try {
    const context = await browser.newContext();
    await context.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    const page = await context.newPage();
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      for (const route of ['products', 'gallery', 'careers', 'contact']) {
        await page.goto(`http://127.0.0.1:4181/${route}`, { waitUntil: 'domcontentloaded' });
        const target = route === 'products' ? 'main h3' : route === 'gallery' ? 'main img' : route === 'careers' ? 'main h3' : 'main form';
        await page.locator(target).first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(1800);
        observations.push({ route, width, state: await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, buttons: [...document.querySelectorAll('button')].filter(b => b.getBoundingClientRect().width).slice(0, 16).map(b => ({ name: b.getAttribute('aria-label') || b.textContent.trim(), radius: getComputedStyle(b).borderRadius })) })) });
        await page.screenshot({ path: path.join(__dirname, `before-${route}-${width}.png`) });
      }
    }
    await page.goto('http://127.0.0.1:4181/admin', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.admin-root button');
    observations.push({ route: 'admin', width: 1440, state: await page.locator('.admin-root button').evaluateAll(bs => bs.slice(0, 15).map(b => ({ text: b.textContent.trim(), class: b.className, radius: getComputedStyle(b).borderRadius, background: getComputedStyle(b).backgroundColor, height: getComputedStyle(b).height }))) });
    fs.writeFileSync(path.join(__dirname, 'before-observations.json'), JSON.stringify(observations, null, 2));
    console.log('Baseline screenshots and Admin computed styles saved.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
