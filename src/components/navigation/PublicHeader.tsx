import { NavLink } from "react-router-dom";

import { BrandLogo } from "../brand/BrandLogo";
import { ButtonLink } from "../ui/Button";

function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <BrandLogo compactOnMobile />

        <nav
          aria-label="Public navigation"
          className="flex items-center gap-1 sm:gap-2"
        >
          <NavLink
            to="/login"
            className={({ isActive }) =>
              [
                "rounded-lg px-2.5 py-2 text-sm font-semibold transition sm:px-3",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")
            }
          >
            Sign in
          </NavLink>

          <ButtonLink to="/register" size="sm">
            Get started
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}

export { PublicHeader };