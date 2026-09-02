import { Bookmark, ClipboardList, LayoutDashboard } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { BrandLogo } from "../../components/brand/BrandLogo";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Saved jobs",
    path: "/saved-jobs",
    icon: Bookmark,
  },
  {
    label: "Applications",
    path: "/applications",
    icon: ClipboardList,
  },
];

function ApplicationHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo compactOnMobile />

        <nav
          aria-label="Application navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")
                }
              >
                <Icon aria-hidden="true" className="size-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <Link
          to="/profile"
          aria-label="View profile"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100"
        >
          <span className="hidden text-sm font-semibold text-slate-700 sm:inline">
            Ashraf
          </span>

          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
          >
            AS
          </span>
        </Link>
      </div>

      <nav
        aria-label="Mobile application navigation"
        className="overflow-x-auto border-t border-border px-4 md:hidden"
      >
        <div className="mx-auto flex min-w-max items-center gap-1 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100",
                  ].join(" ")
                }
              >
                <Icon aria-hidden="true" className="size-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export { ApplicationHeader };