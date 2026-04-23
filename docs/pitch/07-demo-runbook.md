# Demo runbook — how to run the pitch in the room

This runbook assumes you are presenting to a senior Government audience (Minister, Permanent Secretary, Executive Director or equivalent) with 30–60 minutes, a projector, and ideally decent internet.

## Before the meeting

- Run `pnpm install` and `pnpm dev:frontend` on your laptop at least one hour before, verify the prototype loads on `http://localhost:3000`.
- Open a second browser tab with **at least three current Ugandan ministry websites** (e.g. https://www.health.go.ug, https://www.agriculture.go.ug, https://www.finance.go.ug). You will switch to these at a specific moment in the pitch for maximum impact.
- On your phone, open the prototype over mobile data and leave it ready. **The mobile view is the strongest part of the demo.**
- Print one double-sided A4 of `06-ask.md` as a leave-behind.

## Timing (30 minutes)

| Time | Section | What you show |
|---|---|---|
| 0–3 min | Problem (see `01-problem.md`) | Split screen with three current ministry sites. Scroll down each. Let the audience feel the inconsistency. |
| 3–6 min | Precedent (see `03-precedent.md`) | One slide with logos of gov.uk, canada.ca, gov.sg, mygov.scot, australia.gov.au. One sentence: "Uganda can do this too, using the same open-source tools." |
| 6–20 min | **The demo** (see below) | Spend most of your time here. |
| 20–25 min | Approach &amp; costs (`04-approach.md`, `05-costs.md`) | Phased table. The ask is small for Phase 0. |
| 25–30 min | The ask (`06-ask.md`) | Three specific things. Invite questions. |

## The demo flow (14 minutes)

The goal of the demo is to make the audience *feel* the difference. Do not narrate the technology — let the product speak.

### 1. Home page (2 min)
- Open `http://localhost:3000`.
- Say: "This is the single home of the Government of Uganda. One address, one voice."
- Scroll through once — services, programmes, ministries, news.
- Point out the yellow flag stripe, the coat-of-arms placeholder, the unified header.

### 2. A ministry page (3 min)
- Click through to **Ministry of Health**.
- Show the organisation page: mandate, news, guides, publications, contacts.
- Say: "Every ministry gets the same layout, with its own content. No more 25 different sites."
- Switch to a real ministry website in the other tab. Switch back. Let the contrast land.

### 3. A flagship programme (3 min)
- Open **Parish Development Model**.
- Show the structured "at a glance" sidebar, the seven pillars, the step-by-step eligibility and how-it-works.
- Say: "Today there is no canonical answer to 'how do I join PDM'. Here is what citizens deserve to see."

### 4. A service (2 min)
- Open **Register for a Tax Identification Number**.
- Show the "Start now" button that deep-links to URA's existing portal.
- Say: "URA keeps its existing investments. GOV.UG is not replacing transactional systems — it is making them findable."

### 5. Search (2 min)
- Go back to the homepage.
- Type "PDM" into the search box.
- Show the cross-government results spanning ministries, programmes and guides.
- Say: "This is the first time Ugandans can search across Government from a single place."

### 6. Mobile view (2 min)
- **This is the most powerful moment.** Pick up your phone.
- Load the prototype on mobile data.
- Hand the phone to the most senior person in the room.
- Let them swipe.
- Say: "Rural Uganda is on cheap Androids and 3G. This has to work there first. It does."

## If the internet fails

The prototype is a Next.js app running on your laptop. It does not require internet. If the projector or room wifi fails, you can still run the demo on your laptop screen locally. Keep the laptop charged.

## If someone asks "how much does it cost"

Open `05-costs.md`. Phase 0 = USD 200,000. The comparison point is that Uganda is already spending multiples of that across fragmented sites.

## If someone asks "why not WordPress"

Your answer: "Every ministry already runs WordPress. That is the problem we are solving. WordPress was designed for independent blogs, not for a federated government with 75 bodies, role-based editorial, accessibility at AA, and a shared content model."

## If someone asks "where does it host"

Point to `04-approach.md` Phase 5. Short answer: "We start on international cloud for speed, and migrate to NITA-U sovereign infrastructure once the platform is proven. The architecture is designed for that migration."
