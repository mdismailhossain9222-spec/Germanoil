const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: "navbar-final.png", fullPage: false });
  console.log("Navbar screenshot saved: navbar-final.png");

  // Verify navbar structure one more time
  const navbar = await page.evaluate(() => {
    const nav = document.querySelector('section.min-h-screen nav');
    const liquidGlass = nav?.querySelector('.liquid-glass');
    if (!nav || !liquidGlass) return { error: "Not found" };
    
    return {
      childrenCount: liquidGlass.children.length,
      firstChild: liquidGlass.children[0]?.textContent?.trim(),
      secondChild: liquidGlass.children[1]?.textContent?.trim(),
      thirdChild: liquidGlass.children[2]?.textContent?.trim(),
      hasTaglineInNav: nav.textContent.includes('MANUFACTURED'),
    };
  });
  console.log("Navbar verification:", JSON.stringify(navbar, null, 2));

  await browser.close();
  
  const success = navbar.childrenCount === 3 && 
                  navbar.firstChild?.includes('GERMANOIL') &&
                  navbar.secondChild?.includes('Our Story') &&
                  navbar.thirdChild?.includes('Enquire') &&
                  !navbar.hasTaglineInNav;
  
  console.log(`\n=== NAVBAR FIX: ${success ? '✅ COMPLETE' : '❌ ISSUES REMAIN'} ===`);
}

run().catch(console.error);
