const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const taglineElement = await page.evaluate(() => {
    // Find element containing the tagline text
    const elements = Array.from(document.querySelectorAll('span'));
    for (const el of elements) {
      if (el.textContent?.includes('MANUFACTURED IN DUBAI')) {
        const rect = el.getBoundingClientRect();
        return {
          text: el.textContent.trim(),
          class: el.className,
          tag: el.tagName,
          y: rect.y,
          x: rect.x,
          inNav: el.closest('nav') !== null,
          parentClass: el.parentElement?.className,
        };
      }
    }
    return null;
  });
  console.log("Tagline element:", JSON.stringify(taglineElement, null, 2));

  await browser.close();
  
  if (taglineElement && !taglineElement.inNav) {
    console.log("\n✅ SUCCESS: Tagline is in hero content, not in navbar");
  } else if (taglineElement && taglineElement.inNav) {
    console.log("\n❌ FAIL: Tagline is still in navbar");
  } else {
    console.log("\n⚠️ Could not locate tagline element");
  }
}

run().catch(console.error);
