import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

type BrandLogoProps = {
  compactOnMobile?: boolean;
};

function BrandLogo({ compactOnMobile = false }: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="AI Job Portal home"
      className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-brand-600"
    >
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm"
      >
        <BriefcaseBusiness className="size-5" strokeWidth={2} />
      </span>

      <span
        className={[
          "text-lg font-bold tracking-tight text-slate-950",
          compactOnMobile ? "hidden sm:inline" : "",
        ].join(" ")}
      >
        AI Job Portal
      </span>
    </Link>
  );
}

export { BrandLogo };