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
  
  page.on("requestfailed", (req) => {
    console.log(`REQUEST FAILED: ${req.url()} - ${req.failure()?.errorText}`);
  });

  page.on("response", (res) => {
    if (res.status() >= 400) {
      console.log(`RESPONSE ${res.status()}: ${res.url()}`);
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const videoState = await page.evaluate(() => {
    const video = document.querySelector("video");
    if (!video) return null;
    return {
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState,
      paused: video.paused,
      opacity: window.getComputedStyle(video).opacity,
    };
  });
  console.log("Video state:", JSON.stringify(videoState, null, 2));

  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section[id]')).map(s => s.id);
  });
  console.log("Sections found:", sections);

  const liquidGlassCount = await page.evaluate(() => {
    return document.querySelectorAll(".liquid-glass").length;
  });
  console.log(".liquid-glass elements:", liquidGlassCount);

  // Test responsiveness
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  const mobileVideoOpacity = await page.evaluate(() => {
    const video = document.querySelector("video");
    return video ? window.getComputedStyle(video).opacity : null;
  });
  console.log("Mobile video opacity:", mobileVideoOpacity);

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForTimeout(500);

  await page.screenshot({ path: "full-page-screenshot.png", fullPage: true });
  console.log("Full page screenshot saved.");

  await browser.close();
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) consoleErrors.forEach(e => console.log(`  - ${e}`));
  console.log(`Sections: ${sections.join(", ")}`);
  console.log(`.liquid-glass elements: ${liquidGlassCount}`);
  console.log(`Video opacity (desktop): ${videoState?.opacity}`);
  console.log(`Video opacity (mobile): ${mobileVideoOpacity}`);
  console.log(`All checks PASSED: ${consoleErrors.length === 0 && videoState?.opacity === "1" && sections.length >= 6}`);
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
