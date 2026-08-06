# OMNI Exchange

Public control surface for **fiat and crypto flow** under One Mission.

**Role:** Traces only — structure of ledgers, rules, and refused claims.  
**Not:** a trading venue, broker, bank, or investment product.

## Stack

- Static HTML + Tailwind CDN (optional; layout/chrome **not** Tailwind-only)
- Fonts: Cormorant Garamond + DM Sans
- Colors: ink / parchment / **hive** gold (hive family — not Foundation apple)
- Vercel (Framework: Other, no build)

## Network template kit (Q-NET-ADOPT-EX · 2026-08-05)

Aligned to `product/docs/NETWORK_TEMPLATE_KIT_v1_2026-08-05.md`:

| Rule | Exchange |
|------|----------|
| `--page-max: 56rem` | `css/page-layout.css` |
| Explicit chrome CSS | `js/site-chrome.js` inject |
| Desktop hamburger always on | yes |
| Sisters omit self | registry + runtime filter |
| Registry schema | `omni-public-web-registry/v1` + `kit` field |

Smoke after deploy: open https://omniexchange.org/ · desktop hamburger visible · mobile menu Escape closes · footer sisters = OM · Intek · IMI · Foundation (no Exchange self).

## Pages

| Path | Job |
|------|-----|
| `/` | Home — standing sentence, three doors |
| `/books` | Ledger books (fiat, crypto, ops, gifts) |
| `/rules` | How traces are written and closed |
| `/refused` | Permanent boundaries |
| `/network` | Sister sites |

## Deploy (live 2026-08-04)

| Item | Value |
|------|--------|
| **Team** | `intekspace` |
| **Project** | `omni-exchange` |
| **Production** | **https://omniexchange.org** |
| **www** | https://www.omniexchange.org |
| **Vercel alias** | https://omni-exchange-iota.vercel.app (still valid) |
| **Git** | `ThePuzzler-OMNI/omni-exchange` `main` → Vercel auto-deploy |
| **DNS** | GoDaddy live · A `@` → `76.76.21.21` · CNAME `www` → `cname.vercel-dns.com` |

## Refused

See `refused.html`. No investment advice. No custody. No promised returns.
