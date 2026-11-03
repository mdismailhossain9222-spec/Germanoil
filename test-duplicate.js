const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Check for duplicate navbars
  const navCount = await page.evaluate(() => {
    const navs = document.querySelectorAll('nav');
    return navs.length;
  });
  console.log(`<nav> elements: ${navCount}`);

  // Check for duplicate "GERMANOIL" brand text
  const brandCount = await page.evaluate(() => {
    const text = document.body.innerText;
    const matches = text.match(/GERMANOIL/g);
    return matches ? matches.length : 0;
  });
  console.log(`"GERMANOIL" text occurrences: ${brandCount}`);

  // Check for duplicate tagline
  const taglineCount = await page.evaluate(() => {
    const text = document.body.innerText;
    const matches = text.match(/MANUFACTURED IN DUBAI/gi);
    return matches ? matches.length : 0;
  });
  console.log(`Tagline occurrences: ${taglineCount}`);

  // Check liquid-glass elements
  const liquidGlassCount = await page.evaluate(() => {
    return document.querySelectorAll(".liquid-glass").length;
  });
  console.log(`.liquid-glass elements: ${liquidGlassCount}`);

  await browser.close();

  console.log(`\n=== DUPLICATE CHECK ===`);
  console.log(`Nav count OK (should be 1): ${navCount === 1 ? '✅' : '❌ FAIL'}`);
  console.log(`Brand count OK (should be 1): ${brandCount === 1 ? '✅' : '❌ FAIL'}`);
  console.log(`Tagline count OK (should be 1): ${taglineCount === 1 ? '✅' : '❌ FAIL'}`);
}

run().catch(console.error);
