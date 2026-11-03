const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Take a screenshot for visual inspection
  await page.screenshot({ path: "duplication-check.png", fullPage: true });
  console.log("Screenshot saved: duplication-check.png");

  // Check specifically for the HeroSection navbar vs SiteHeader
  const heroNav = await page.evaluate(() => {
    const section = document.querySelector('section.min-h-screen');
    if (!section) return null;
    const nav = section.querySelector('nav');
    return nav ? {
      found: true,
      text: nav.textContent?.substring(0, 50),
      hasLiquidGlass: nav.querySelector('.liquid-glass') !== null
    } : null;
  });
  console.log("HeroSection nav:", JSON.stringify(heroNav));

  // Check for SiteHeader in the DOM (should not exist now)
  const siteHeader = await page.evaluate(() => {
    const header = document.querySelector('header');
    const siteHeaderComponent = document.querySelector('[data-site-header]');
    return {
      headerExists: !!header,
      headerText: header?.textContent?.substring(0, 50),
      dataAttrExists: !!siteHeaderComponent
    };
  });
  console.log("SiteHeader check:", JSON.stringify(siteHeader));

  // Count GERMANOIL occurrences more carefully
  const brandOccurrences = await page.evaluate(() => {
    const allText = document.body.innerText;
    const matches = allText.match(/GERMANOIL/g);
    return matches ? matches.length : 0;
  });
  console.log(`Total GERMANOIL occurrences in body text: ${brandOccurrences}`);

  await browser.close();
}

run().catch(console.error);
