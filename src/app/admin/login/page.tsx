import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAdminLang } from "@/lib/adminLang";
import { adminDicts } from "../adminDict";
import { loginAction } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  const lang = await getAdminLang();
  const d = adminDicts[lang].login;

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-[#F4F1EA]">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <div className="text-2xl font-extrabold tracking-tight">
            {d.title.includes("Admin") ? (
              <>
                YA HALA <span className="text-brand-gold">Admin</span>
              </>
            ) : (
              d.title
            )}
          </div>
          <p className="text-sm text-black/60 mt-1">{d.subtitle}</p>
        </div>

        <label className="block text-sm font-semibold text-black/70 mb-1">
          {d.password}
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-lg border border-black/15 px-4 py-3 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none"
        />

        {error && <p className="mt-3 text-sm text-red-600">{d.error}</p>}

        <button className="mt-5 w-full rounded-lg bg-brand-black text-brand-gold py-3 font-bold hover:bg-black transition">
          {d.signIn}
        </button>

        <p className="mt-4 text-xs text-black/40 text-center">{d.hint}</p>
      </form>
    </div>
  );
}
