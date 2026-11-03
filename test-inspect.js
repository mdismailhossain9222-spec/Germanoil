const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Get all nav elements with their text
  const navInfo = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('nav'));
    return navs.map((nav, i) => ({
      index: i,
      className: nav.className,
      text: nav.textContent?.substring(0, 120),
      parentTag: nav.parentElement?.tagName,
      parentClass: nav.parentElement?.className?.substring(0, 60),
    }));
  });
  console.log("=== NAV elements ===");
  navInfo.forEach(n => console.log(JSON.stringify(n)));

  // Get all liquid-glass elements with text
  const lgInfo = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('.liquid-glass'));
    return els.map((el, i) => ({
      index: i,
      tag: el.tagName,
      text: el.textContent?.substring(0, 80),
    }));
  });
  console.log("\n=== .liquid-glass elements ===");
  lgInfo.forEach(e => console.log(JSON.stringify(e)));

  // Get all tagline texts
  const taglines = await page.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.includes('MANUFACTURED'));
    return lines;
  });
  console.log("\n=== Tagline lines ===");
  taglines.forEach(l => console.log(l));

  await browser.close();
}

run().catch(console.error);
