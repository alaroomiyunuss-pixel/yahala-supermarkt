"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Offer, OfferKind } from "@/lib/supabase";

export default function OfferKindTabs({
  offers,
  locale,
  dict,
  initial = "weekly",
  emptyText,
}: {
  offers: Offer[];
  locale: Locale;
  dict: Dict;
  initial?: OfferKind;
  emptyText?: string;
}) {
  const [active, setActive] = useState<OfferKind>(initial);
  const tabs: { key: OfferKind; label: string }[] = [
    { key: "daily", label: dict.offers.daily },
    { key: "weekly", label: dict.offers.weekly },
    { key: "monthly", label: dict.offers.monthly },
  ];

  const list = offers.filter((o) => o.kind === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-full bg-surface-mute p-1.5 w-fit border border-line">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-bold transition ${
                on
                  ? "bg-brand-black text-brand-gold shadow-card"
                  : "text-fg/70 hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface-mute p-12 text-center text-fg-subtle">
          {emptyText || dict.offers.empty}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
          {list.map((o) => {
            const t = locale === "ar" ? o.title_ar : o.title_nl;
            const d =
              (locale === "ar" ? o.description_ar : o.description_nl) || "";
            return (
              <article
                key={o.id}
                className="group relative overflow-hidden rounded-2xl card hover:shadow-cardHover dark:hover:shadow-cardDark transition"
              >
                <div className="relative aspect-[16/10] w-full bg-surface-mute">
                  {o.image_url ? (
                    <Image
                      src={o.image_url}
                      alt={t}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-brand-cream text-brand-gold text-5xl">
                      %
                    </div>
                  )}
                  <span className="absolute top-3 start-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-black">
                    {dict.offers.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-snug">{t}</h3>
                  {d && (
                    <p className="mt-2 text-sm text-fg-muted line-clamp-3">
                      {d}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
