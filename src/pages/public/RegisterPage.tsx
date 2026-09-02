import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/PasswordInput";

type RegistrationErrors = {
  fullName?: string;
  password?: string;
  confirmPassword?: string;
};

function RegisterPage() {
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setFormMessage("");

    const form = new FormData(event.currentTarget);

    const fullName = String(form.get("fullName") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    const validationErrors: RegistrationErrors = {};

    if (fullName.length < 2) {
      validationErrors.fullName =
        "Enter your full name using at least 2 characters.";
    }

    if (password.length < 8) {
      validationErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormMessage(
      "Registration form is valid. Account creation will be connected to the backend later.",
    );
  }

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-md rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
        <div>
          <p className="text-sm font-semibold text-brand-600">Get started</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Start building your profile to receive personalized job matches.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full name"
            placeholder="Muhammad Ashraf Shehzad"
            autoComplete="name"
            error={errors.fullName}
            required
          />

          <Input
            id="registrationEmail"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <PasswordInput
            id="registrationPassword"
            name="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            helperText="Use at least 8 characters."
            error={errors.password}
            required
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            placeholder="Enter your password again"
            autoComplete="new-password"
            error={errors.confirmPassword}
            required
          />

          {formMessage && (
            <div
              role="status"
              className="rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-800"
            >
              {formMessage}
            </div>
          )}

          <Button type="submit" fullWidth>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-600 transition hover:text-brand-700"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;