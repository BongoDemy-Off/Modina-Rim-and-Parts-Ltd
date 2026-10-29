const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const result = { assetPolicy: 'External requests blocked to isolate local interaction behavior; not a visual comparison.', cases: [] };
(async () => {
  const server = await chromium.launchServer({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const browser = await chromium.connect(server.wsEndpoint());
  try {
    const context = await browser.newContext({ viewport: { width: 1024, height: 900 }, hasTouch: true });
    await context.route('**/*', r => r.request().url().startsWith('http://127.0.0.1:4181/') && ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    const page = await context.newPage(); page.setDefaultTimeout(20000);
    const run = async (name, fn) => {
      try { await fn(); result.cases.push({ name, passed: true }); console.log(`PASS ${name}`); }
      catch (e) { result.cases.push({ name, passed: false, error: e.message }); console.log(`FAIL ${name}: ${e.message.slice(0, 300)}`); }
    };
    await run('1024-touch-carousel-visible-and-independent', async () => {
      await page.goto('http://127.0.0.1:4181/products', { waitUntil: 'domcontentloaded' });
      const next = page.locator('.card-premium').first().getByRole('button', { name: 'Next image', exact: true });
      await expect.poll(() => next.evaluate(e => getComputedStyle(e).opacity)).toBe('1');
      await next.focus(); await page.keyboard.press('Space');
      await expect(page.locator('.card-premium').first().getByRole('button', { name: 'Go to slide 2', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      const details = page.getByRole('button', { name: /^View details:/ }).first(); await details.focus(); await page.keyboard.press('Enter');
      await expect(page.locator('#product-detail-title')).toBeFocused();
      await page.keyboard.press('Escape'); await expect(page.locator('dialog[open]')).toHaveCount(0); await expect(details).toBeFocused();
    });
    await run('1440-careers-settled-close-and-containment', async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('http://127.0.0.1:4181/careers', { waitUntil: 'domcontentloaded' });
      const trigger = page.getByRole('button', { name: /^View role:/ }).first(); await trigger.focus(); await page.keyboard.press('Enter');
      await expect(page.locator('#career-detail-title')).toBeFocused();
      const close = page.locator('dialog[open]').getByRole('button', { name: /^Close/ });
      await expect.poll(async () => { const r = await close.boundingBox(); return !!r && r.x >= -1 && r.x + r.width <= 1441 && r.y >= -1 && r.y + r.height <= 901; }, { timeout: 15000 }).toBe(true);
      for (let i = 0; i < 15; i++) { await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog[open]')), true); }
      const r = await close.boundingBox(); assert.ok(r.x + r.width <= 1441 && r.y >= -1);
      await page.keyboard.press('Escape'); await expect(page.locator('dialog[open]')).toHaveCount(0); await expect(trigger).toBeFocused();
    });
    await run('desktop-disclosure-exit-removes-links-from-tab-order', async () => {
      const trigger = page.locator('button[aria-controls="desktop-nav-company"]'); await trigger.focus(); await page.keyboard.press('Space');
      await page.keyboard.press('Tab'); await expect(page.locator('#desktop-nav-company a').first()).toBeFocused();
      await page.keyboard.press('Escape'); await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => !!document.activeElement.closest('#desktop-nav-company')), false);
    });
    await run('contact-labels-and-visible-native-fallback', async () => {
      await page.setViewportSize({ width: 390, height: 844 }); await page.goto('http://127.0.0.1:4181/contact', { waitUntil: 'domcontentloaded' });
      await page.locator('label[for="contact-name"]').evaluate(e => e.click()); await expect(page.locator('#contact-name')).toBeFocused();
      assert.equal(await page.locator('#contact-name').evaluate(e => e.validity.valueMissing), true);
      const trigger = page.getByRole('button', { name: 'Open menu', exact: true }); await trigger.focus(); await page.keyboard.press('Space');
      await page.setViewportSize({ width: 1280, height: 900 }); await expect(page.locator('dialog[open]')).toHaveCount(0);
      await expect(page.locator('[data-public-main]')).toBeFocused();
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    });
  } finally {
    fs.writeFileSync(path.join(__dirname, 'local-checks-results.json'), JSON.stringify(result, null, 2));
    result.teardown = await require('./browser-cleanup.cjs')(server, browser);
    fs.writeFileSync(path.join(__dirname, 'local-checks-results.json'), JSON.stringify(result, null, 2));
  }
  process.exit(result.cases.some(c => !c.passed) ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
