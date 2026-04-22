# borderless-kitchen

## Install

```bash
npm install
```

## Troubleshooting npm 403 errors

If `npm install` fails with `E403` (for example on `@types/node`), it is usually caused by a proxy or registry configuration issue instead of a broken dependency graph.

Run these commands locally to reset npm network settings and retry:

```bash
# 1) Remove proxy settings that can block npm
npm config delete proxy
npm config delete https-proxy

# 2) Ensure npm uses the public registry
npm config set registry https://registry.npmjs.org/

# 3) Clear cache and lockfile, then retry install
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

If you are on a managed corporate network, you may still need to configure your company-approved registry token or mirror before step 3.
