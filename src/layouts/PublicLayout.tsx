import { Link, NavLink, Outlet } from "react-router-dom";

import { ButtonLink } from "../components/ui/Button";

const navigationLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-lg px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  ].join(" ");

function PublicLayout() {
  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-slate-950"
          >
            AI Job Portal
          </Link>

          <nav aria-label="Public navigation" className="flex items-center gap-1">
            <NavLink to="/login" className={navigationLinkClass}>
              Sign in
            </NavLink>

            <ButtonLink to="/register" size="sm">
              Get started
            </ButtonLink>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default PublicLayout;