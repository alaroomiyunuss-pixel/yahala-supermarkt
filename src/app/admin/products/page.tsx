import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getServerClient, hasSupabase, type Product } from "@/lib/supabase";
import { deleteProduct } from "../actions";

export default async function ProductsAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");

  let products: Product[] = [];
  let warning: string | null = null;
  if (!hasSupabase()) {
    warning = "Supabase is not configured — connect it to manage products.";
  } else {
    const sb = getServerClient();
    if (sb) {
      const { data, error } = await sb
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) warning = error.message;
      else products = (data || []) as Product[];
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Products</h1>
          <p className="text-black/60 text-sm">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-brand-black text-brand-gold px-4 py-2 font-bold hover:bg-black"
        >
          + New product
        </Link>
      </div>

      {warning && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
          {warning}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name (NL)</th>
              <th className="p-3">Name (AR)</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Featured</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-black/50">
                  No products yet.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-t border-black/5">
                <td className="p-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-brand-gray">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name_nl}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="p-3 font-semibold">{p.name_nl}</td>
                <td className="p-3" dir="rtl" lang="ar">{p.name_ar}</td>
                <td className="p-3 text-black/60">{p.category || "—"}</td>
                <td className="p-3">
                  {p.price != null ? `€${Number(p.price).toFixed(2)}` : "—"}
                </td>
                <td className="p-3">{p.featured ? "★" : ""}</td>
                <td className="p-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-brand-goldDark font-bold hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct} className="inline ms-3">
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      className="text-red-600 hover:underline font-bold"
                      formAction={deleteProduct}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
