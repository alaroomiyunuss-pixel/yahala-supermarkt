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
    (offer &&
      (locale === "ar" ? offer.description_ar : offer.description_nl)) ||
    dict.home.weeklyBannerBody;
  const img = offer?.image_url || FALLBACK_IMG;

  return (
    <section className="py-10 sm:py-14">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-brand-black text-white shadow-cardDark">
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
                className="absolute inset-0 lg:bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent rtl:bg-gradient-to-l"
                aria-hidden
              />
            </div>
            <div className="relative p-7 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                {eyebrow}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                {title}
              </h2>
              {body && (
                <p className="mt-4 max-w-xl text-white/80 text-base sm:text-lg leading-relaxed">
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
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold hover:bg-white/10 transition"
                >
                  {dict.cta.browseProducts}
                </Link>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -top-16 -end-16 h-56 w-56 rounded-full bg-brand-gold/30 blur-3xl"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
