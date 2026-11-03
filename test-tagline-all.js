const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);

  // Find all elements containing the tagline text
  const taglineElements = await page.evaluate(() => {
    const allElements = Array.from(document.querySelectorAll('*'));
    const results = [];
    for (const el of allElements) {
      if (el.textContent?.includes('MANUFACTURED IN DUBAI')) {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        results.push({
          tag: el.tagName,
          class: el.className,
          text: el.textContent.trim(),
          y: rect.y,
          x: rect.x,
          width: rect.width,
          height: rect.height,
          visible: rect.width > 0 && rect.height > 0 && style.opacity !== '0' && style.display !== 'none',
          inNav: el.closest('nav') !== null,
          parentTag: el.parentElement?.tagName,
          parentClass: el.parentElement?.className,
        });
      }
    }
    return results;
  });
  console.log("Tagline elements:", JSON.stringify(taglineElements, null, 2));

  await browser.close();
}

run().catch(console.error);
