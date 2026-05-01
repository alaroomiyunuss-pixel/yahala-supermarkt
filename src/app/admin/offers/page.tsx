import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getServerClient, hasSupabase, type Offer } from "@/lib/supabase";
import { deleteOffer } from "../actions";

export default async function OffersAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");

  let offers: Offer[] = [];
  let warning: string | null = null;
  if (!hasSupabase()) warning = "Supabase is not configured.";
  else {
    const sb = getServerClient();
    if (sb) {
      const { data, error } = await sb
        .from("offers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) warning = error.message;
      else offers = (data || []) as Offer[];
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Offers</h1>
          <p className="text-black/60 text-sm">{offers.length} total</p>
        </div>
        <Link
          href="/admin/offers/new"
          className="rounded-lg bg-brand-gold text-brand-black px-4 py-2 font-bold hover:bg-brand-goldDark"
        >
          + New offer
        </Link>
      </div>

      {warning && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
          {warning}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {offers.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center text-black/50 shadow-card md:col-span-2">
            No offers yet.
          </div>
        )}
        {offers.map((o) => (
          <article key={o.id} className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="relative aspect-[16/9] bg-brand-gray">
              {o.image_url && (
                <Image
                  src={o.image_url}
                  alt={o.title_nl}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              <span
                className={`absolute top-3 start-3 rounded-full px-2.5 py-1 text-xs font-bold ${
                  o.active ? "bg-brand-gold text-brand-black" : "bg-black/60 text-white"
                }`}
              >
                {o.active ? "Active" : "Inactive"}
              </span>
              <span className="absolute top-3 end-3 rounded-full bg-black/70 text-white px-2.5 py-1 text-xs font-bold uppercase">
                {o.kind}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold">{o.title_nl}</h3>
              <p className="text-sm text-black/60" dir="rtl" lang="ar">
                {o.title_ar}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/admin/offers/${o.id}`}
                  className="text-brand-goldDark font-bold hover:underline"
                >
                  Edit
                </Link>
                <form action={deleteOffer} className="inline">
                  <input type="hidden" name="id" value={o.id} />
                  <button className="text-red-600 hover:underline font-bold">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
