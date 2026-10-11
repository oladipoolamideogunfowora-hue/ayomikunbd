import fs from 'node:fs';
import path from 'node:path';

const clientDir = path.resolve(process.cwd(), 'dist', 'client');
const indexPath = path.join(clientDir, 'index.html');

console.log('[postbuild] Checking for dist/client/index.html...');

if (fs.existsSync(clientDir)) {
  if (fs.existsSync(indexPath)) {
    console.log('[postbuild] dist/client/index.html already exists from prerendering.');
  } else {
    console.log('[postbuild] index.html missing. Generating static entry from build assets...');
    const assetsDir = path.join(clientDir, 'assets');
    let cssTags = '';
    let jsTags = '';

    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      // CSS files first
      for (const file of files) {
        if (file.endsWith('.css')) {
          cssTags += `    <link rel="stylesheet" href="/assets/${file}" />\n`;
          console.log(`[postbuild] Added CSS: ${file}`);
        }
      }
      // JS entry points
      for (const file of files) {
        if (file.endsWith('.js') && (file.startsWith('index') || file.startsWith('routes') || file.startsWith('client'))) {
          jsTags += `    <script type="module" src="/assets/${file}"></script>\n`;
          console.log(`[postbuild] Added JS: ${file}`);
        }
      }
    }

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Happy Birthday, Ayomikun</title>
    <meta name="description" content="A little flip-through birthday card for Ayomikun — five photos, five messages, one very happy new year of life." />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;600;700;800&family=Ephesis&display=swap" />
${cssTags}  </head>
  <body>
    <div id="root"></div>
${jsTags}  </body>
</html>
`;

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('[postbuild] Successfully created dist/client/index.html!');
  }
} else {
  console.warn('[postbuild] Warning: dist/client directory not found.');
}
