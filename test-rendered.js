const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(4000);

  // Get full page text
  const allText = await page.evaluate(() => document.body.innerText);
  
  // Look for specific phrases
  const phrases = [
    'MANUFACTURED IN DUBAI',
    'DISTRIBUTED ACROSS BANGLADESH',
    'Manufactured in Dubai',
    'GERMANOIL',
    'Precision Engineered',
    'Powering Bangladesh',
    'Our Story',
    'Products',
    'Quality',
    'Distribution',
    'Contact',
    'Enquire',
  ];
  
  console.log("=== Phrase search ===");
  phrases.forEach(p => {
    const found = allText.includes(p);
    console.log(`  "${p}": ${found ? 'FOUND' : 'NOT FOUND'}`);
  });
  
  // Check first 500 chars
  console.log("\n=== First 500 chars ===");
  console.log(allText.substring(0, 500));
  
  await browser.close();
}

run().catch(console.error);
