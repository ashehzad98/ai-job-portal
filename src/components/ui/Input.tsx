import { useId, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  required,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const helperTextId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    helperText ? helperTextId : "",
    error ? errorId : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}

        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-danger">
              *
            </span>
            <span className="sr-only"> required</span>
          </>
        )}
      </label>

      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={[
          "mt-2 block min-h-11 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition",
          "placeholder:text-slate-400",
          "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
          error
            ? "border-danger focus:border-danger focus:ring-3 focus:ring-red-100"
            : "border-border hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-100",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...inputProps}
      />

      {helperText && !error && (
        <p id={helperTextId} className="mt-1.5 text-sm text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-sm font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { Input };
export type { InputProps };