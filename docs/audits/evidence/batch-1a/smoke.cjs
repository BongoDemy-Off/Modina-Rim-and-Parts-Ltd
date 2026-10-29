const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const result = [];
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    await context.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const [route, selector, initial] of [
      ['products', 'button[aria-label^="View details:"]', '#product-detail-title'],
      ['gallery', 'button[aria-label^="View image:"]', 'button'],
      ['careers', 'button[aria-label^="View role:"]', '#career-detail-title']
    ]) {
      await page.goto(`http://127.0.0.1:4182/${route}`, { waitUntil: 'domcontentloaded' });
      const trigger = page.locator(selector).first();
      await trigger.scrollIntoViewIfNeeded();
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.locator('dialog[open]');
      await expect(dialog).toHaveCount(1);
      await expect(dialog.locator(initial).first()).toBeFocused();
      await page.waitForTimeout(650);
      await page.screenshot({ path: path.join(__dirname, `smoke-${route}-open.png`) });
      for (let i = 0; i < 16; i++) {
        await page.keyboard.press(i % 2 ? 'Tab' : 'Shift+Tab');
        if (!await page.evaluate(() => !!document.activeElement.closest('dialog[open]'))) throw Error(`${route}: focus escaped`);
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      result.push({ route, passed: true, styles: await page.evaluate(() => ({ root: document.documentElement.style.overflow, body: document.body.style.overflow })) });
    }
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await expect(page.locator('#mobile-navigation a[href="/"]').last()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await page.setViewportSize({ width: 1440, height: 900 });
    const company = page.locator('button[aria-controls="desktop-nav-company"]');
    await company.focus(); await page.keyboard.press('Space');
    await expect(company).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(page.locator('#desktop-nav-company a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(company).toBeFocused();
    result.push({ navigation: true, errors });
    console.log(JSON.stringify(result, null, 2));
    fs.writeFileSync(path.join(__dirname, 'smoke-results.json'), JSON.stringify(result, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
