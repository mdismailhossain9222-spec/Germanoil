const { chromium } = require("@playwright/test");

async function run() {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  console.log("Navigating...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Monitor video loop for ~30 seconds (video is ~13s, should loop ~2 times)
  console.log("Monitoring video loop for 30 seconds...");
  let lastTime = 0;
  let loops = 0;
  
  for (let i = 0; i < 15; i++) {
    await page.waitForTimeout(2000);
    const state = await page.evaluate(() => {
      const video = document.querySelector("video");
      return video ? { time: video.currentTime, opacity: window.getComputedStyle(video).opacity } : null;
    });
    console.log(`  t=${(i+1)*2}s: time=${state?.time?.toFixed(2)}, opacity=${state?.opacity}`);
    
    if (state && state.time < lastTime) loops++;
    lastTime = state?.time || 0;
  }
  
  console.log(`Video loops detected: ${loops}`);
  
  await browser.close();
  console.log(`\n=== LOOP TEST ===`);
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log(`Video loops: ${loops}`);
  console.log(`SUCCESS: ${consoleErrors.length === 0 && loops >= 1}`);
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
