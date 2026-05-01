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
    <div className="hero-grad border-b border-line">
      <div className="container-x py-14 sm:py-20">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-goldDark dark:text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-fg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-fg-muted text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
