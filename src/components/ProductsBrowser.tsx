"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/supabase";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import ProductCard from "./ProductCard";

export default function ProductsBrowser({
  products,
  categories,
  locale,
  dict,
  initialCategory,
}: {
  products: Product[];
  categories: Category[];
  locale: Locale;
  dict: Dict;
  initialCategory?: string;
}) {
  const [active, setActive] = useState<string>(initialCategory ?? "");
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (active && p.category !== active) return false;
      if (!q) return true;
      return (
        p.name_nl.toLowerCase().includes(q) ||
        p.name_ar.toLowerCase().includes(q)
      );
    });
  }, [products, active, query]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.products.searchPlaceholder}
            className="w-full rounded-full border border-line bg-surface-elev text-fg px-5 py-3 ps-11 text-sm shadow-card focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 outline-none placeholder:text-fg-subtle"
            aria-label={dict.products.searchPlaceholder}
          />
          <span className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-fg-subtle">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("")}
          className={`rounded-full px-4 py-2 text-sm font-bold transition border ${
            active === ""
              ? "bg-brand-black text-brand-gold border-brand-black"
              : "bg-surface-elev text-fg border-line hover:border-brand-gold"
          }`}
        >
          {dict.products.all}
        </button>
        {categories.map((c) => {
          const label = locale === "ar" ? c.name_ar : c.name_nl;
          const isActive = active === c.slug;
          return (
            <button
              key={c.id}
              onClick={() => setActive(isActive ? "" : c.slug)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition border ${
                isActive
                  ? "bg-brand-black text-brand-gold border-brand-black"
                  : "bg-surface-elev text-fg border-line hover:border-brand-gold"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface-mute p-12 text-center text-fg-subtle">
          {dict.products.empty}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
