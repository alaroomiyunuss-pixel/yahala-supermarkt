# YA HALA SUPERMARKT — Website

Modern, responsive website for **YA HALA SUPERMARKT** (سوبرماركت يا هلا) — a buurtsupermarkt at Bernadottelaan 3A, 2037GK Haarlem.

- Next.js 15 (App Router) + Tailwind CSS
- Supabase (Postgres + Storage) for products, offers and categories
- Dutch (default) + Arabic (RTL) — full language switcher
- Admin panel at `/admin` with CRUD for products / offers / categories and image uploads
- WhatsApp + click‑to‑call floating buttons, Google Maps embed
- SEO‑friendly, mobile‑first, fast

---

## 1. Quick start (local)

```bash
cd yahala
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev
# → http://localhost:3000  (redirects to /nl)
```

Until you set up Supabase the public site shows demo content so you can preview everything. The admin panel needs a real Supabase project to save data.

---

## 2. Environment variables (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
ADMIN_PASSWORD=pick-something-strong
```

`SUPABASE_SERVICE_ROLE_KEY` is **server-only** and is used by the admin panel server actions. Never expose it to the browser.

---

## 3. Supabase setup

1. Create a new project at <https://supabase.com>.
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql). This creates:
   - `categories`, `products`, `offers` tables
   - Row‑level security (public read, writes via service role)
   - The `product-images` storage bucket (public reads)
   - Seed rows for the four core categories
3. Copy your project URL + anon key + service role key from **Project Settings → API** into `.env.local`.

That's it — the public pages will now read from your database.

---

## 4. Admin panel

Visit **`/admin`**. Log in with the password you set in `ADMIN_PASSWORD`.

You can:

- **Products** — add / edit / delete, set name (NL + AR), category, price, image (URL or upload), feature on homepage
- **Offers** — add / edit / delete, set title + description (NL + AR), image, active flag
- **Categories** — add / delete

Image uploads go to the Supabase `product-images` storage bucket and are served from the public URL.

---

## 5. Pages

| Path | Description |
| ---- | ----------- |
| `/` | Redirects to `/nl` |
| `/nl`, `/ar` | Home (hero, categories, featured, offers, why us, location) |
| `/[locale]/products` | Searchable, filterable product grid |
| `/[locale]/offers` | Promotions list |
| `/[locale]/about` | About us |
| `/[locale]/contact` | Address, phone, hours, map, WhatsApp |
| `/admin` | Admin dashboard (login required) |

The Arabic pages render with `dir="rtl"` and an Arabic-friendly font automatically.

---

## 6. Deploy to Vercel

1. Push this repo to GitHub.
2. Import into Vercel.
3. Add the four env vars above in **Settings → Environment Variables**.
4. Deploy. Done.

Default domain works out of the box — point the supermarket's custom domain at it from the Vercel domain settings.

---

## 7. Customisation cheatsheet

- **Colours** → `tailwind.config.ts` (`brand.black`, `brand.gold`, …)
- **Phone / WhatsApp / address** → [`src/lib/contact.ts`](./src/lib/contact.ts)
- **Translations** → [`src/i18n/dictionaries.ts`](./src/i18n/dictionaries.ts) (just edit `nl` / `ar` strings)
- **Opening hours** → translation key `contact.hoursValue`
- **Demo fallback data** (until Supabase is connected) → [`src/lib/data.ts`](./src/lib/data.ts)

---

## 8. Project structure

```
src/
  app/
    layout.tsx                 root (passes through)
    page.tsx                   redirects → /nl
    [locale]/                  public site (nl, ar)
      layout.tsx               <html dir/lang>, header, footer, floating actions
      page.tsx                 home
      products/page.tsx
      offers/page.tsx
      about/page.tsx
      contact/page.tsx
    admin/                     CMS (cookie-gated)
      layout.tsx
      login/page.tsx
      page.tsx                 dashboard
      products/(list, new, [id])/page.tsx
      offers/(list, new, [id])/page.tsx
      categories/page.tsx
      actions.ts               server actions (CRUD + uploads)
  components/                  Header, Footer, ProductCard, ProductsBrowser, …
  i18n/                        config + dictionaries
  lib/                         supabase client, data fetchers, contact info, auth
supabase/schema.sql            one-shot DB setup
```
