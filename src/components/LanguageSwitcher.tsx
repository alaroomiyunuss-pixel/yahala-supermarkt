"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  function buildHref(target: Locale): string {
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    const next = segments.join("/") || `/${target}`;
    return next.startsWith("/") ? next : `/${next}`;
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface-elev p-0.5 text-sm"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={buildHref(l)}
            className={`px-3 py-1.5 rounded-full font-semibold transition ${
              active
                ? "bg-brand-black text-brand-gold"
                : "text-fg hover:bg-surface-mute"
            }`}
            aria-current={active ? "true" : undefined}
            lang={l}
          >
            {l === "nl" ? "NL" : "AR"}
          </Link>
        );
      })}
    </div>
  );
}
