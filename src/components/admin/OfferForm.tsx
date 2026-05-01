import Image from "next/image";
import type { Offer } from "@/lib/supabase";
import type { AdminDict } from "@/app/admin/adminDict";
import { saveOffer } from "@/app/admin/actions";

export default function OfferForm({
  offer,
  dict,
}: {
  offer?: Offer | null;
  dict: AdminDict;
}) {
  const f = dict.form;
  return (
    <form action={saveOffer} className="space-y-6 max-w-2xl">
      {offer?.id && <input type="hidden" name="id" defaultValue={offer.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.titleNl} required>
          <input
            name="title_nl"
            required
            defaultValue={offer?.title_nl ?? ""}
            className="input"
          />
        </Field>
        <Field label={f.titleAr} required>
          <input
            name="title_ar"
            required
            defaultValue={offer?.title_ar ?? ""}
            className="input"
            dir="rtl"
            lang="ar"
          />
        </Field>
      </div>

      <Field label={f.descNl}>
        <textarea
          name="description_nl"
          rows={3}
          defaultValue={offer?.description_nl ?? ""}
          className="input"
        />
      </Field>

      <Field label={f.descAr}>
        <textarea
          name="description_ar"
          rows={3}
          defaultValue={offer?.description_ar ?? ""}
          className="input"
          dir="rtl"
          lang="ar"
        />
      </Field>

      <Field label={f.kind}>
        <select
          name="kind"
          defaultValue={offer?.kind ?? "weekly"}
          className="input"
        >
          <option value="daily">{f.kindDaily}</option>
          <option value="weekly">{f.kindWeekly}</option>
          <option value="monthly">{f.kindMonthly}</option>
        </select>
      </Field>

      <Field label={f.imageUrl}>
        <input
          name="image_url"
          type="url"
          defaultValue={offer?.image_url ?? ""}
          className="input"
          placeholder="https://…"
        />
      </Field>

      <Field label={f.imageUpload}>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand-black file:px-4 file:py-2 file:font-bold file:text-brand-gold hover:file:bg-black"
        />
      </Field>

      {offer?.image_url && (
        <div>
          <p className="text-sm font-semibold mb-2">{f.currentImage}</p>
          <div className="relative h-32 w-48 overflow-hidden rounded-lg bg-[#F4F1EA]">
            <Image
              src={offer.image_url}
              alt={offer.title_nl}
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <label className="inline-flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="active"
          defaultChecked={offer ? !!offer.active : true}
          className="h-4 w-4"
        />
        {f.activeLabel}
      </label>

      <div className="flex gap-3 pt-2">
        <button className="rounded-lg bg-brand-black text-brand-gold px-5 py-2.5 font-bold hover:bg-black transition">
          {f.save}
        </button>
        <a
          href="/admin/offers"
          className="rounded-lg border border-black/10 bg-white px-5 py-2.5 font-bold hover:border-brand-gold transition"
        >
          {f.cancel}
        </a>
      </div>

      <style>{`.input{width:100%;border:1px solid rgba(0,0,0,.15);border-radius:.5rem;padding:.6rem .9rem;background:#fff}.input:focus{outline:none;border-color:#F4B700;box-shadow:0 0 0 3px rgba(244,183,0,.25)}`}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-black/70 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
