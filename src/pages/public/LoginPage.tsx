import type { FormEvent } from "react";
import { Link } from "react-router-dom";

import { AuthCard } from "../../components/auth/AuthCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/PasswordInput";

function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Authentication will be connected during backend integration.
  }

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Access your personalized job matches and applications."
      footer={
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-600 transition hover:text-brand-700"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;