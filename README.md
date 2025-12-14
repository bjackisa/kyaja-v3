# Kyaja

Kyaja is a full-stack ecommerce web app built with **Next.js 14 (App Router)**, **TypeScript**, **Prisma**, and **Tailwind CSS**.

It includes:

- **Storefront**: categories/departments, product pages, search, cart, checkout
- **Auth**: NextAuth
- **Admin/Backoffice APIs**: CRUD routes under `app/api/*`
- **Uploads**: UploadThing
- **Promo system**: a rotating top promo bar with a dynamic **random product spotlight** (`/api/products/spotlight`)

## Tech stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Database/ORM**: Prisma (configured for MongoDB Atlas in production)
- **Auth**: NextAuth
- **Styling**: Tailwind CSS
- **UI**: Radix + shadcn/ui
- **State**: Redux Toolkit
- **Data fetching/caching**: TanStack React Query

## Key routes

- **Home**: `/`
- **Departments**: `/d/[slug]` (example: `/d/gift-hampers`)
- **Product detail**: `/p/[slug]`
- **Search**: `/search?q=...`

## Local development

### Prerequisites

- Node.js **18+**
- pnpm (recommended)
- MongoDB Atlas (or another Prisma-supported database configured in `prisma/schema.prisma`)

### Install

```bash
pnpm install
```

### Environment variables

Create a `.env.local` in the project root.

Minimum for most local flows:

```bash
# Prisma
DATABASE_URL="mongodb+srv://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

Optional / feature toggles:

```bash
# Temporary homepage redirect (used by middleware.ts)
# Example: HOME_REDIRECT_PATH=/d/gift-hampers
HOME_REDIRECT_PATH=""
```

Third-party services (enable as needed):

- UploadThing credentials
- Resend (email)

### Prisma

```bash
pnpm prisma generate
pnpm prisma db push
```

### Run

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

- `pnpm dev` - start dev server
- `pnpm build` - production build
- `pnpm start` - run production server
- `pnpm lint` - lint
- `pnpm prisma generate` - generate Prisma client
- `pnpm prisma db push` - sync schema to database

## API notes

- `GET /api/products/spotlight`
  - Returns a random active in-stock product with fields used by the promo bar.

## Deployment (Vercel)

- Configure `DATABASE_URL` in Vercel Environment Variables.
- Configure NextAuth variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`).
- If you want the temporary homepage redirect, set `HOME_REDIRECT_PATH` (e.g. `/d/gift-hampers`).

## Troubleshooting

- **MongoDB SCRAM / bad auth**
  - Ensure `DATABASE_URL` credentials are correct.
  - If your MongoDB password contains special characters (e.g. `:` `@` `/`), **URL-encode** it before putting it into `DATABASE_URL`.

