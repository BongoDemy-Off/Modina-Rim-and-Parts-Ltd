const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const results = [];
(async () => {
  const server = await chromium.launchServer({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  const browser = await chromium.connect(server.wsEndpoint());
  try {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      console.log(`START ${reducedMotion}`);
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion });
      const errors = []; page.on('pageerror', e => { errors.push(e.message); console.log(`fixture pageerror: ${e.message}`); });
      await page.goto('http://127.0.0.1:4183/docs/audits/evidence/batch-1a/lifecycle-harness.html', { waitUntil: 'domcontentloaded' });
      console.log('fixture loaded');
      const trigger = page.locator('#opener'); await trigger.click();
      await expect(page.locator('dialog[open]')).toHaveCount(1);
      await expect(page.locator('#fixture-title')).toBeFocused();
      console.log('initial focus passed');
      const start = await page.evaluate(() => ({ ...batchHarness.metrics }));
      // Escape requests closing once, retains native modality through exit.
      await page.keyboard.press('Escape');
      if (reducedMotion === 'no-preference') await expect(page.locator('dialog[open]')).toHaveCount(1);
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      await expect(trigger).toBeFocused();
      assert.equal(await page.evaluate(() => batchHarness.metrics.closeRequests), start.closeRequests + 1);
      console.log('native cancel / exit / restoration passed');
      await trigger.click();
      const beforeCancel = await page.evaluate(() => batchHarness.metrics.closeRequests);
      await page.locator('dialog[open]').evaluate(el => {
        el.dispatchEvent(new Event('cancel', { cancelable: true }));
        el.dispatchEvent(new Event('cancel', { cancelable: true }));
      });
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      assert.equal(await page.evaluate(() => batchHarness.metrics.closeRequests), beforeCancel + 1);
      console.log('duplicate native cancellation requests coalesced');
      for (let cycle = 0; cycle < 6; cycle++) {
        await trigger.click();
        await page.waitForTimeout(30);
        await page.evaluate(() => batchHarness.setOpen(false));
        await page.waitForTimeout(20);
        await page.evaluate(() => batchHarness.setOpen(true));
        await page.waitForTimeout(400);
        await expect(page.locator('dialog[open]')).toHaveCount(1);
        assert.equal(await page.evaluate(() => document.documentElement.style.overflow), 'hidden');
        await page.keyboard.press('Escape');
        await expect(page.locator('dialog[open]')).toHaveCount(0);
        await expect(trigger).toBeFocused();
        console.log(`rapid cycle ${cycle + 1} passed`);
      }
      // An unexpected native close synchronizes the controlled state once.
      await trigger.click();
      const beforeNative = await page.evaluate(() => batchHarness.metrics.closeRequests);
      await page.locator('dialog[open]').evaluate(el => el.close());
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => batchHarness.metrics.closeRequests), beforeNative + 1);
      console.log('unexpected native close passed');
      // Background-to-panel pointer movement must not count as backdrop dismissal.
      await trigger.click(); await page.waitForTimeout(350);
      await page.mouse.move(10, 300); await page.mouse.down(); await page.mouse.move(200, 300); await page.mouse.up();
      await expect(page.locator('dialog[open]')).toHaveCount(1);
      await page.mouse.click(10, 300); await expect(page.locator('dialog[open]')).toHaveCount(0);
      console.log('backdrop passed');
      // Opener removed before close -> visible main fallback.
      await trigger.click(); await page.evaluate(() => document.querySelector('#opener').hidden = true);
      await page.keyboard.press('Escape'); await expect(page.locator('dialog[open]')).toHaveCount(0);
      await expect(page.locator('main')).toBeFocused();
      await page.evaluate(() => document.querySelector('#opener').hidden = false);
      console.log('hidden opener fallback passed');
      // Same-component route departure and unmount both release locks immediately.
      await trigger.click(); await page.evaluate(() => batchHarness.navigate('/next'));
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '');
      await page.waitForTimeout(400); await trigger.click();
      await page.evaluate(() => batchHarness.setMounted(false));
      await expect(page.locator('dialog')).toHaveCount(0);
      assert.deepEqual(await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow]), ['', '']);
      assert.deepEqual(errors, []);
      console.log('route / unmount passed');
      results.push({ reducedMotion, passed: true, metrics: await page.evaluate(() => batchHarness.metrics), errors });
      await page.close();
    }
  } catch (e) { console.error(e); throw e; }
  finally {
    fs.writeFileSync(path.join(__dirname, 'lifecycle-results.json'), JSON.stringify(results, null, 2));
    console.log('closing lifecycle browser');
    const teardown = await require('./browser-cleanup.cjs')(server, browser);
    fs.writeFileSync(path.join(__dirname, 'lifecycle-teardown.json'), JSON.stringify(teardown, null, 2));
  }
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
