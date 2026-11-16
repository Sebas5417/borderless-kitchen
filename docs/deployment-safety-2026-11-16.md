# Deployment safety gate: reconcile production and main

Recorded 2026-11-16 (UTC). Applies to Borderless Kitchen only.

**Do not deploy `main` or merge the release branch blindly.** The live site was built from a separate release history. This is a documented release gate, not an automated branch protection rule. Recheck the facts below before the next production deployment.

## Verified source and evidence

- Repository: https://github.com/Sebas5417/borderless-kitchen
- Production domain: https://borderlesskitchenseries.com
- Vercel project: `borderless-kitchen-series`, team `facelesschannel0515-1196s-projects`.
- Live application commit: `a1d0270a412fcf94d385fb1c4b8fcc58f494d763` on `fix/2026-11-16-sitemap-canonical` (pushed and remote SHA verified).
- This commit is based on `d517ccb7ac8e70677c545d216af38f3e32f3115e`, the Nov 12 production source on `release/2026-11-10-integration-v1`.
- Current verified production deployment: https://vercel.com/facelesschannel0515-1196s-projects/borderless-kitchen-series/7gpp2kucAGB7z7AAGcXFs8KKZpcF
- Previous deployment, useful as rollback reference: `6zcEenV7niP4rENVVn7AnLSnn8DD`. Do not roll back without checking that it is still appropriate.
- GitHub `main` at inspection: `c78e5a50a72634941c35c93f38685ce6f7ad80df` (Nov 3).
- At the application fix commit, `origin/main...a1d0270` had **107 commits unique to main and 48 unique to the release**, and **239 files differed**. These are historical snapshot counts; documentation commits and later work change the totals.
- Main already has equivalent exclusions for the three affected sitemap URLs, but differs in many unrelated product pages, content, routes, signup behavior and assets. Replacing one tree with the other would lose work. A sitemap-only task is not authorization to reconcile the entire product.

## Sitemap invariants to preserve

Omit these noncanonical URLs from the sitemap, while preserving their existing page/redirect behavior:

- `/books/tokyo-meets-tuscany`: stays HTTP 200, canonical `/tokyo-meets-tuscany`.
- `/books/seoul-meets-mexico-city`: stays HTTP 200, canonical `/seoul-meets-mexico-city`.
- `/journal/the-salt-of-two-seas`: stays HTTP 308 to `/journal/brodo-stock-and-dashi-three-ways-to-build-a-base`.

The three canonical destinations must appear once. On Nov 16 the sitemap returned HTTP 200 with **421 URLs**; an HTTP audit found all 421 returned 200, were self-canonical, and had no noindex tag. Count may legitimately change with reviewed content additions; do not hardcode 421 as a permanent business rule.

## Required next-deployment checklist

1. Fetch remote refs and inspect clean/dirty worktrees without overwriting pending work. Confirm Vercel's current production deployment and its actual source; a branch name alone is not proof.
2. Compare the candidate against both current production and current main: commit ancestry, file diff, routes/redirects, content/assets, purchase destinations, canonical/noindex metadata and signup behavior. Recalculate divergence, rather than relying on the snapshot above.
3. For an urgent narrow fix, branch from the verified current production application source and apply only that fix. Preserve other branches. Do not deploy stale main, force-push, use an ours/theirs blanket merge, or replace an entire tree to make history appear aligned.
4. For full reconciliation, build an isolated integration candidate. Review differences deliberately and retain approved changes from both histories. Resolve conflicting product decisions explicitly. Obtain any additional approval needed for changes beyond the requested task. Do not merge the current release branch to main as a shortcut.
5. Run the locked-dependency production build and type/lint checks. Inspect warnings. Compare route and sitemap inventories with production and test canonical metadata, redirects, important purchase links and signup paths without sending real test subscriptions.
6. Deploy a preview and check the candidate before changing production. Verify the production target/project and current environment configuration. Do not copy secrets into source control.
7. Deploy only the tested candidate when authorized. Verify Vercel READY status and domain alias, then recheck public HTTP responses, canonical/noindex metadata and sitemap exclusions. Check important existing routes and assets for regressions.
8. Push the exact application source and record its commit and deployment URL. Update this note when histories are reconciled and make the release guidance discoverable in the authoritative branch's README. Until then, retain this release gate in the release README.

## Search Console interpretation

Reports read Nov 16 were last updated Nov 12; the HTTPS property's sitemap was last read Nov 13 and still showed 424 URLs. Indexing reports lag deployments. Do not claim they cleared merely because the site was fixed.

Domain property: 8 reported 404s and 19 redirects. HTTPS property: 8 reported 404s and 16 redirects. Existing consolidation and HTTP/www redirects are intentional.

Two historical journal 404 examples now correctly redirect, including `/journal/no-cream-carbonara-why-italians-are-right` to `/journal/pasta-water-starch-emulsion-and-mantecatura`. Six culture URLs (`fruit-puree`, `sugar`, `agar-agar`, `gelatin-powder`, `buttermilk`, `yogurt`) remain genuine 404s; no current source links/content were found. Do not invent irrelevant redirects just to clear the report.

No Search Console permissions/settings were changed and no validation or sitemap resubmission was performed for this repair.

## Unrelated funnel preview guard (2026-11-16)

Vercel project tmt-funnel uses free-site from main. This release history lacks that application, so a configuration-only free-site/vercel.json disables its automatic Git deployments here. The main application and funnel production settings are unchanged. During history reconciliation, retain main's real free-site application and remove the placeholder disable flag before legitimate funnel builds. Never deploy the placeholder directory manually.

