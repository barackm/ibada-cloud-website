# Weekly SEO Operations Spec

This workflow tracks each EN/FR SEO page through one of four states:

- `planned`: page brief approved, keyword intent and internal links defined
- `published`: page deployed in production and included in sitemap
- `indexed`: page confirmed in Google Search Console and Bing Webmaster Tools
- `rank-tracked`: primary keyword set attached to weekly ranking dashboard

## Weekly operating checklist

1. Content publish review
- Publish 2-4 pages per week across EN/FR.
- Validate title, meta description, canonical, hreflang, and schema.

2. Indexing review
- Inspect newly published URLs in Search Console URL Inspection.
- Inspect newly published URLs in Bing Webmaster URL Inspection.
- Trigger re-crawl only for strategic pages with material changes.

3. Query and CTR review
- Review query-page-country-device data in Search Console.
- Flag high-impression pages with low CTR for metadata iteration.

4. Technical quality review
- Check sitemap freshness and robots accessibility.
- Validate structured data errors/warnings and resolve critical issues.
- Monitor Core Web Vitals trends for EN/FR landing pages.

5. Link acquisition review
- Track referring domains earned during the week.
- Prioritize links to money pages and cluster hubs.

## Acceptance targets (90-day)

- 60%+ of priority non-brand terms in top 10
- 20%+ of highest-intent terms in top 3
- 2.5x organic impressions
- 2x qualified demo starts from organic
