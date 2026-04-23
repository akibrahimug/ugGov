# Costs — order-of-magnitude figures

All figures are planning estimates in USD. They are deliberately conservative and should be re-costed against live quotations before any procurement decision.

## Year-by-year envelope

| Line item                                    | Phase 1 (yr 1) | Phase 2 (yr 2) | Phase 3+ (yr 3+) |
|----------------------------------------------|---------------:|---------------:|------------------:|
| Hosting &amp; CDN (Vercel / Cloudflare / Postgres) |        $15,000 |        $45,000 |           $90,000 |
| Sanity CMS &amp; collaboration seats              |         $8,000 |        $20,000 |           $40,000 |
| Search (Meilisearch / Typesense)             |         $5,000 |        $10,000 |           $20,000 |
| Email &amp; SMS (SES + Africa's Talking)          |         $3,000 |        $10,000 |           $25,000 |
| Observability, error tracking, analytics     |         $4,000 |        $10,000 |           $20,000 |
| Domains, certs, procurement                  |         $5,000 |         $5,000 |           $10,000 |
| **Infrastructure subtotal**                  |    **$40,000** |   **$100,000** |     **$205,000**  |
| Core team (7 → 15 → 25 FTE)                  |       $250,000 |       $600,000 |        $1,100,000 |
| MDA editor training, change management       |        $30,000 |        $80,000 |         $120,000 |
| Independent security audit &amp; pen testing     |        $25,000 |        $35,000 |          $50,000 |
| Accessibility audit (annual)                 |        $15,000 |        $25,000 |          $50,000 |
| **Total annual run rate**                    |   **$360,000** |   **$840,000** |   **$1,525,000**  |
| One-off Phase 0 / capex                      |       $200,000 |              — |                — |

## What this buys — comparison points

- **GOV.UK** (United Kingdom): low single-digit £m/year for infrastructure serving &gt;1 billion page views. GOV.UG will serve 1–5% of that volume, so infrastructure costs in the tens-of-thousands are defensible.
- **Canada.ca**: approximately 120 FTE in the central platform team. At our scale, 15–25 FTE is comparable.
- **mygov.scot** (Scotland): launched by a team of ~20 in roughly 18 months.
- **Current fragmented spend**: conservatively estimated at $800k–$2M per year across all MDA web estates in Uganda today, with no central oversight. Consolidation begins to pay back by year 2.

## Where the money actually goes

**People, not hosting.** This is the single most important cost insight. On a modern CDN-backed platform, infrastructure for the scale of traffic Uganda will generate is inexpensive. The real cost is the team that builds the platform, trains MDAs, and maintains editorial quality — and that is a cost Uganda is already paying, just spread invisibly across 50+ vendors.

## Funding options

- **NITA-U / Ministry of ICT core budget** (Phase 0 should come from here).
- **World Bank Digital Uganda Acceleration** — strong fit with the programme's stated aims.
- **UNDP Governance programme** — possible co-funder.
- **FCDO / UK bilateral digital-government cooperation** — UK has a long track record of supporting gov.uk-style adaptations in the Commonwealth.
- **GIZ / EU** — digital governance is an active programming area for both.

Phase 0 is small enough to be funded internally. Phase 1 onwards benefits from co-funding both for cost reasons and for the international credibility it brings.
