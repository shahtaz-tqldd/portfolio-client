# Assumptions & honesty notes

Everything a reader might mistake for a measured fact is listed here.

## Illustrative (reasonable, but designed by me — not a deployment map)

- **Architecture diagrams** (Argon & Tourtoise): component granularity, edge routing and grouping are
  reconstructed from the tech stack and feature descriptions. They reflect design intent.
- **ER diagrams**: table/column shapes are consistent with the described features (tenants, RAG chunks,
  conversations, leads, appointments; trips, days, items, budgets). Real migrations may differ in names
  and detail.
- **Flow step-throughs**: step order is how the pipeline is designed to behave.
- **Charts** flagged `ILLUSTRATIVE`: shapes show the design change (e.g. top-k retrieval vs prompt
  stuffing) — they are not measured production numbers.
- **Code snippets** in Challenges: stylized before/after of the real fix approach, condensed for reading.

## Placeholders (waiting on real values)

- Anywhere you see `[METRIC: …]` — latency, token-reduction, duplicate-rate, acceptance-rate numbers.
- `[ADD: …]` — observability and CI/CD tool entries in tech stacks.
- All screenshots/videos are labelled placeholder frames until real media is dropped in.
- External links (`[GITHUB_URL]`, `[ARGON_LIVE_URL]`, …) and `/resume.pdf`.

## Factual

- Experience bullets, roles, dates, education, achievements (LeetCode 125+, CodeChef 1420+ 2-star)
  and listed core skills come from the supplied résumé content.
