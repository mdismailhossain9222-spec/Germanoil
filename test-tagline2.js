const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const allText = await page.evaluate(() => document.body.innerText);
  const lines = allText.split('\n').map(l => l.trim());
  
  // Find lines containing "Manufactured" or "Dubai"
  const matches = lines.filter(l => 
    l.toLowerCase().includes('manufactured') || 
    l.toLowerCase().includes('dubai')
  );
  
  console.log("=== Matching lines ===");
  matches.forEach(m => console.log(`  "${m}"`));
  
  // Check all elements with "Manufactured" text
  const elements = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const results = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.toLowerCase().includes('manufactured')) {
        results.push({
          text: node.textContent.trim(),
          parent: node.parentElement?.tagName,
          parentClass: node.parentElement?.className,
        });
      }
    }
    return results;
  });
  console.log("\n=== Text nodes with 'Manufactured' ===");
  elements.forEach(e => console.log(JSON.stringify(e)));

  await browser.close();
}

run().catch(console.error);
