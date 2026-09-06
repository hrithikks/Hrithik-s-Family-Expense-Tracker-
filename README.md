# Aangan Ledger

A private, multi-user family expense tracker built as a TypeScript monorepo. It stores people, responsibilities, assignments, expenses, and audit records in PostgreSQL; all expense/report visibility is derived from the authenticated user and their role.

## Stack

- `frontend`: Next.js, TypeScript, Tailwind CSS, Recharts
- `backend`: Express, TypeScript, Prisma, PostgreSQL/Neon
- Auth: bcrypt password hashes with HTTP-only JWT session cookies
- Storage: Cloudinary for profile images
- Exports: ExcelJS and PDFKit

## Setup

1. Copy `.env.example` to `.env` and set a Neon/PostgreSQL `DATABASE_URL`, `DIRECT_URL`, and a long `JWT_SECRET`.
2. Install packages: `npm install`
3. Generate Prisma client: `npm run db:generate`
4. Apply migrations: `npm run db:migrate`
5. Seed initial users and responsibilities: `npm run db:seed`
6. Start both applications: `npm run dev`

The web app runs at `http://localhost:3000`; the API runs at `http://localhost:4000`.

For development, seed logins use `ravi@family.local`, `ravindra@family.local`, `riya@family.local`, and `hrithik@family.local`. Passwords come from `SEED_ADMIN_PASSWORD` and `SEED_MEMBER_PASSWORD` (the example defaults are for local use only). Ravi is the initial administrator.

See [SETUP.md](SETUP.md) for the exact `.env` format and local database instructions, and [DEPLOY.md](DEPLOY.md) for the Vercel + Render production deployment process.

## Architecture and permissions

`User`, `Role`, `Responsibility`, `UserResponsibility`, `ResponsibilitySubItem`, `Expense`, and `AuditLog` are normalized Prisma models. Responsibilities and assignments are database metadata, never frontend constants. The API verifies a member’s `UserResponsibility` record on every expense create/update and scopes member list/dashboard/report queries to the session user. Admin operations are protected by backend role middleware.

Primary APIs are under `/api/auth`, `/api/users`, `/api/responsibilities`, `/api/expenses`, `/api/dashboard`, `/api/reports`, `/api/profile`, and `/api/audit-logs`. The reports exporter uses the same filter and authorization query as the on-screen report.

## Cloudinary

Set all three Cloudinary variables plus `CLOUDINARY_FOLDER` to enable `POST /api/profile/avatar`; uploads are restricted to JPG, PNG, and WebP, capped at 4 MB, stored in the configured folder, and the resulting secure URL is persisted on the user.

## Production

Set `NODE_ENV=production`, serve the backend behind HTTPS, use secure cookie transport, and set `FRONTEND_URL` to the deployed web origin. Run `npm run build` before deployment.
