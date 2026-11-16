# No funnel application in this release history

This directory is a configuration-only placeholder, not a deployable site.

Vercel project `tmt-funnel` is connected to the same repository and uses
`free-site` as its root. Its real application lives in the separate `main`
history. This Borderless Kitchen release history does not contain that app.

`vercel.json` disables automatic Git deployments only for projects using this
root in this history. It prevents unrelated release/documentation pushes from
producing missing-root preview failures. It does not disable the main site's
root-level deployment or modify the funnel project's production settings.

When reconciling histories, preserve main's real `free-site` application and
remove this placeholder-only disable flag before enabling legitimate funnel
builds in the reconciled branch. Do not merge this placeholder over the real
funnel. Do not manually deploy this directory.

Recorded 2026-11-16. See ../docs/deployment-safety-2026-11-16.md.
