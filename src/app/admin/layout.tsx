import "../globals.css";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { logoutAction } from "./actions";

export const metadata = { title: "Admin · YA HALA SUPERMARKT" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();
  return (
    <html lang="en">
      <body className="bg-brand-gray min-h-screen">
        {authed ? (
          <div className="flex min-h-screen">
            <aside className="w-60 shrink-0 bg-brand-black text-white">
              <div className="p-6">
                <Link href="/admin" className="block">
                  <div className="text-brand-gold text-xl font-extrabold">
                    YA HALA
                  </div>
                  <div className="text-xs text-white/60 mt-1">Admin</div>
                </Link>
              </div>
              <nav className="px-3 space-y-1">
                <SideLink href="/admin">Dashboard</SideLink>
                <SideLink href="/admin/products">Products</SideLink>
                <SideLink href="/admin/offers">Offers</SideLink>
                <SideLink href="/admin/categories">Categories</SideLink>
              </nav>
              <div className="p-3 mt-6 border-t border-white/10">
                <form action={logoutAction}>
                  <button className="w-full text-left text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5">
                    Logout
                  </button>
                </form>
                <Link
                  href="/nl"
                  className="block text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 mt-1"
                >
                  ← Visit site
                </Link>
              </div>
            </aside>
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
      className="block px-3 py-2 rounded-lg text-sm font-semibold text-white/85 hover:text-brand-gold hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
