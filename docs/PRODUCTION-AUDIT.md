# Production Audit

Audit completed on June 8, 2026.

## Automated checks

- `npm run audit`: passed for 14 HTML files and 68 referenced assets.
- `npm run build`: passed.
- JavaScript syntax checks: passed.
- `sitemap.xml` XML validation: passed.
- Git whitespace check: passed.
- Vercel preview build: passed.

## Routing and integrations

- All 13 canonical clean routes returned `200` in the Vercel preview.
- `.html` URLs, `/our-story/`, and `/blog/` redirected to canonical routes.
- Unknown routes returned the branded `404.html` page with a `404` response.
- Calendly, Instagram, X, YouTube, WhatsApp, both audio embeds, YouTube thumbnails, and the featured YouTube video returned successful responses.
- Formspree intentionally remains a placeholder and displays an email/WhatsApp fallback instead of a false success state.

## Lighthouse

Representative final audits:

| Page | Profile | Performance | Accessibility | Best Practices | SEO |
| --- | --- | ---: | ---: | ---: | ---: |
| Home | Mobile | 79 | 100 | 100 | 100 |
| Contact | Desktop | 96 | 100 | 100 | 100 |
| Portfolio | Desktop | 98 | 100 | 100 | 100 |

The homepage mobile score is primarily limited by the oversized typographic hero and its Largest Contentful Paint under Lighthouse throttling. It has zero blocking time, a 1.1-second First Contentful Paint, and perfect accessibility, best-practices, and SEO scores.

## Remaining owner verification

Marketing claims and pricing were retained as requested and were not independently verified. Copyright ownership and usage permission cannot be proven from repository contents; complete the rights review in `LAUNCH-CHECKLIST.md` before production launch.
