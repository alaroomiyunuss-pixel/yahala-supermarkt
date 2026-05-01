import "../globals.css";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "./adminDict";
import { logoutAction, setAdminLang } from "./actions";

export const metadata = { title: "Admin · YA HALA SUPERMARKT" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();
  const lang = await getAdminLang();
  const d = adminDicts[lang];
  const isAr = lang === "ar";

  return (
    <html lang={lang} dir={d.dir}>
      <body className="bg-[#F4F1EA] min-h-screen">
        {authed ? (
          <div className={`flex min-h-screen ${isAr ? "flex-row-reverse" : ""}`}>
            {/* SIDEBAR */}
            <aside className="w-64 shrink-0 bg-brand-black text-white flex flex-col">
              {/* Logo */}
              <div className="p-6 border-b border-white/10">
                <Link href="/admin" className="block">
                  <div className="text-brand-gold text-xl font-extrabold tracking-tight">
                    YA HALA
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {isAr ? "لوحة التحكم" : "Admin Panel"}
                  </div>
                </Link>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-3 py-4 space-y-1">
                <SideLink href="/admin">{d.nav.dashboard}</SideLink>
                <SideLink href="/admin/products">{d.nav.products}</SideLink>
                <SideLink href="/admin/offers">{d.nav.offers}</SideLink>
                <SideLink href="/admin/categories">{d.nav.categories}</SideLink>
              </nav>

              {/* Bottom: lang toggle + logout + visit site */}
              <div className="p-3 border-t border-white/10 space-y-1">
                {/* Language toggle */}
                <div className="flex gap-1 px-3 py-2">
                  <LangButton lang="nl" current={lang} label="NL" />
                  <LangButton lang="ar" current={lang} label="AR" />
                </div>

                <form action={logoutAction}>
                  <button className="w-full text-left text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition">
                    {d.nav.logout}
                  </button>
                </form>
                <Link
                  href="/nl"
                  className="block text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
                >
                  {d.nav.visitSite}
                </Link>
              </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 min-w-0">
              <main className="p-6 lg:p-10">{children}</main>
            </div>
          </div>
        ) : (
          <main className="min-h-screen">{children}</main>
        )}
      </body>
    </html>
  );
}

function SideLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-sm font-semibold text-white/85 hover:text-brand-gold hover:bg-white/5 transition"
    >
      {children}
    </Link>
  );
}

async function LangButton({
  lang,
  current,
  label,
}: {
  lang: string;
  current: string;
  label: string;
}) {
  const active = lang === current;
  return (
    <form action={setAdminLang} className="flex-1">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="back" value="/admin" />
      <button
        className={`w-full rounded-md py-1 text-xs font-bold transition ${
          active
            ? "bg-brand-gold text-brand-black"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        {label}
      </button>
    </form>
  );
}
