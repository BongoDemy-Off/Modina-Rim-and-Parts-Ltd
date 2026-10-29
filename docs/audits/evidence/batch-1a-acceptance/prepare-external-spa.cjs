const fs=require('node:fs');const path=require('node:path');
let s=fs.readFileSync(path.join(__dirname,'external-resources.cjs'),'utf8');
s=s.replace("viewport:{width:390,height:844},hasTouch:true,isMobile:true", "viewport:{width:1440,height:900},hasTouch:false,isMobile:false");
s=s.replace("const response=await page.goto(record.url,{waitUntil:'domcontentloaded',timeout:30000});record.status=response.status();record.domcontentloadedMs=Date.now()-start;", `const response=await page.goto(origin+'/',{waitUntil:'domcontentloaded',timeout:30000});record.homeStatus=response.status();record.domcontentloadedMs=Date.now()-start;
    if(route==='/products')await page.locator('header').getByRole('link',{name:'Products',exact:true}).click();
    else {await page.locator('header').getByText('Media',{exact:true}).hover();await page.locator('header').getByRole('link',{name:'Gallery',exact:true}).click();}
    await page.waitForURL(record.url);record.spaURL=page.url();`);
s=s.replaceAll("'external-resources.json'", "'external-spa-resources.json'");
fs.writeFileSync(path.join(__dirname,'external-spa-resources.cjs'),s);
