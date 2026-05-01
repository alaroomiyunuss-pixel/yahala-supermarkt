import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fetchOffers } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import OfferKindTabs from "@/components/OfferKindTabs";

export default async function OffersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  const { locale: raw } = await params;
  const { kind } = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);
  const offers = await fetchOffers({ activeOnly: true });

  const initial: "daily" | "weekly" | "monthly" =
    kind === "daily" || kind === "monthly" ? kind : "weekly";

  return (
    <>
      <PageHeader
        title={dict.offers.title}
        subtitle={dict.offers.sub}
        eyebrow={dict.nav.offers}
      />
      <section className="container-x py-12 sm:py-16">
        {offers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-surface-mute p-16 text-center text-fg-subtle">
            {dict.offers.empty}
          </div>
        ) : (
          <OfferKindTabs
            offers={offers}
            locale={locale}
            dict={dict}
            initial={initial}
          />
        )}
      </section>
    </>
  );
}
