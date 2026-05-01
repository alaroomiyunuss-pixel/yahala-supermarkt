import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "./adminDict";
import { getServerClient, hasSupabase } from "@/lib/supabase";
import SeedButton from "./SeedButton";

export default async function AdminHome() {
  if (!(await isAdmin())) redirect("/admin/login");

  const lang = await getAdminLang();
  const d = adminDicts[lang];
  const isAr = lang === "ar";

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

  const isEmpty = connected && counts.products === 0 && counts.offers === 0;

  return (
    <div className={`space-y-8 ${isAr ? "text-right" : ""}`}>
      <div>
        <h1 className="text-3xl font-extrabold">{d.dashboard.title}</h1>
        <p className="text-black/60 mt-1">{d.dashboard.subtitle}</p>
      </div>

      {!hasSupabase() && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
          {d.sb.notConfigured}
        </div>
      )}

      {hasSupabase() && !connected && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          {d.sb.cannotReach}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          title={d.dashboard.stats.products}
          value={counts.products}
          href="/admin/products"
          manage={d.dashboard.manage}
        />
        <StatCard
          title={d.dashboard.stats.offers}
          value={counts.offers}
          href="/admin/offers"
          manage={d.dashboard.manage}
        />
        <StatCard
          title={d.dashboard.stats.categories}
          value={counts.categories}
          href="/admin/categories"
          manage={d.dashboard.manage}
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold text-lg">{d.dashboard.quickActions}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-brand-black text-brand-gold px-4 py-2 font-bold hover:bg-black transition"
          >
            {d.dashboard.newProduct}
          </Link>
          <Link
            href="/admin/offers/new"
            className="rounded-lg bg-brand-gold text-brand-black px-4 py-2 font-bold hover:bg-brand-goldDark transition"
          >
            {d.dashboard.newOffer}
          </Link>
          <Link
            href="/admin/categories"
            className="rounded-lg border border-black/10 bg-white px-4 py-2 font-bold hover:border-brand-gold transition"
          >
            {d.dashboard.manageCategories}
          </Link>
        </div>
      </div>

      {/* Seed section — only when DB is connected */}
      {connected && (
        <div
          className={`rounded-2xl bg-white p-6 shadow-card border-2 ${
            isEmpty ? "border-brand-gold" : "border-transparent"
          }`}
        >
          <h2 className="font-bold text-lg">{d.dashboard.seedTitle}</h2>
          <p className="mt-1 text-sm text-black/60 max-w-xl">{d.dashboard.seedDesc}</p>
          <div className="mt-4">
            <SeedButton
              label={d.dashboard.seedButton}
              successMsg={d.dashboard.seedSuccess}
              busyMsg={d.dashboard.seedBusy}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
  manage,
}: {
  title: string;
  value: number;
  href: string;
  manage: string;
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
      <div className="mt-2 text-sm text-brand-goldDark font-bold">{manage}</div>
    </Link>
  );
}
