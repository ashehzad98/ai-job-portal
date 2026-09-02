import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
  };

type ButtonLinkProps = SharedButtonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-border bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  danger:
    "bg-danger text-white shadow-sm hover:bg-red-700 active:bg-red-800",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-2 text-sm",
  md: "min-h-10 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-base",
};

function createButtonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: Omit<SharedButtonProps, "children">) {
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function LoadingSpinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  isLoading = false,
  disabled,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={createButtonClassName({
        variant,
        size,
        fullWidth,
        className,
      })}
      {...buttonProps}
    >
      {isLoading && <LoadingSpinner />}

      <span className={isLoading ? "ml-2" : undefined}>{children}</span>
    </button>
  );
}

function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      className={createButtonClassName({
        variant,
        size,
        fullWidth,
        className,
      })}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export { Button, ButtonLink };
export type { ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant };