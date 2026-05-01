import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Offer } from "@/lib/supabase";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1400&q=80";

export default function WeeklyOfferBanner({
  locale,
  dict,
  offer,
}: {
  locale: Locale;
  dict: Dict;
  offer?: Offer | null;
}) {
  const eyebrow = dict.home.weeklyBannerEyebrow;
  const title =
    (offer && (locale === "ar" ? offer.title_ar : offer.title_nl)) ||
    dict.home.weeklyBannerTitle;
  const body =
    (offer && (locale === "ar" ? offer.description_ar : offer.description_nl)) ||
    dict.home.weeklyBannerBody;
  const img = offer?.image_url || FALLBACK_IMG;

  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        {/* warm golden banner — light: honey amber  dark: rich charcoal */}
        <div
          className="relative overflow-hidden rounded-3xl border border-line shadow-card
                      bg-gradient-to-br from-brand-cream via-[#FFF9E0] to-brand-gold/20
                      dark:from-[#201B0A] dark:via-[#2A2310] dark:to-[#181408]
                      dark:border-brand-gold/10"
        >
          <div className="relative grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0
                  lg:bg-gradient-to-r from-brand-cream/80 via-brand-cream/30 to-transparent
                  dark:lg:from-[#201B0A]/90 dark:lg:via-[#201B0A]/40 dark:lg:to-transparent
                  rtl:lg:bg-gradient-to-l"
                aria-hidden
              />
            </div>
            <div className="relative p-7 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-gold/25 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-goldDark dark:text-brand-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                {eyebrow}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-fg">
                {title}
              </h2>
              {body && (
                <p className="mt-4 max-w-xl text-fg-muted text-base sm:text-lg leading-relaxed">
                  {body}
                </p>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/offers`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-brand-black font-bold shadow-glow hover:bg-brand-goldDark transition"
                >
                  {dict.cta.seeAllOffers}
                </Link>
                <Link
                  href={`/${locale}/products?category=fruit`}
                  className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 font-bold text-fg hover:bg-surface-mute transition"
                >
                  {dict.cta.browseProducts}
                </Link>
              </div>
            </div>
          </div>
          {/* decorative gold glow */}
          <div
            className="pointer-events-none absolute -top-16 -end-16 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
