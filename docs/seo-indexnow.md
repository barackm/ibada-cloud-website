# IndexNow Setup

IndexNow helps Bing and other participating engines discover URL updates faster.

## 1) Generate an IndexNow key

- Create a key using Bing Webmaster Tools or your preferred generator.
- Place a text file at the root of your domain:
  - Example URL: `https://www.ibadacloud.com/<your-key>.txt`
  - File content: `<your-key>`

## 2) Submit URLs with the script

```bash
INDEXNOW_KEY="<your-key>" \
INDEXNOW_KEY_LOCATION="https://www.ibadacloud.com/<your-key>.txt" \
pnpm seo:indexnow \
https://www.ibadacloud.com/en/platform \
https://www.ibadacloud.com/fr/platform
```

## 3) Operational cadence

- Submit all newly published SEO pages immediately after deploy.
- Re-submit updated money pages after significant content changes.
- Keep submissions batched by release to simplify verification.
