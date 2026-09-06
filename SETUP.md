# Local Setup

## Prerequisites

- Node.js 20 LTS or newer
- A Neon PostgreSQL database
- A Cloudinary account (required only for profile-photo uploads)

## 1. Install packages

From the project folder:

```powershell
npm install
```

## 2. Create the environment file

Create a file named `.env` in the project root, beside `package.json`. Do not create it inside `backend`. Copy the format below and replace every value inside quotes. Keep the quotes, and do not commit this file.

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@YOUR-NEON-HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@YOUR-NEON-HOST/neondb?sslmode=require"

JWT_SECRET="paste-a-long-random-secret-at-least-32-characters"
JWT_EXPIRES_IN="7d"

FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLOUDINARY_FOLDER="family-expense-tracker"

SEED_ADMIN_PASSWORD="ChooseAStrongAdminPassword123!"
SEED_MEMBER_PASSWORD="ChooseAStrongMemberPassword123!"
```

`DATABASE_URL` and `DIRECT_URL` are the Neon connection strings from the Neon dashboard. Use the pooled connection string for `DATABASE_URL` and the direct connection string for `DIRECT_URL` when Neon provides both. `JWT_SECRET` must be a unique random secret, for example output from `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

Cloudinary values are in Cloudinary Dashboard > Settings > API Keys. `CLOUDINARY_FOLDER` is the Cloudinary Media Library folder in which user avatars are stored. The default is `family-expense-tracker`; use a subfolder such as `aangan-ledger/production` for a production environment.

## 3. Prepare the database

```powershell
npm run db:generate
npm run db:migrate
npm run db:seed
```

The seed creates Ravi as the first administrator and Ravindra, Riya, and Hrithik as members, with the responsibilities requested in the product brief. It uses the two `SEED_*_PASSWORD` values above.

## 4. Run the application

```powershell
npm run dev
```

Open `http://localhost:3000`. The frontend uses `http://localhost:4000/api` unless `NEXT_PUBLIC_API_URL` is set.

## First login

- Ravi: `ravi@family.local` (administrator)
- Ravindra: `ravindra@family.local`
- Riya: `riya@family.local`
- Hrithik: `hrithik@family.local`

Use the seeded password values, then change them from Profile after the first sign-in.
