import Image from "next/image";
import type { Product } from "@/lib/supabase";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

export default function ProductCard({
  product,
  locale,
  dict,
}: {
  product: Product;
  locale: Locale;
  dict: Dict;
}) {
  const name = locale === "ar" ? product.name_ar : product.name_nl;
  const cat = product.category as keyof Dict["cats"] | null;
  const catLabel = cat && dict.cats[cat] ? dict.cats[cat] : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-surface-elev border border-line shadow-card hover:shadow-cardHover dark:hover:shadow-cardDark transition">
      <div className="relative aspect-square w-full bg-surface-mute">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-3xl text-fg-subtle">
            🛒
          </div>
        )}
        {catLabel && (
          <span className="absolute top-3 start-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-fg-muted backdrop-blur">
            {catLabel}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base leading-tight line-clamp-2 min-h-[2.6em] text-fg">
          {name}
        </h3>
        {product.price != null && (
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xs text-fg-subtle">{dict.products.from}</span>
            <span className="text-lg font-extrabold text-fg">
              €{product.price.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
