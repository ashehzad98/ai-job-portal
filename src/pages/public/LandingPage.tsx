import { ButtonLink } from "../../components/ui/Button";

function LandingPage() {
  return (
    <main className="px-4 py-16 sm:px-6 sm:py-24">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Personalized job discovery
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Find jobs that match your profile
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Create your professional profile and receive relevant opportunities
          matched against your skills, education, experience, and preferences.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/register" size="lg">
            Create your profile
          </ButtonLink>

          <ButtonLink to="/login" variant="secondary" size="lg">
            Sign in
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;