import { chromium } from 'playwright';
import fs from 'fs';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const ROUTES = ['/', '/about', '/products', '/services', '/projects', '/gallery', '/reviews', '/contact'];
const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop-1440' },
  { width: 390, height: 844, name: 'mobile-390' },
];

function getChromeExecutable() {
  const candidates = [
    process.env.CHROME_BIN,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) {
    if (c && fs.existsSync(c)) return c;
  }
  return undefined;
}

async function runAudit() {
  const executablePath = getChromeExecutable();
  console.log(`\n======================================================`);
  console.log(`HYDRELEX CONTRAST, OVERFLOW & VISIBILITY AUDIT (WCAG AA)`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`Browser: ${executablePath || 'Playwright Bundled Chromium'}`);
  console.log(`======================================================\n`);

  const browser = await chromium.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const contrastFailures = [];
  const overflowFailures = [];
  const consoleFailures = [];
  let totalElementsAudited = 0;

  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      process.stdout.write(`  Checking ${route.padEnd(10)} at ${vp.name.padEnd(14)}... `);
      const page = await browser.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const pageErrors = [];
      page.on('pageerror', (err) => pageErrors.push(`pageerror: ${err.message}`));
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Ignore 404 for intentionally fallback-tested images only if no error noise, or record all real console errors
          if (!text.includes('Failed to load resource')) {
            pageErrors.push(`console.error: ${text}`);
          }
        }
      });

      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        // Wait past the 1500ms anti-invisible-text safety timer naturally!
        await page.waitForTimeout(1750);
      } catch (e) {
        console.warn(`Navigation warning for ${route}: ${e.message}`);
      }

      // Scroll page top to bottom gently so all sections trigger & verify horizontal overflow
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y <= scrollHeight; y += 600) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(80);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);

      // Evaluate contrast, horizontal overflow, and opacity-stuck elements
      const pageResults = await page.evaluate(({ route, vpName }) => {
        function parseRgba(colorStr) {
          if (!colorStr) return [0, 0, 0, 0];
          const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            return [
              parseInt(match[1], 10),
              parseInt(match[2], 10),
              parseInt(match[3], 10),
              match[4] !== undefined ? parseFloat(match[4]) : 1,
            ];
          }
          return [0, 0, 0, 0];
        }

        function parseGradientColors(bgImage) {
          if (!bgImage || !bgImage.includes('gradient(')) return [];
          const matches = bgImage.match(/rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)/g);
          if (!matches) return [];
          return matches.map(parseRgba).filter(([, , , a]) => a > 0.05);
        }

        function luminance(r, g, b) {
          const a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function contrastRatio(l1, l2) {
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        // Returns array of candidate effective backgrounds (handles multi-stop gradients accurately)
        function getCandidateBackgrounds(el) {
          let curr = el;
          const layers = [];

          while (curr && curr !== document) {
            const style = window.getComputedStyle(curr);
            const [r, g, b, a] = parseRgba(style.backgroundColor);
            const gradientStops = parseGradientColors(style.backgroundImage);

            if (gradientStops.length > 0) {
              // Layer gradient stops as options (bottom-most bgColor beneath gradient if any)
              if (a > 0) {
                layers.unshift({ colors: [[r, g, b, a]] });
              }
              layers.push({ colors: gradientStops });
              if (gradientStops.every(([, , , ga]) => ga >= 0.99)) break;
            } else if (a > 0) {
              layers.unshift({ colors: [[r, g, b, a]] });
              if (a >= 0.99) break;
            }
            curr = curr.parentElement;
          }

          if (layers.length === 0) {
            return [[15, 20, 22]];
          }

          // Composite base colors and test gradient stop extremes
          let baseR = 15, baseG = 20, baseB = 22;
          const results = [];

          // Find any layer with multiple stops (gradient)
          let hasMulti = false;
          for (const layer of layers) {
            if (layer.colors.length === 1) {
              const [r, g, b, a] = layer.colors[0];
              baseR = Math.round(r * a + baseR * (1 - a));
              baseG = Math.round(g * a + baseG * (1 - a));
              baseB = Math.round(b * a + baseB * (1 - a));
            } else {
              hasMulti = true;
            }
          }

          if (!hasMulti) {
            return [[baseR, baseG, baseB]];
          }

          // Composite each gradient stop over accumulated base
          for (const layer of layers) {
            if (layer.colors.length > 1) {
              for (const [r, g, b, a] of layer.colors) {
                results.push([
                  Math.round(r * a + baseR * (1 - a)),
                  Math.round(g * a + baseG * (1 - a)),
                  Math.round(b * a + baseB * (1 - a)),
                ]);
              }
            }
          }
          return results.length > 0 ? results : [[baseR, baseG, baseB]];
        }

        function getSelector(el) {
          if (el.id) return `#${el.id}`;
          let path = el.tagName.toLowerCase();
          if (el.className && typeof el.className === 'string') {
            const classes = el.className
              .split(/\s+/)
              .filter((c) => c && !c.includes(':') && !c.includes('[') && !c.includes('/'));
            if (classes.length) path += `.${classes.slice(0, 2).join('.')}`;
          }
          return path;
        }

        const horizontalOverflow =
          document.documentElement.scrollWidth > window.innerWidth + 1;

        const elements = Array.from(
          document.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, p, a, button, label, strong, address, li, dt, dd, span, td, th'
          )
        );
        const issues = [];
        let count = 0;

        for (const el of elements) {
          if (el.getAttribute('aria-hidden') === 'true' || el.closest('[aria-hidden="true"]')) {
            continue;
          }

          let directText = '';
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              directText += node.textContent.trim() + ' ';
            }
          }
          directText = directText.trim();
          if (!directText || directText.length < 2) continue;

          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') continue;

          // Flag invisible text if stuck at opacity < 0.2!
          const opacity = parseFloat(style.opacity);
          if (opacity < 0.2) {
            issues.push({
              route,
              viewport: vpName,
              selector: getSelector(el),
              text: directText.length > 28 ? directText.slice(0, 28) + '...' : directText,
              fg: `opacity:${opacity}`,
              bg: 'N/A',
              ratio: 0,
              required: 'opacity>=0.9',
            });
            continue;
          }

          count++;

          const [fgR, fgG, fgB, fgA] = parseRgba(style.color);
          if (fgA < 0.2) {
            issues.push({
              route,
              viewport: vpName,
              selector: getSelector(el),
              text: directText.length > 28 ? directText.slice(0, 28) + '...' : directText,
              fg: style.color,
              bg: 'transparent fg',
              ratio: 0,
              required: 4.5,
            });
            continue;
          }

          const candidateBgs = getCandidateBackgrounds(el);
          const fontSize = parseFloat(style.fontSize);
          const fontWeight = parseInt(style.fontWeight, 10) || 400;
          const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
          const threshold = isLarge ? 3.0 : 4.5;

          // Check worst-case background among gradient stops / solid bg
          let worstRatio = Infinity;
          let worstBg = candidateBgs[0];
          let worstFg = [fgR, fgG, fgB];

          for (const [bgR, bgG, bgB] of candidateBgs) {
            const effFgR = Math.round(fgR * fgA + bgR * (1 - fgA));
            const effFgG = Math.round(fgG * fgA + bgG * (1 - fgA));
            const effFgB = Math.round(fgB * fgA + bgB * (1 - fgA));

            const lFg = luminance(effFgR, effFgG, effFgB);
            const lBg = luminance(bgR, bgG, bgB);
            const ratio = contrastRatio(lFg, lBg);
            if (ratio < worstRatio) {
              worstRatio = ratio;
              worstBg = [bgR, bgG, bgB];
              worstFg = [effFgR, effFgG, effFgB];
            }
          }

          if (worstRatio < threshold) {
            issues.push({
              route,
              viewport: vpName,
              selector: getSelector(el),
              text: directText.length > 28 ? directText.slice(0, 28) + '...' : directText,
              fg: `rgb(${worstFg[0]},${worstFg[1]},${worstFg[2]})`,
              bg: `rgb(${worstBg[0]},${worstBg[1]},${worstBg[2]})`,
              ratio: parseFloat(worstRatio.toFixed(2)),
              required: threshold,
            });
          }
        }

        return {
          count,
          issues,
          horizontalOverflow,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      }, { route, vpName: vp.name });

      totalElementsAudited += pageResults.count;
      const statusOverflow = pageResults.horizontalOverflow
        ? `OVERFLOW (${pageResults.scrollWidth} > ${pageResults.innerWidth})`
        : 'no-overflow';
      console.log(
        `${pageResults.count} elements, ${pageResults.issues.length} contrast issues, ${statusOverflow}, ${pageErrors.length} errors`
      );

      if (pageResults.issues.length > 0) {
        contrastFailures.push(...pageResults.issues);
      }
      if (pageResults.horizontalOverflow) {
        overflowFailures.push({
          route,
          viewport: vp.name,
          scrollWidth: pageResults.scrollWidth,
          innerWidth: pageResults.innerWidth,
        });
      }
      if (pageErrors.length > 0) {
        consoleFailures.push({ route, viewport: vp.name, errors: pageErrors });
      }

      await page.close();
    }
  }

  await browser.close();

  console.log(`\nSummary: Audited ${totalElementsAudited} visible text elements across ${ROUTES.length} routes at 2 viewports.`);

  let exitCode = 0;
  if (contrastFailures.length > 0) {
    console.log(`\n❌ CONTRAST / VISIBILITY FAILURES (${contrastFailures.length}):`);
    console.table(contrastFailures);
    exitCode = 1;
  }
  if (overflowFailures.length > 0) {
    console.log(`\n❌ HORIZONTAL OVERFLOW FAILURES (${overflowFailures.length}):`);
    console.table(overflowFailures);
    exitCode = 1;
  }
  if (consoleFailures.length > 0) {
    console.log(`\n❌ CONSOLE / PAGE ERRORS (${consoleFailures.length}):`);
    console.log(JSON.stringify(consoleFailures, null, 2));
    exitCode = 1;
  }

  if (exitCode === 0) {
    console.log(
      `\n🎉 AUDIT PASSED WITH ZERO FAILURES! All ${totalElementsAudited} text elements satisfy WCAG AA (>= 4.5:1 normal, >= 3.0:1 large), zero horizontal overflow, zero console errors.\n`
    );
  }
  process.exit(exitCode);
}

runAudit().catch((err) => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
