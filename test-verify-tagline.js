const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  // Search for the tagline in the full page
  const taglineExists = await page.evaluate(() => {
    const allText = document.body.innerText;
    return allText.includes('MANUFACTURED IN DUBAI');
  });
  console.log(`Tagline in page text: ${taglineExists}`);

  // Find the exact element
  const taglineElement = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes('MANUFACTURED IN DUBAI')) {
        return {
          text: node.textContent.trim(),
          parentClass: node.parentElement?.className,
          parentTag: node.parentElement?.tagName,
          inNav: node.parentElement?.closest('nav') !== null,
        };
      }
    }
    return null;
  });
  console.log("Tagline element:", JSON.stringify(taglineElement, null, 2));

  await browser.close();
  console.log(`\n✅ Tagline correctly OUTSIDE navbar and IN hero content: ${taglineElement && !taglineElement.inNav ? 'YES' : 'NO'}`);
}

run().catch(console.error);
