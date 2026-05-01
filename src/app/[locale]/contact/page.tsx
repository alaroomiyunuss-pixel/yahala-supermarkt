import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import PageHeader from "@/components/PageHeader";
import {
  ADDRESS,
  MAPS_DIRECTIONS,
  MAPS_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_LINK,
} from "@/lib/contact";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);

  return (
    <>
      <PageHeader
        title={dict.contact.title}
        subtitle={dict.contact.sub}
        eyebrow={dict.nav.contact}
      />
      <section className="container-x py-12 sm:py-16 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 overflow-hidden rounded-3xl border border-line shadow-card">
          <iframe
            title={dict.contact.mapTitle}
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[16/12] w-full"
          />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-line bg-surface-elev p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
              {dict.contact.address}
            </h3>
            <p className="mt-2 text-lg font-semibold text-fg">{ADDRESS}</p>
            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-black text-brand-gold px-5 py-2.5 font-bold hover:bg-black"
            >
              📍 {dict.cta.directions}
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-surface-elev p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
              {dict.contact.phone}
            </h3>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-1 block text-3xl font-extrabold text-fg hover:text-brand-goldDark"
            >
              {PHONE_DISPLAY}
            </a>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-brand-black font-bold hover:bg-brand-goldDark"
              >
                📞 {dict.cta.callUs}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-white font-bold hover:opacity-90"
              >
                💬 {dict.cta.whatsapp}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface-elev p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-fg-subtle">
              {dict.contact.hours}
            </h3>
            <p className="mt-2 text-lg font-semibold text-fg">
              {dict.contact.hoursValue}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
