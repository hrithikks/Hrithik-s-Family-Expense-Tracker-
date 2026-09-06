# Deployment: Vercel + Render

Deploy the Next.js frontend to Vercel and the Express API to Render. Both services must use HTTPS in production because the authentication cookie is marked secure.

## 1. Neon and Cloudinary

Create the Neon database and Cloudinary account before creating either deployment. Keep the production credentials ready. In Cloudinary, create a media folder such as `aangan-ledger/production`; it will be created automatically on first upload if it does not already exist.

## 2. Deploy the API to Render

1. Push this repository to GitHub.
2. In Render, create a **Web Service** from that repository.
3. Set **Root Directory** to `backend`.
4. Set Build Command to `npm install && npm run prisma:generate && npm run build`.
5. Set Start Command to `npx prisma migrate deploy && npm run start`.
6. Choose Node 20+ and add the environment variables below.

```dotenv
NODE_ENV="production"
DATABASE_URL="your Neon pooled connection string"
DIRECT_URL="your Neon direct connection string"
JWT_SECRET="a unique long random production secret"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="https://your-vercel-app.vercel.app"
BACKEND_URL="https://your-render-service.onrender.com"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLOUDINARY_FOLDER="aangan-ledger/production"
```

After the first deploy, run the seed from a trusted shell only if the production database is empty: `npm run db:seed`. Do not run it as the regular Render start command.

## 3. Deploy the frontend to Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Next.js.
4. Add the following environment variable for Production, Preview, and Development as appropriate:

```dotenv
NEXT_PUBLIC_API_URL="https://your-render-service.onrender.com/api"
```

5. Deploy. Copy the Vercel URL and set it exactly as `FRONTEND_URL` on Render, then redeploy Render.

## Production checks

- Visit `https://your-render-service.onrender.com/health` and confirm `{ "ok": true }`.
- Log in through the Vercel URL, create an expense, and export one Excel and one PDF report.
- Upload a profile image and confirm it appears beneath the configured Cloudinary folder.
- Verify a member cannot access an admin URL or submit an unassigned responsibility ID.

Never place `DATABASE_URL`, `JWT_SECRET`, or any Cloudinary secret in Vercel. Only `NEXT_PUBLIC_API_URL` belongs in the frontend deployment.
