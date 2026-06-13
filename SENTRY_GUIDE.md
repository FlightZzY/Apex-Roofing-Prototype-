# Sentry Setup Guide

Short checklist for adding Sentry to **Apex Roofing** (Next.js 16 on Vercel).

## What you get

- Production error reporting (client + server)
- Stack traces with source maps
- Alerts when new issues appear
- User feedback on errors (optional widget)

## 1. Create the Sentry account

1. Go to [sentry.io/signup](https://sentry.io/signup/)
2. Create an org (e.g. `apex-roofing`)
3. Choose the **Developer** plan to start (free tier is enough for setup)

## 2. Create the project

1. **Create Project** → platform: **Next.js**
2. Name it `apex-roofing-prototype` (or match the repo name)
3. Copy the **DSN** — you need it for env vars

## 3. Save credentials (do not commit)

Create `.env.local` in the repo root:

```env
NEXT_PUBLIC_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project-id>
SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project-id>
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=apex-roofing-prototype
SENTRY_AUTH_TOKEN=your-auth-token
```

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` | Project → Settings → Client Keys (DSN) |
| `SENTRY_ORG` | Org slug from the Sentry URL |
| `SENTRY_PROJECT` | Project slug |
| `SENTRY_AUTH_TOKEN` | User Settings → Auth Tokens (scopes: `project:releases`, `org:read`) |

Add the same vars in **Vercel** → Project → Settings → Environment Variables (Production + Preview).

## 4. Install Sentry in the app

From the repo root:

```bash
npx @sentry/wizard@latest -i nextjs
```

The wizard will:

- Install `@sentry/nextjs`
- Add `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`
- Wrap `next.config.mjs` with Sentry
- Create a test error route (remove after verifying)

Or install manually: [Sentry Next.js docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## 5. Verify it works

1. Deploy to Vercel (or run production build locally)
2. Trigger a test error (wizard route or temporary `throw new Error('Sentry test')`)
3. Confirm the event appears in Sentry → **Issues** within ~1 minute
4. Remove test errors/routes before merging

## 6. Turn on feedback loops

In Sentry project settings:

| Setting | Recommendation |
|---|---|
| **Alerts** | New issue → email or Slack |
| **Issue Owners** | Assign yourself / team on new errors |
| **Releases** | Enable if you tag Vercel deploys later |
| **User Feedback** | Enable widget in Sentry UI after SDK is live |

Suggested first alert: **“A new issue is created”** → notify immediately.

## 7. Security checklist

- [ ] `.env.local` is in `.gitignore` (already should be)
- [ ] DSN is public-safe (`NEXT_PUBLIC_`) — auth token is **secret**
- [ ] `SENTRY_AUTH_TOKEN` only in Vercel env, never in git
- [ ] Scrub PII in `beforeSend` if forms collect user data

## Next step in this repo

Track implementation in [#7 `[Chore] Set up Sentry error reporting`](https://github.com/FlightZzY/Apex-Roofing-Prototype-/issues/7)

After the account exists, the code integration (wizard + env vars + verify deploy) closes that issue.
