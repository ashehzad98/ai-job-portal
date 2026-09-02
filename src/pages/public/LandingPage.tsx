import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  MapPin,
  SearchCheck,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { ButtonLink } from "../../components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Add your education, experience, skills, and job preferences.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Receive matched jobs",
    description:
      "We discover and analyze opportunities against your qualifications.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Apply and track",
    description:
      "Apply on the original website and keep your progress organized.",
    icon: ClipboardList,
  },
];

function LandingPage() {
  return (
    <main>
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
              <SearchCheck aria-hidden="true" className="size-4" />
              Personalized job discovery
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find the jobs that actually fit you.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Build your professional profile and receive opportunities matched
              against your skills, education, experience, location, and job
              preferences—with a clear explanation of every match.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/register" size="lg">
                Get started
                <ArrowRight aria-hidden="true" className="ml-2 size-5" />
              </ButtonLink>

              <ButtonLink to="/login" variant="secondary" size="lg">
                Sign in
              </ButtonLink>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm text-slate-500">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-success"
              />

              <p>
                Review the original job advertisement before applying on the
                employer&apos;s website.
              </p>
            </div>
          </div>

          <MatchPreview />
        </div>
      </section>

      <section
        aria-labelledby="how-it-works-heading"
        className="bg-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              How it works
            </p>

            <h2
              id="how-it-works-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
            >
              From your profile to relevant opportunities
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Spend less time searching through unrelated listings and focus on
              opportunities that match your background.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-xl border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>

                    <span className="text-sm font-bold text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <ButtonLink to="/register">
              Create your profile
              <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}

function MatchPreview() {
  return (
    <aside
      aria-label="Example job match preview"
      className="relative mx-auto w-full max-w-lg"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-3xl bg-brand-50"
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-bold text-slate-950">Jobs for you</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Example match preview
            </p>
          </div>

          <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
            3 new
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <BriefcaseBusiness aria-hidden="true" className="size-5" />
              </span>

              <div className="min-w-0">
                <h2 className="font-bold text-slate-950">
                  Junior Software Developer
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Example Technology Company
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-lg bg-success/10 px-2.5 py-2 text-center">
              <p className="text-lg font-bold text-success">88%</p>
              <p className="text-[11px] font-semibold text-success">
                Match
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
              <MapPin aria-hidden="true" className="size-3.5" />
              Islamabad
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1.5">
              Entry level
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1.5">
              On-site
            </span>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Why it matches
            </p>

            <ul className="mt-3 space-y-2">
              <MatchReason text="Your software development background aligns" />
              <MatchReason text="Required education matches your profile" />
              <MatchReason text="Location is within your preferences" />
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

type MatchReasonProps = {
  text: string;
};

function MatchReason({ text }: MatchReasonProps) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-600">
      <CheckCircle2
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-success"
      />
      <span>{text}</span>
    </li>
  );
}

export default LandingPage;