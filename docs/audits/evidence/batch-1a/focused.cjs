const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const pointerActivate = require('./pointer.cjs');
(async () => {
  const server = await chromium.launchServer({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const browser = await chromium.connect(server.wsEndpoint());
  const results = {};
  try {
    const context = await browser.newContext({ viewport: { width: 320, height: 844 }, hasTouch: true, isMobile: true });
    await context.addInitScript(() => { sessionStorage.setItem('modina_loaded', '1'); localStorage.setItem('i18nextLng', 'en'); });
    await context.route('**/*', r => ['GET', 'HEAD', 'OPTIONS'].includes(r.request().method()) ? r.continue() : r.abort());
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4181/products', { waitUntil: 'domcontentloaded' });
    const card = page.locator('.card-premium').first();
    const next = card.getByRole('button', { name: 'Next image', exact: true });
    await next.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' })); await page.waitForTimeout(600);
    await pointerActivate(page, next, true); await page.waitForTimeout(450);
    await expect(card.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute('aria-pressed', 'true');
    await next.focus(); await page.keyboard.press('Space'); await page.waitForTimeout(450);
    await expect(card.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    const details = card.getByRole('button', { name: /^View details:/ });
    await pointerActivate(page, details, true);
    await expect(page.locator('#product-detail-title')).toBeFocused();
    await page.keyboard.press('Escape'); await expect(page.locator('dialog[open]')).toHaveCount(0);
    results.touchAndKeyboardCarousel = true;
    assert.equal(await page.locator('button button').count(), 0);
    // Label activation and native validity only; no submit action.
    await page.goto('http://127.0.0.1:4181/contact', { waitUntil: 'domcontentloaded' });
    await page.locator('label[for="contact-name"]').evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' })); await page.waitForTimeout(800);
    await pointerActivate(page, page.locator('label[for="contact-name"]'), true); await expect(page.locator('#contact-name')).toBeFocused();
    assert.equal(await page.locator('#contact-name').evaluate(e => e.validity.valueMissing), true);
    results.labelActivation = true;
    // Native menu route departure and same-tab Back/Forward.
    await page.getByRole('button', { name: 'Open menu', exact: true }).tap(); await page.waitForTimeout(400);
    await page.locator('#mobile-navigation a[href="/products"]').tap();
    await expect(page).toHaveURL(/\/products$/); await expect(page.locator('dialog[open]')).toHaveCount(0);
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    await page.goBack(); await expect(page).toHaveURL(/\/contact$/); await page.goForward(); await expect(page).toHaveURL(/\/products$/);
    results.menuRouteAndHistory = true;
    // Mobile search remains nonmodal and returns focus on Escape.
    const search = page.getByRole('button', { name: 'Search', exact: true }); await search.tap();
    await expect(page.locator('#mobile-search input')).toBeFocused();
    await page.keyboard.press('Escape'); await expect(search).toBeFocused(); await expect(page.locator('dialog[open]')).toHaveCount(0);
    results.nonmodalSearch = true;
    // Representative hover / active / focus / computed radius without clicking submit.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:4181/contact', { waitUntil: 'domcontentloaded' });
    const primary = page.locator('form button[type="submit"]');
    await primary.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' })); await page.waitForTimeout(800);
    const style = async () => primary.evaluate(e => { const s = getComputedStyle(e); return { background: s.backgroundColor, radius: s.borderRadius, outline: s.outlineWidth, active: e.matches(':active'), focus: e.matches(':focus-visible') }; });
    const normal = await style(); await primary.hover(); await page.waitForTimeout(350); const hover = await style();
    await page.mouse.down(); const active = await style(); await page.mouse.move(2, 800); await page.mouse.up();
    await primary.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab'); const focus = await style();
    results.primaryStyles = { normal, hover, active, focus };
    assert.equal(normal.radius, '8px'); assert.equal(hover.background, 'rgb(179, 21, 21)'); assert.equal(active.active, true); assert.ok(parseFloat(focus.outline) >= 2);
    for (const width of [639, 640, 1279, 1280]) {
      await page.setViewportSize({ width, height: 900 }); await page.waitForTimeout(400);
      const h = await page.locator('header').evaluate(e => e.getBoundingClientRect().height);
      assert.ok(width < 640 ? h === 112 : h >= 64 && h <= 72);
      if (width < 1280) { await page.getByRole('button', { name: 'Open menu', exact: true }).click(); await page.keyboard.press('Escape'); await expect(page.locator('dialog[open]')).toHaveCount(0); }
    }
    results.breakpoints = true;
    console.log(JSON.stringify(results, null, 2));
  } catch (e) { results.error = e.stack; console.error(e); process.exitCode = 1; }
  finally {
    fs.writeFileSync(path.join(__dirname, 'focused-results.json'), JSON.stringify(results, null, 2));
    results.teardown = await require('./browser-cleanup.cjs')(server, browser);
    fs.writeFileSync(path.join(__dirname, 'focused-results.json'), JSON.stringify(results, null, 2));
    process.exit(process.exitCode || 0);
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
