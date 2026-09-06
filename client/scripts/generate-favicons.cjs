const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Exact NexKind Non-Profit Navbar Icon Mark
// 1. Blue supportive humanitarian hands / cradle (#2563eb -> #1e3a8a)
// 2. Emerald open book / wings of learning (#10b981 -> #047857)
// 3. Inner white heart connector (fill-opacity="0.9")
// 4. Radiant gold star of hope & enlightenment (#fbbf24 -> #d97706) with center point
// Wrapped in a crisp rounded white squircle badge so it pops vibrantly on BOTH dark and light browser tabs
const svgWithBadge = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="np-blue-tab" x1="16" y1="42" x2="84" y2="88" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>

    <linearGradient id="np-emerald-tab" x1="28" y1="28" x2="72" y2="76" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>

    <linearGradient id="np-gold-tab" x1="42" y1="6" x2="58" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <filter id="np-glow-tab" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Clean crisp rounded background badge for maximum contrast & beauty on any tab theme -->
  <rect x="3" y="3" width="94" height="94" rx="22" fill="#ffffff" filter="url(#card-shadow)" />
  <rect x="3" y="3" width="94" height="94" rx="22" fill="none" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Navbar Icon Mark Centered -->
  <g transform="translate(7, 7) scale(0.86)">
    <!-- 1. Supportive Humanitarian Hands -->
    <path
      d="M50 88C36 88 22 79 16 66C13 60 14 53 19 48C21 46 25 46 27 49C29 52 28 56 26 59C30 68 40 75 50 76V88Z"
      fill="url(#np-blue-tab)"
    />
    <path
      d="M50 88C64 88 78 79 84 66C87 60 86 53 81 48C79 46 75 46 73 49C71 52 72 56 74 59C70 68 60 75 50 76V88Z"
      fill="url(#np-blue-tab)"
    />

    <!-- 2. Open Book of Knowledge / Wings of Opportunity -->
    <path
      d="M50 72C42 66 32 58 25 44C22 38 23 31 28 27C31 24 35 25 38 28C43 33 47 43 50 54V72Z"
      fill="url(#np-emerald-tab)"
    />
    <path
      d="M50 72C58 66 68 58 75 44C78 38 77 31 72 27C69 24 65 25 62 28C57 33 53 43 50 54V72Z"
      fill="url(#np-emerald-tab)"
    />

    <!-- Inner Heart Silhouette / Center Stem -->
    <path
      d="M50 74C47 68 44 58 44 48C44 42 47 38 50 38C53 38 56 42 56 48C56 58 53 68 50 74Z"
      fill="#ffffff"
      fill-opacity="0.9"
    />

    <!-- 3. Radiant Star of Hope -->
    <path
      d="M50 8L52.8 17.5L62 18.5L55 24.2L57.2 33.5L50 28.5L42.8 33.5L45 24.2L38 18.5L47.2 17.5Z"
      fill="url(#np-gold-tab)"
      filter="url(#np-glow-tab)"
    />
    <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
  </g>
</svg>`;

// Standalone transparent version
const svgStandalone = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="np-blue-icon" x1="16" y1="42" x2="84" y2="88" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>

    <linearGradient id="np-emerald-icon" x1="28" y1="28" x2="72" y2="76" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>

    <linearGradient id="np-gold-icon" x1="42" y1="6" x2="58" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <filter id="np-glow-icon" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <path
    d="M50 88C36 88 22 79 16 66C13 60 14 53 19 48C21 46 25 46 27 49C29 52 28 56 26 59C30 68 40 75 50 76V88Z"
    fill="url(#np-blue-icon)"
  />
  <path
    d="M50 88C64 88 78 79 84 66C87 60 86 53 81 48C79 46 75 46 73 49C71 52 72 56 74 59C70 68 60 75 50 76V88Z"
    fill="url(#np-blue-icon)"
  />

  <path
    d="M50 72C42 66 32 58 25 44C22 38 23 31 28 27C31 24 35 25 38 28C43 33 47 43 50 54V72Z"
    fill="url(#np-emerald-icon)"
  />
  <path
    d="M50 72C58 66 68 58 75 44C78 38 77 31 72 27C69 24 65 25 62 28C57 33 53 43 50 54V72Z"
    fill="url(#np-emerald-icon)"
  />

  <path
    d="M50 74C47 68 44 58 44 48C44 42 47 38 50 38C53 38 56 42 56 48C56 58 53 68 50 74Z"
    fill="#ffffff"
    fill-opacity="0.9"
  />

  <path
    d="M50 8L52.8 17.5L62 18.5L55 24.2L57.2 33.5L50 28.5L42.8 33.5L45 24.2L38 18.5L47.2 17.5Z"
    fill="url(#np-gold-icon)"
    filter="url(#np-glow-icon)"
  />
  <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
</svg>`;

// Function to create a standard ICO buffer from multiple PNG buffers
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  const dataList = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset

    entries.push(entry);
    dataList.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...dataList]);
}

async function run() {
  const publicDir = path.resolve(__dirname, '../public');
  const brandingDir = path.resolve(__dirname, '../src/assets/branding');

  // 1. Write favicon.svg and branding icon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgWithBadge, 'utf8');
  fs.writeFileSync(path.join(brandingDir, 'icon.svg'), svgStandalone, 'utf8');
  console.log('✓ Written public/favicon.svg and src/assets/branding/icon.svg');

  const svgBuffer = Buffer.from(svgWithBadge);

  // 2. Generate PNGs: 512, 192, 180, 64, 48, 32, 16
  const p512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  const p180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const p48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const p32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const p16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon.png'), p512);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16);
  console.log('✓ Generated favicon.png, apple-touch-icon.png, favicon-32x32.png, favicon-16x16.png');

  // 3. Generate favicon.ico containing 16x16, 32x32, and 48x48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Generated multi-resolution public/favicon.ico (16, 32, 48px)');
}

run().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
