const { chromium, expect } = require('C:/Users/BongoDemy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const results = [];
const frame=page=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(r)));
(async () => {
  let diagnosticPage;
  const browser = await chromium.launch({ executablePath: 'C:/Users/BongoDemy/AppData/Local/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      console.log(`START ${reducedMotion}`);
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion });
      const errors = []; page.on('pageerror', e => { errors.push(e.message); console.log(`fixture pageerror: ${e.message}`); });
      await page.goto('http://127.0.0.1:4193/docs/audits/evidence/batch-1a-acceptance/lifecycle-harness.html', { waitUntil: 'domcontentloaded' });
      diagnosticPage=page; console.log('fixture loaded');
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
        el.requestClose();
        el.requestClose();
      });
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      assert.equal(await page.evaluate(() => batchHarness.metrics.closeRequests), beforeCancel + 1);
      console.log('duplicate native cancellation requests coalesced');
      for (let cycle = 0; cycle < 6; cycle++) {
        await trigger.click();
        await frame(page);
        await page.evaluate(() => batchHarness.setOpen(false));
        await frame(page);
        await page.evaluate(() => batchHarness.setOpen(true));
        await expect.poll(()=>page.locator('#fixture-title').evaluate(el=>{for(let a=el;a instanceof HTMLElement;a=a.parentElement)if(Number(getComputedStyle(a).opacity)<.99)return false;return true;})).toBe(true);
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
      await expect(page.locator('dialog[open]')).toHaveCount(0);
      await expect.poll(()=>page.evaluate(() => batchHarness.metrics.closeRequests)).toBe(beforeNative + 1);
      console.log('unexpected native close passed');
      // Background-to-panel pointer movement must not count as backdrop dismissal.
      await trigger.click(); await expect.poll(()=>page.locator('#fixture-title').evaluate(el=>el.getBoundingClientRect().x)).toBe(94);
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
      await expect(page.locator('dialog[open]')).toHaveCount(0); await trigger.click();
      await page.evaluate(() => batchHarness.setMounted(false));
      await expect(page.locator('dialog')).toHaveCount(0);
      assert.deepEqual(await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow]), ['', '']);
      assert.deepEqual(errors, []);
      console.log('route / unmount passed');
      results.push({ reducedMotion, passed: true, metrics: await page.evaluate(() => batchHarness.metrics), errors });
      await page.close();
    }
  } catch (e) { if(diagnosticPage&&!diagnosticPage.isClosed()) { const state=await diagnosticPage.evaluate(()=>({metrics:batchHarness.metrics,html:document.querySelector('dialog')?.outerHTML,styles:[...document.querySelectorAll('dialog div,dialog h2')].map(el=>({style:el.getAttribute('style'),opacity:getComputedStyle(el).opacity,rect:el.getBoundingClientRect().toJSON()})),scroll:[document.documentElement.style.overflow,document.body.style.overflow]})); fs.writeFileSync(path.join(__dirname,'lifecycle-failure-state.json'),JSON.stringify(state,null,2)); await diagnosticPage.screenshot({path:path.join(__dirname,'lifecycle-failure.png')}); } console.error(e); throw e; }
  finally {
    fs.writeFileSync(path.join(__dirname, 'lifecycle-results.json'), JSON.stringify(results, null, 2));
    console.log('closing lifecycle browser');
    await browser.close(); const teardown = {closedNormally:true,node:process.version};
    fs.writeFileSync(path.join(__dirname, 'lifecycle-teardown.json'), JSON.stringify(teardown, null, 2));
  }
  console.log(JSON.stringify(results, null, 2));

})().catch(e => { console.error(e); process.exit(1); });
