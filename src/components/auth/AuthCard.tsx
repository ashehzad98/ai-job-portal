import type { ReactNode } from "react";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-md rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
        <header>
          <p className="text-sm font-semibold text-brand-600">{eyebrow}</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </header>

        <div className="mt-8">{children}</div>

        {footer && <footer className="mt-6">{footer}</footer>}
      </section>
    </main>
  );
}

export { AuthCard };
export type { AuthCardProps };