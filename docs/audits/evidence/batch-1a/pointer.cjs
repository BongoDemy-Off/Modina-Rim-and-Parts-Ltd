// Real pointer input after viewport hit testing. This avoids locator stability
// retries fighting existing card hover transforms, without forcing DOM clicks.
module.exports = async function pointerActivate(page, target, touch = false) {
  await target.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(600);
  let box = await target.boundingBox();
  if (!box) throw Error('Pointer target has no geometry');
  if (!touch) { await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(350); }
  box = await target.boundingBox();
  let point, hittable = false;
  for (let attempt = 0; attempt < 40 && !hittable; attempt++) {
    box = await target.boundingBox();
    point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    hittable = await target.evaluate((e, p) => {
      let a = e;
      while (a instanceof HTMLElement) {
        if (parseFloat(getComputedStyle(a).opacity) < 0.98 || getComputedStyle(a).visibility === 'hidden') return false;
        a = a.parentElement;
      }
      return e.contains(document.elementFromPoint(p.x, p.y));
    }, point);
    if (!hittable) await page.waitForTimeout(200);
  }
  if (!hittable) throw Error(`Pointer target not visibly hittable at ${JSON.stringify(point)}`);
  if (touch) await page.touchscreen.tap(point.x, point.y);
  else await page.mouse.click(point.x, point.y);
};
