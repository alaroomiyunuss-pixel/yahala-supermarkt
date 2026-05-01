export default function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="bg-brand-black text-white">
      <div className="container-x py-14 sm:py-20">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-white/70 text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
