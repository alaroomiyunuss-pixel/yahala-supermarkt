import Image from "next/image";
import type { Category, Product } from "@/lib/supabase";
import { saveProduct } from "@/app/admin/actions";

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product | null;
  categories: Category[];
}) {
  return (
    <form action={saveProduct} className="space-y-6 max-w-2xl">
      {product?.id && (
        <input type="hidden" name="id" defaultValue={product.id} />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name (NL)" required>
          <input
            name="name_nl"
            required
            defaultValue={product?.name_nl ?? ""}
            className="input"
          />
        </Field>
        <Field label="Name (AR)" required>
          <input
            name="name_ar"
            required
            defaultValue={product?.name_ar ?? ""}
            className="input"
            dir="rtl"
            lang="ar"
          />
        </Field>
        <Field label="Category">
          <select
            name="category"
            defaultValue={product?.category ?? ""}
            className="input"
          >
            <option value="">— none —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name_nl} ({c.slug})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Price (EUR)">
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price ?? ""}
            className="input"
          />
        </Field>
      </div>

      <Field label="Image URL (or upload below)">
        <input
          name="image_url"
          type="url"
          defaultValue={product?.image_url ?? ""}
          className="input"
          placeholder="https://…"
        />
      </Field>

      <Field label="Upload image">
        <input
          name="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand-black file:px-4 file:py-2 file:font-bold file:text-brand-gold hover:file:bg-black"
        />
        <p className="mt-1 text-xs text-black/50">
          If you upload a file it will replace the URL above.
        </p>
      </Field>

      {product?.image_url && (
        <div>
          <p className="text-sm font-semibold mb-2">Current image</p>
          <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-brand-gray">
            <Image
              src={product.image_url}
              alt={product.name_nl}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <label className="inline-flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={!!product?.featured}
          className="h-4 w-4"
        />
        Featured (shown on homepage)
      </label>

      <div className="flex gap-3 pt-2">
        <button className="rounded-lg bg-brand-black text-brand-gold px-5 py-2.5 font-bold hover:bg-black">
          Save
        </button>
        <a
          href="/admin/products"
          className="rounded-lg border border-black/10 bg-white px-5 py-2.5 font-bold hover:border-brand-gold"
        >
          Cancel
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
