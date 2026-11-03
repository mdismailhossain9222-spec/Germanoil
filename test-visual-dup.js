const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Get bounding boxes of all elements containing GERMANOIL
  const brandBoxes = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span'));
    const results = [];
    for (const span of spans) {
      if (span.textContent.includes('GERMANOIL')) {
        const rect = span.getBoundingClientRect();
        results.push({
          text: span.textContent.trim(),
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          visible: rect.width > 0 && rect.height > 0,
        });
      }
    }
    return results;
  });
  
  console.log("=== GERMANOIL element positions ===");
  brandBoxes.forEach(b => console.log(JSON.stringify(b)));
  
  // Check if any two elements overlap (visual duplication)
  const duplicates = brandBoxes.filter((b1, i) => {
    return brandBoxes.some((b2, j) => {
      if (i === j) return false;
      // Check if bounding boxes overlap significantly
      const overlapX = Math.max(0, Math.min(b1.x + b1.width, b2.x + b2.width) - Math.max(b1.x, b2.x));
      const overlapY = Math.max(0, Math.min(b1.y + b1.height, b2.y + b2.height) - Math.max(b1.y, b2.y));
      const overlap = overlapX * overlapY;
      return overlap > 100; // More than 100px² overlap
    });
  });
  
  console.log(`\nOverlapping (visually duplicated) elements: ${duplicates.length}`);
  
  // Take screenshot
  await page.screenshot({ path: "visual-check.png", fullPage: true });
  console.log("Screenshot saved: visual-check.png");

  await browser.close();
  
  if (duplicates.length === 0) {
    console.log("\n✅ NO VISUAL DUPLICATION DETECTED - The counting was misleading");
  } else {
    console.log("\n❌ VISUAL DUPLICATION CONFIRMED");
  }
}

run().catch(console.error);
