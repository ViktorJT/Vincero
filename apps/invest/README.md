# Vincero Invest

Thin app: the font, theme overrides, contact addresses and icon live here. Everything else (routes, data fetching, styles) comes from [`@vincero/site`](../../packages/site).

- Content: the site's Hygraph project, via `HYGRAPH_ENDPOINT`
- Colors: the `Theme` entry in Hygraph
- Deploys: its own Vercel project (root directory `apps/invest`)

```bash
pnpm dev:invest
```
