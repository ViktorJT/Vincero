# Vincero

Websites for Vincero, built with Next.js and content from Hygraph.

| App                                    | Site                                                       | Status                                 |
| -------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| [`apps/fastigheter`](apps/fastigheter) | [vincerofastigheter.se](https://www.vincerofastigheter.se) | Live                                   |
| [`apps/invest`](apps/invest)           | Vincero Invest                                             | Not launched (needs a Hygraph project) |

Each app is thin: font, theme overrides, contact addresses and icon. Everything else is shared.

## Packages

- [`packages/site`](packages/site): routes, data fetching, styles and Next/Tailwind config shared by every app
- [`packages/ui`](packages/ui): React components
- [`packages/data`](packages/data): Hygraph GraphQL queries
- `packages/languages-config`: supported locales (`sv` default, `en`)
- `packages/tailwind-config`, `typescript-config`, `eslint-config`: shared tooling config

## Commands

```bash
pnpm install
pnpm dev:fastigheter    # http://localhost:3000
pnpm dev:invest         # http://localhost:3001
pnpm build:fastigheter
pnpm lint
pnpm typecheck
```

Each app needs a `.env` with `HYGRAPH_ENDPOINT`, `HYGRAPH_WEBHOOK_SECRET` and `RESEND_API_KEY`.

## Content updates

Pages are prerendered and refresh every 5 minutes. A Hygraph webhook on publish calls `/api/revalidate`, so changes usually show within seconds.
