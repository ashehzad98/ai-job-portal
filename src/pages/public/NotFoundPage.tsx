import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <section className="text-center">
        <p className="text-sm font-semibold text-brand-600">404 error</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Page not found
        </h1>

        <p className="mt-3 text-slate-600">
          The page you requested does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;