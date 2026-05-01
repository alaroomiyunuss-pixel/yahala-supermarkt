import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getServerClient, hasSupabase } from "@/lib/supabase";

export default async function AdminHome() {
  if (!(await isAdmin())) redirect("/admin/login");

  let counts = { products: 0, offers: 0, categories: 0 };
  let connected = false;
  if (hasSupabase()) {
    const sb = getServerClient();
    if (sb) {
      const [p, o, c] = await Promise.all([
        sb.from("products").select("*", { count: "exact", head: true }),
        sb.from("offers").select("*", { count: "exact", head: true }),
        sb.from("categories").select("*", { count: "exact", head: true }),
      ]);
      counts = {
        products: p.count || 0,
        offers: o.count || 0,
        categories: c.count || 0,
      };
      connected = !p.error && !o.error && !c.error;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <p className="text-black/60 mt-1">Manage products, offers and categories.</p>
      </div>

      {!hasSupabase() && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
          Supabase env vars are missing — the public site falls back to demo data.
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> in <code>.env.local</code>.
        </div>
      )}

      {hasSupabase() && !connected && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          Could not reach Supabase. Verify your URL/keys and that you ran the SQL
          schema in <code>supabase/schema.sql</code>.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-3">
        <Card title="Products" value={counts.products} href="/admin/products" />
        <Card title="Offers" value={counts.offers} href="/admin/offers" />
        <Card title="Categories" value={counts.categories} href="/admin/categories" />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold text-lg">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-brand-black text-brand-gold px-4 py-2 font-bold hover:bg-black"
          >
            + New product
          </Link>
          <Link
            href="/admin/offers/new"
            className="rounded-lg bg-brand-gold text-brand-black px-4 py-2 font-bold hover:bg-brand-goldDark"
          >
            + New offer
          </Link>
          <Link
            href="/admin/categories"
            className="rounded-lg border border-black/10 bg-white px-4 py-2 font-bold hover:border-brand-gold"
          >
            Manage categories
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl bg-white p-6 shadow-card hover:shadow-cardHover transition"
    >
      <div className="text-sm font-semibold text-black/50 uppercase tracking-wider">
        {title}
      </div>
      <div className="mt-2 text-4xl font-extrabold">{value}</div>
      <div className="mt-2 text-sm text-brand-goldDark font-bold">Manage →</div>
    </Link>
  );
}
