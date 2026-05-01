import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../adminDict";
import { getServerClient, hasSupabase, type Category } from "@/lib/supabase";
import { deleteCategory, saveCategory } from "../actions";

export default async function CategoriesAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");

  const lang = await getAdminLang();
  const d = adminDicts[lang];
  const dc = d.categories;
  const isAr = lang === "ar";

  let categories: Category[] = [];
  let warning: string | null = null;

  if (!hasSupabase()) warning = d.sb.notConfigured;
  else {
    const sb = getServerClient();
    if (sb) {
      const { data, error } = await sb
        .from("categories")
        .select("*")
        .order("name_nl");
      if (error) warning = error.message;
      else categories = (data || []) as Category[];
    }
  }

  return (
    <div className={`space-y-6 ${isAr ? "text-right" : ""}`}>
      <h1 className="text-2xl font-extrabold">{dc.title}</h1>

      {warning && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
          {warning}
        </div>
      )}

      {/* Add form */}
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-bold mb-4">{dc.addTitle}</h2>
        <form action={saveCategory} className="grid gap-3 sm:grid-cols-3">
          <input
            name="slug"
            placeholder={dc.slugPlaceholder}
            required
            className="input"
          />
          <input
            name="name_nl"
            placeholder={dc.nameNlPlaceholder}
            required
            className="input"
          />
          <input
            name="name_ar"
            placeholder={dc.nameArPlaceholder}
            required
            className="input"
            dir="rtl"
            lang="ar"
          />
          <div className="sm:col-span-3">
            <button className="rounded-lg bg-brand-black text-brand-gold px-5 py-2.5 font-bold hover:bg-black transition">
              {dc.add}
            </button>
          </div>
        </form>
        <style>{`.input{width:100%;border:1px solid rgba(0,0,0,.15);border-radius:.5rem;padding:.6rem .9rem;background:#fff}.input:focus{outline:none;border-color:#F4B700;box-shadow:0 0 0 3px rgba(244,183,0,.25)}`}</style>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-black/5 text-left">
            <tr>
              <th className="p-3">{dc.headers.slug}</th>
              <th className="p-3">{dc.headers.nameNl}</th>
              <th className="p-3">{dc.headers.nameAr}</th>
              <th className={`p-3 ${isAr ? "text-left" : "text-right"}`}>
                {dc.headers.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-black/50">
                  {dc.empty}
                </td>
              </tr>
            )}
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-black/5">
                <td className="p-3 font-mono text-xs">{c.slug}</td>
                <td className="p-3 font-semibold">{c.name_nl}</td>
                <td className="p-3" dir="rtl" lang="ar">
                  {c.name_ar}
                </td>
                <td className={`p-3 ${isAr ? "text-left" : "text-right"}`}>
                  <form action={deleteCategory} className="inline">
                    <input type="hidden" name="id" value={c.id} />
                    <button className="text-red-600 hover:underline font-bold">
                      {dc.del}
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
