import type { ReactNode } from "react";

export default function Section({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-14 sm:py-20 ${className}`}>
      <div className="container-x">
        {(title || action) && (
          <div className="mb-8 sm:mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              {title && (
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-fg">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-fg-muted max-w-2xl">{subtitle}</p>
              )}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
