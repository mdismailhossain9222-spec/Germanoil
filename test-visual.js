const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check for the old Hero component being imported somewhere
  const heroImports = await page.evaluate(() => {
    // Look for any element with the old Hero's distinctive classes
    const oldHero = document.querySelector('#top');
    const newHero = document.querySelector('section.relative.min-h-screen.overflow-hidden.bg-richBlack');
    return {
      oldHeroExists: !!oldHero,
      newHeroExists: !!newHero,
    };
  });
  console.log("Hero components:", JSON.stringify(heroImports));

  // Get all text containing "GERMANOIL" and its context
  const brandContexts = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const results = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes('GERMANOIL')) {
        results.push({
          text: node.textContent.trim(),
          parent: node.parentElement?.tagName,
          grandparent: node.parentElement?.parentElement?.tagName,
        });
      }
    }
    return results;
  });
  console.log("\n=== GERMANOIL contexts ===");
  brandContexts.forEach(c => console.log(JSON.stringify(c)));

  await browser.close();
}

run().catch(console.error);
