import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { ADDRESS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";
import Logo from "./Logo";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-brand-black text-white">
      <div className="container-x py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo locale={locale} />
          <p className="mt-4 max-w-sm text-sm text-white/70">
            {dict.footer.tagline}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            {dict.nav.contact}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li>{ADDRESS}</li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-brand-gold">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="text-white/60">{dict.contact.hoursValue}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold">
            {dict.nav.products}
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/85">
            <li>
              <Link href={`/${locale}/products`} className="hover:text-brand-gold">
                {dict.nav.products}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/offers`} className="hover:text-brand-gold">
                {dict.nav.offers}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/about`} className="hover:text-brand-gold">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-brand-gold">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>
            © {year} {dict.brand}. {dict.footer.rights}
          </span>
          <span className="text-white/40">Haarlem, Nederland</span>
        </div>
      </div>
    </footer>
  );
}
