const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Listen to any console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Desktop Viewport
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: '/home/jeba-prakash/Jeba/hydrelex/screenshot_desktop.png', fullPage: false });
  console.log('Saved screenshot_desktop.png (1920x1080)');

  // Capture full page desktop
  await page.screenshot({ path: '/home/jeba-prakash/Jeba/hydrelex/screenshot_desktop_full.png', fullPage: true });
  console.log('Saved screenshot_desktop_full.png');

  // Check horizontal overflow on desktop
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Desktop horizontal overflow:', desktopOverflow);

  // 2. Tablet Viewport
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/home/jeba-prakash/Jeba/hydrelex/screenshot_tablet.png', fullPage: false });
  console.log('Saved screenshot_tablet.png (768x1024)');

  const tabletOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Tablet horizontal overflow:', tabletOverflow);

  // 3. Mobile Viewport
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/home/jeba-prakash/Jeba/hydrelex/screenshot_mobile.png', fullPage: false });
  console.log('Saved screenshot_mobile.png (375x812)');

  const mobileOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow:', mobileOverflow);

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
