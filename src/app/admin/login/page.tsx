import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { loginAction } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <div className="text-2xl font-extrabold tracking-tight">
            YA HALA <span className="text-brand-gold">Admin</span>
          </div>
          <p className="text-sm text-black/60 mt-1">Sign in to manage content</p>
        </div>
        <label className="block text-sm font-semibold text-black/70 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="w-full rounded-lg border border-black/15 px-4 py-3 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none"
        />
        {error && (
          <p className="mt-3 text-sm text-red-600">Invalid password.</p>
        )}
        <button className="mt-5 w-full rounded-lg bg-brand-black text-brand-gold py-3 font-bold hover:bg-black transition">
          Sign in
        </button>
        <p className="mt-4 text-xs text-black/50 text-center">
          Set <code>ADMIN_PASSWORD</code> in <code>.env.local</code>
        </p>
      </form>
    </div>
  );
}
