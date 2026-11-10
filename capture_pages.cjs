const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const pages = [
    { url: 'http://localhost:5173/products', name: 'products' },
    { url: 'http://localhost:5173/contact', name: 'contact' },
    { url: 'http://localhost:5173/admin/login', name: 'admin_login' },
  ];

  for (const p of pages) {
    console.log(`Capturing ${p.name}...`);
    await page.goto(p.url, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: `/home/jeba-prakash/.gemini/antigravity/brain/9dbaf171-c517-408b-8b8b-24724fee5962/screenshot_${p.name}.png` });
  }

  await browser.close();
  console.log('Pages captured successfully!');
})();
