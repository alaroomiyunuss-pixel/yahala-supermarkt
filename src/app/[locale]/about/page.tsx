import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import PageHeader from "@/components/PageHeader";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);

  const values = [dict.about.v1, dict.about.v2, dict.about.v3, dict.about.v4];

  return (
    <>
      <PageHeader
        title={dict.about.title}
        subtitle={dict.about.lead}
        eyebrow={dict.nav.about}
      />
      <section className="container-x py-12 sm:py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-3xl shadow-card aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80"
            alt={dict.about.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg text-fg-muted leading-relaxed">{dict.about.p1}</p>
          <p className="mt-5 text-lg text-fg-muted leading-relaxed">
            {dict.about.p2}
          </p>

          <h3 className="mt-10 text-xl font-extrabold text-fg">{dict.about.values}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {values.map((v) => (
              <li
                key={v}
                className="flex items-center gap-3 rounded-xl bg-surface-mute px-4 py-3 font-semibold text-fg"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-gold text-brand-black">
                  ✓
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
