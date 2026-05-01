import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fetchCategories, fetchOffers, fetchProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Section from "@/components/Section";
import WeeklyOfferBanner from "@/components/WeeklyOfferBanner";
import OfferKindTabs from "@/components/OfferKindTabs";
import {
  ADDRESS,
  MAPS_DIRECTIONS,
  MAPS_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
} from "@/lib/contact";

const CATEGORY_IMAGE: Record<string, string> = {
  vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&q=80",
  fruit:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80",
  meat: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=900&q=80",
  daily:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
  yemeni:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80",
  syrian:
    "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=900&q=80",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);

  const [categories, featured, allProducts, allOffers, weeklyOffers] =
    await Promise.all([
      fetchCategories(),
      fetchProducts({ featured: true, limit: 8 }),
      fetchProducts({}),
      fetchOffers({ activeOnly: true }),
      fetchOffers({ activeOnly: true, kind: "weekly" }),
    ]);

  const featuredList =
    featured.length > 0 ? featured : allProducts.slice(0, 8);

  const yemeni = allProducts
    .filter((p) => p.category === "yemeni")
    .slice(0, 8);
  const syrian = allProducts
    .filter((p) => p.category === "syrian")
    .slice(0, 8);

  const heroWeeklyOffer = weeklyOffers[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 80% 0%, rgba(245,197,24,0.45), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(245,197,24,0.25), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="container-x relative grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              Haarlem · Bernadottelaan 3A
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {dict.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-white/75 text-lg">
              {dict.home.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 py-3 text-brand-black font-bold shadow-glow hover:bg-brand-goldDark transition"
              >
                {dict.cta.browseProducts}
              </Link>
              <Link
                href={`/${locale}/offers`}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-bold hover:bg-white/10 transition"
              >
                {dict.cta.seeOffers}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80"
                alt={dict.tagline}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 start-6 rounded-2xl bg-surface text-fg px-5 py-4 shadow-card max-w-[18rem]">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold text-brand-black text-xl">
                  ★
                </div>
                <div>
                  <div className="text-sm font-bold">{dict.home.why.fresh.t}</div>
                  <div className="text-xs text-fg-muted">
                    {dict.home.why.fresh.d}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY OFFER BANNER */}
      <WeeklyOfferBanner
        locale={locale}
        dict={dict}
        offer={heroWeeklyOffer}
      />

      {/* CATEGORIES */}
      <Section
        title={dict.home.categoriesTitle}
        subtitle={dict.products.sub}
        className="band-mute"
        action={
          <Link
            href={`/${locale}/products`}
            className="text-sm font-bold text-fg hover:text-brand-goldDark underline-offset-4 hover:underline"
          >
            {dict.cta.browseProducts} →
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const name = locale === "ar" ? c.name_ar : c.name_nl;
            const img = CATEGORY_IMAGE[c.slug] || CATEGORY_IMAGE.vegetables;
            return (
              <Link
                key={c.id}
                href={`/${locale}/products?category=${c.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-surface-mute shadow-card hover:shadow-cardHover dark:hover:shadow-cardDark transition"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3 className="text-white text-sm sm:text-base font-extrabold drop-shadow-sm leading-snug">
                      {name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* FEATURED PRODUCTS */}
      <Section
        title={dict.home.featuredTitle}
        subtitle={dict.home.featuredSub}
        action={
          <Link
            href={`/${locale}/products`}
            className="text-sm font-bold text-fg hover:text-brand-goldDark underline-offset-4 hover:underline"
          >
            {dict.cta.browseProducts} →
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featuredList.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      </Section>

      {/* YEMENI PRODUCTS */}
      {yemeni.length > 0 && (
        <Section
          title={dict.home.yemeniTitle}
          subtitle={dict.home.yemeniSub}
          className="band-mute"
          action={
            <Link
              href={`/${locale}/products?category=yemeni`}
              className="text-sm font-bold text-fg hover:text-brand-goldDark underline-offset-4 hover:underline"
            >
              {dict.cta.browseProducts} →
            </Link>
          }
        >
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {yemeni.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </Section>
      )}

      {/* SYRIAN PRODUCTS */}
      {syrian.length > 0 && (
        <Section
          title={dict.home.syrianTitle}
          subtitle={dict.home.syrianSub}
          action={
            <Link
              href={`/${locale}/products?category=syrian`}
              className="text-sm font-bold text-fg hover:text-brand-goldDark underline-offset-4 hover:underline"
            >
              {dict.cta.browseProducts} →
            </Link>
          }
        >
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {syrian.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </Section>
      )}

      {/* DAILY / WEEKLY / MONTHLY OFFER TABS */}
      {allOffers.length > 0 && (
        <Section
          title={dict.home.offerTabsTitle}
          subtitle={dict.home.offerTabsSub}
          className="band-mute"
          action={
            <Link
              href={`/${locale}/offers`}
              className="text-sm font-bold text-fg hover:text-brand-goldDark underline-offset-4 hover:underline"
            >
              {dict.cta.seeAllOffers} →
            </Link>
          }
        >
          <OfferKindTabs
            offers={allOffers}
            locale={locale}
            dict={dict}
            initial="weekly"
          />
        </Section>
      )}

      {/* WHY CHOOSE US */}
      <Section title={dict.home.whyTitle} className="bg-brand-black text-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { key: "fresh", icon: "🌿" },
              { key: "quality", icon: "⭐" },
              { key: "price", icon: "€" },
              { key: "service", icon: "♥" },
            ] as const
          ).map(({ key, icon }) => {
            const item = dict.home.why[key];
            return (
              <div
                key={key}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.07] transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gold text-brand-black text-xl font-extrabold">
                  {icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.t}</h3>
                <p className="mt-1 text-sm text-white/70">{item.d}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* LOCATION */}
      <Section title={dict.home.visitTitle} subtitle={dict.home.visitSub}>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3 overflow-hidden rounded-2xl border border-line shadow-card">
            <iframe
              title={dict.contact.mapTitle}
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-[16/11] w-full"
            />
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-line bg-surface-elev p-6 sm:p-8 shadow-card">
            <h3 className="text-xl font-bold text-fg">{dict.contact.address}</h3>
            <p className="mt-2 text-fg-muted">{ADDRESS}</p>
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
                {dict.contact.phone}
              </h4>
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-1 block text-2xl font-extrabold tracking-wide text-fg hover:text-brand-goldDark"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
                {dict.contact.hours}
              </h4>
              <p className="mt-1 font-semibold text-fg">{dict.contact.hoursValue}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-white font-bold hover:opacity-90 transition"
              >
                <span>💬</span>
                {dict.cta.whatsapp}
              </a>
              <a
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-black text-brand-gold px-5 py-2.5 font-bold hover:bg-black transition"
              >
                <span>📍</span>
                {dict.cta.directions}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
