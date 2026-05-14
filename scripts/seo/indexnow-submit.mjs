#!/usr/bin/env node

/**
 * Submit URLs to IndexNow (Bing/Yandex).
 *
 * Usage:
 * INDEXNOW_KEY=your-key INDEXNOW_KEY_LOCATION=https://www.ibadacloud.com/your-key.txt node scripts/seo/indexnow-submit.mjs https://www.ibadacloud.com/en/platform https://www.ibadacloud.com/fr/platform
 */

const urls = process.argv.slice(2).filter((value) => value.startsWith("http"));

if (urls.length === 0) {
  console.error("No URLs provided. Pass absolute URLs as arguments.");
  process.exit(1);
}

const key = process.env.INDEXNOW_KEY;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION;

if (!key || !keyLocation) {
  console.error("Missing INDEXNOW_KEY or INDEXNOW_KEY_LOCATION environment variables.");
  process.exit(1);
}

const host = new URL(urls[0]).host;

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

const endpoint = "https://api.indexnow.org/indexnow";

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const body = await response.text();
  console.error(`IndexNow failed with status ${response.status}: ${body}`);
  process.exit(1);
}

console.log(`Submitted ${urls.length} URL(s) to IndexNow.`);
