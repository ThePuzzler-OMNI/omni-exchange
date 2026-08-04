# OMNI Exchange

Public control surface for **fiat and crypto flow** under One Mission.

**Role:** Traces only — structure of ledgers, rules, and refused claims.  
**Not:** a trading venue, broker, bank, or investment product.

## Stack

- Static HTML + Tailwind CDN (Intek / Foundation family)
- Fonts: Cormorant Garamond + DM Sans
- Colors: ink / parchment / hive / leaf / mist
- Vercel (Framework: Other, no build)

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
| **Production** | https://omni-exchange-iota.vercel.app |
| **Git** | `ThePuzzler-OMNI/omni-exchange` `main` → Vercel auto-deploy |
| **Custom domain** | Not attached yet (e.g. omniexchange.org when steward owns DNS) |

### Custom domain later (steward DNS)

1. Vercel → `omni-exchange` → Settings → Domains → add apex + `www`
2. At registrar (e.g. GoDaddy):
   - A `@` → `76.76.21.21`
   - CNAME `www` → `cname.vercel-dns.com`
3. Update `sitemap.xml` / `robots.txt` / canonicals to the real domain after SSL is green

## Refused

See `refused.html`. No investment advice. No custody. No promised returns.
