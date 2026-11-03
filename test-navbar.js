const { chromium } = require("@playwright/test");

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Get navbar structure
  const navbarInfo = await page.evaluate(() => {
    const nav = document.querySelector('section.min-h-screen nav');
    if (!nav) return { error: "Navbar not found" };
    
    const liquidGlass = nav.querySelector('.liquid-glass');
    const children = Array.from(liquidGlass?.children || []);
    
    return {
      navClass: nav.className,
      liquidGlassClass: liquidGlass?.className,
      childCount: children.length,
      children: children.map(c => ({
        tag: c.tagName,
        class: c.className,
        text: c.textContent?.trim().substring(0, 50),
        display: getComputedStyle(c).display,
        flex: getComputedStyle(c).flex,
      })),
      liquidGlassStyles: liquidGlass ? {
        display: getComputedStyle(liquidGlass).display,
        alignItems: getComputedStyle(liquidGlass).alignItems,
        justifyContent: getComputedStyle(liquidGlass).justifyContent,
        flexDirection: getComputedStyle(liquidGlass).flexDirection,
      } : null,
    };
  });
  console.log("=== Navbar Structure ===");
  console.log(JSON.stringify(navbarInfo, null, 2));

  // Check for tagline in navbar
  const taglineInNavbar = await page.evaluate(() => {
    const nav = document.querySelector('section.min-h-screen nav');
    if (!nav) return false;
    return nav.textContent.includes('MANUFACTURED');
  });
  console.log(`\nTagline in Navbar: ${taglineInNavbar ? 'YES (BAD)' : 'NO (GOOD)'}`);

  // Check tagline position (should be in hero content, not nav)
  const taglinePosition = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      if (el.textContent?.includes('MANUFACTURED IN DUBAI')) {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          class: el.className,
          y: rect.y,
          x: rect.x,
          inNav: el.closest('nav') !== null,
        };
      }
    }
    return null;
  });
  console.log(`\nTagline Position:`, JSON.stringify(taglinePosition, null, 2));

  // Verify navbar items alignment
  const alignment = await page.evaluate(() => {
    const liquidGlass = document.querySelector('section.min-h-screen .liquid-glass');
    if (!liquidGlass) return null;
    const style = getComputedStyle(liquidGlass);
    const logo = liquidGlass.querySelector('a[aria-label="GermanOil home"]');
    const links = liquidGlass.querySelector('ul');
    const enquire = liquidGlass.querySelector('a[href="#contact"]');
    
    return {
      logoY: logo ? logo.getBoundingClientRect().y : null,
      linksY: links ? links.getBoundingClientRect().y : null,
      enquireY: enquire ? enquire.getBoundingClientRect().y : null,
      allSameY: (logo && links && enquire) ? 
        Math.abs(logo.getBoundingClientRect().y - links.getBoundingClientRect().y) < 5 &&
        Math.abs(links.getBoundingClientRect().y - enquire.getBoundingClientRect().y) < 5
        : false,
    };
  });
  console.log(`\nAlignment Check:`, JSON.stringify(alignment, null, 2));

  // Screenshot
  await page.screenshot({ path: "navbar-check.png", fullPage: false });
  console.log("\nScreenshot saved: navbar-check.png");

  await browser.close();
  
  const success = !taglineInNavbar && taglinePosition && !taglinePosition.inNav && alignment?.allSameY;
  console.log(`\n=== NAVBAR FIX ${success ? '✅ SUCCESS' : '❌ NEEDS WORK'} ===`);
}

run().catch(console.error);
