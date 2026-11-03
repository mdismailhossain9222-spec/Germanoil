const sharp = require('sharp');
const fs = require('fs');

const products = [
  { name: 'product-hydraulic.png', text: 'Hydraulic Oil' },
  { name: 'product-4t.png', text: '4T Motorcycle Oil' },
  { name: 'product-6000.png', text: '6000 Petrol Oil' }
];

async function createImages() {
  for (const p of products) {
    const svg = Buffer.from(`
<svg width="600" height="450" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#141414"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="20" fill="#C9A85C">${p.text}</text>
</svg>
`);
    await sharp(svg)
      .png()
      .toFile(`public/images/${p.name}`);
    console.log('Created:', p.name);
  }
}
createImages().catch(console.error);
