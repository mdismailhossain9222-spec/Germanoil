const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const taglinePosition = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      if (el.textContent?.includes('MANUFACTURED IN DUBAI')) {
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement;
        return {
          tag: el.tagName,
          class: el.className,
          text: el.textContent.trim(),
          y: rect.y,
          x: rect.x,
          width: rect.width,
          height: rect.height,
          parentClass: parent?.className,
          parentTag: parent?.tagName,
          inNav: el.closest('nav') !== null,
        };
      }
    }
    return null;
  });
  console.log(`Tagline Position:`, JSON.stringify(taglinePosition, null, 2));

  await page.screenshot({ path: "tagline-check.png", fullPage: true });
  console.log("Full page screenshot saved: tagline-check.png");

  await browser.close();
}

run().catch(console.error);
