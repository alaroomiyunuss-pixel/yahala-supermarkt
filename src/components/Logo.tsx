import type { Locale } from "@/i18n/config";

export default function Logo({
  locale,
  size = "md",
}: {
  locale: Locale;
  size?: "sm" | "md" | "lg";
}) {
  const isAr = locale === "ar";
  const dim = size === "lg" ? 56 : size === "sm" ? 36 : 44;
  const text =
    size === "lg"
      ? "text-2xl"
      : size === "sm"
        ? "text-base"
        : "text-lg";

  return (
    <div className="flex items-center gap-3">
      <div
        className="grid place-items-center rounded-2xl bg-brand-black text-brand-gold font-extrabold shadow-card"
        style={{ width: dim, height: dim }}
        aria-hidden
      >
        <span style={{ fontSize: dim * 0.42 }}>YH</span>
      </div>
      <div className="leading-tight">
        <div className={`font-extrabold ${text} tracking-tight`}>
          {isAr ? "سوبرماركت يا هلا" : "YA HALA"}
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
          {isAr ? "هارلم" : "Supermarkt · Haarlem"}
        </div>
      </div>
    </div>
  );
}
