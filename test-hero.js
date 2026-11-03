const { chromium } = require("@playwright/test");

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  console.log("Taking screenshot...");
  await page.screenshot({ path: "hero-screenshot.png", fullPage: false });

  const title = await page.title();
  console.log(`Page Title: ${title}`);

  const hasLiquidGlass = await page.evaluate(() => {
    return document.querySelector(".liquid-glass") !== null;
  });
  console.log(`Has .liquid-glass elements: ${hasLiquidGlass}`);

  const hasVideo = await page.evaluate(() => {
    const video = document.querySelector("video");
    if (!video) return false;
    const source = video.querySelector("source");
    return source && source.src && source.src.includes("cloudfront.net");
  });
  console.log(`Has CloudFront video background: ${hasVideo}`);

  const videoOpacity = await page.evaluate(() => {
    const video = document.querySelector("video");
    return video ? window.getComputedStyle(video).opacity : null;
  });
  console.log(`Video computed opacity: ${videoOpacity}`);

  console.log(`Console Errors Found: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("Playwright test complete.");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});