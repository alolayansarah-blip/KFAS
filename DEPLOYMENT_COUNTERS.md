# Counters API - Production Deployment

The StatsCounter and `/api/Counters` route work on your live website. Follow these steps:

## 1. Set Environment Variable

Add `PURE_API_KEY` in your deployment platform:

| Platform | Where to add |
|----------|--------------|
| **Vercel** | Project → Settings → Environment Variables |
| **Netlify** | Site → Build & deploy → Environment |
| **Railway** | Project → Variables |
| **DigitalOcean** | App → Settings → App-Level Environment Variables |

**Value:** `181b5f03-d95d-47be-9fe8-96342b42deab`

## 2. Deploy

After adding the env var, deploy or redeploy your app. The API will be available at:

```
https://your-domain.com/api/Counters
```

## 3. Verify

Visit `https://your-domain.com/api/Counters` in your browser. You should see JSON with real counts.

## Local Development

Create `.env.local` with:
```
PURE_API_KEY=181b5f03-d95d-47be-9fe8-96342b42deab
```

Or rely on the fallback in code (already set for dev).
