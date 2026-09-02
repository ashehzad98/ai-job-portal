import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Authentication will be connected during the backend integration phase.
  }

  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-md rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
        <div>
          <p className="text-sm font-semibold text-brand-600">Welcome back</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Sign in to your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Access your personalized job matches and applications.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <div className="relative">
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="absolute right-0 top-0 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-600 transition hover:text-brand-700"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;