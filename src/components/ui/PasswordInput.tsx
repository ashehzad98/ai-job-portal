import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input, type InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type" | "endAdornment">;

function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const visibilityLabel = isVisible ? "Hide password" : "Show password";

  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          aria-label={visibilityLabel}
          aria-pressed={isVisible}
          title={visibilityLabel}
          onClick={() => setIsVisible((currentValue) => !currentValue)}
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-brand-600"
        >
          {isVisible ? (
            <EyeOff aria-hidden="true" className="size-4" />
          ) : (
            <Eye aria-hidden="true" className="size-4" />
          )}
        </button>
      }
    />
  );
}

export { PasswordInput };
export type { PasswordInputProps };