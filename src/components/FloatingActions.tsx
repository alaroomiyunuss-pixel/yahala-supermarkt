import { PHONE_TEL, WHATSAPP_LINK } from "@/lib/contact";
import type { Dict } from "@/i18n/dictionaries";

export default function FloatingActions({ dict }: { dict: Dict }) {
  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.cta.whatsapp}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition hover:scale-105"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
          <path
            fill="currentColor"
            d="M19.11 17.36c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47l-.52-.01a1.01 1.01 0 0 0-.73.34c-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.81.13.18 1.91 2.92 4.62 4.09.65.28 1.15.45 1.54.58.65.21 1.24.18 1.71.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.25-.18-.52-.31zM16.04 4C9.93 4 4.97 8.95 4.97 15.05c0 1.94.51 3.84 1.48 5.5L4 28l7.66-2.42a11.05 11.05 0 0 0 4.39.91h.01c6.1 0 11.06-4.95 11.06-11.05 0-2.95-1.15-5.73-3.24-7.81A10.96 10.96 0 0 0 16.04 4zm0 20.18h-.01a9.13 9.13 0 0 1-4.66-1.28l-.33-.2-4.55 1.43 1.45-4.43-.22-.34a9.05 9.05 0 0 1-1.39-4.85c0-5.03 4.09-9.12 9.13-9.12 2.44 0 4.73.95 6.45 2.67a9.06 9.06 0 0 1 2.67 6.45c0 5.03-4.09 9.12-9.12 9.12z"
          />
        </svg>
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label={dict.cta.callUs}
        className="grid h-14 w-14 place-items-center rounded-full bg-brand-black text-brand-gold shadow-lg shadow-black/15 transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden>
          <path
            d="M5 4.5A1.5 1.5 0 0 1 6.5 3h2.25c.75 0 1.41.49 1.62 1.21l.86 3a1.5 1.5 0 0 1-.4 1.5l-1.36 1.36a12 12 0 0 0 5.46 5.46l1.36-1.36a1.5 1.5 0 0 1 1.5-.4l3 .86A1.69 1.69 0 0 1 21 15.25v2.25A1.5 1.5 0 0 1 19.5 19C10.94 19 4 12.06 4 3.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
