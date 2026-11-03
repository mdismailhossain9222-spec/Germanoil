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
  await page.waitForTimeout(3000);

  const videoState = await page.evaluate(() => {
    const video = document.querySelector("video");
    if (!video) return null;
    return {
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState,
      paused: video.paused,
      opacity: window.getComputedStyle(video).opacity,
      src: video.querySelector("source")?.src,
    };
  });
  console.log("Video state:", JSON.stringify(videoState, null, 2));

  await page.screenshot({ path: "hero-screenshot-debug.png", fullPage: false });
  await browser.close();
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
