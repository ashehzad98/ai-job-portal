import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";
import type { ReactNode } from "react";
import { useSavedJobs } from "../../hooks/useSavedJobs";
import { Link, useParams } from "react-router-dom";

import { MatchScoreBadge } from "../../components/jobs/MatchScoreBadge";
import { Button } from "../../components/ui/Button";
import { useMatchedJobs } from "../../hooks/useMatchedJobs";
import type { MatchStatus } from "../../types/job";
import { formatExactDate } from "../../utils/jobDate";

function JobDetailsPage() {
  const { jobId } = useParams();
  const { isJobSaved, toggleSavedJob } = useSavedJobs();
  const { allJobs } = useMatchedJobs();
  const job = allJobs.find((item) => item.id === jobId);
  const isSaved = job ? isJobSaved(job.id) : false;

  if (!job) {
    return <JobNotFound />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        to="/dashboard#jobs-for-you"
        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-brand-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>

      <section className="mt-5 rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex min-w-0 gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-700">
              {job.companyInitials}
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {job.title}
                </h1>

                {job.isNew && (
                  <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-bold uppercase text-brand-700">
                    New
                  </span>
                )}
              </div>

              <p className="mt-2 text-base font-semibold text-slate-700">
                {job.company}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="size-4" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness
                    aria-hidden="true"
                    className="size-4"
                  />
                  {job.workMode} / {job.jobType}
                </span>

                <time
                  dateTime={job.postedAt}
                  className="inline-flex items-center gap-1.5"
                >
                  <CalendarDays aria-hidden="true" className="size-4" />
                  Posted {formatExactDate(job.postedAt)}
                </time>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-end">
            <MatchScoreBadge score={job.match.score} size="md" />

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                aria-pressed={isSaved}
                onClick={() => toggleSavedJob(job.id)}
              >
                <Bookmark
                  aria-hidden="true"
                  className="mr-2 size-4"
                  fill={isSaved ? "currentColor" : "none"}
                />
                {isSaved ? "Saved" : "Save job"}
              </Button>

              {job.applicationUrl ? (
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                  Apply on original website
                  <ExternalLink
                    aria-hidden="true"
                    className="ml-2 size-4"
                  />
                </a>
              ) : (
                <Button type="button" disabled>
                  Original link unavailable
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <ContentCard title="Job description">
            <p className="leading-7 text-slate-600">
              {job.description}
            </p>
          </ContentCard>

          <ContentCard title="Requirements">
            <DefinitionItem
              label="Education"
              value={job.educationRequirement}
            />

            <DefinitionItem
              label="Experience"
              value={job.experienceRequirement}
            />

            <DefinitionItem
              label="Work arrangement"
              value={`${job.workMode} / ${job.jobType}`}
            />

            <DefinitionItem
              label="Sector"
              value={job.sector}
            />
          </ContentCard>

          <ContentCard title="Required skills">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ContentCard>

          <ContentCard title="Salary and deadline">
            <DefinitionItem
              label="Salary"
              value={job.salary ?? "Not listed"}
            />

            <DefinitionItem
              label="Application deadline"
              value={
                job.deadline
                  ? formatExactDate(job.deadline)
                  : "Not provided"
              }
            />
          </ContentCard>

          <ContentCard title="Original posting">
            <div className="flex items-start gap-3">
              <Building2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-slate-400"
              />

              <div>
                <p className="font-semibold text-slate-900">
                  Source: {job.sourceName}
                </p>

                {job.applicationUrl ? (
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View original advertisement
                    <ExternalLink
                      aria-hidden="true"
                      className="size-4"
                    />
                  </a>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This is sample data, so no original advertisement or
                    application link exists.
                  </p>
                )}
              </div>
            </div>
          </ContentCard>
        </div>

        <aside aria-labelledby="match-analysis-heading">
          <div className="rounded-xl border border-border bg-white p-5 shadow-card lg:sticky lg:top-24">
            <h2
              id="match-analysis-heading"
              className="text-xl font-bold text-slate-950"
            >
              Why this job matches
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {job.match.reason}
            </p>

            <div className="mt-5 space-y-3 border-t border-border pt-5">
              <EvidenceRow
                label="Education"
                status={job.match.educationMatch}
              />

              <EvidenceRow
                label="Experience"
                status={job.match.experienceMatch}
              />

              <EvidenceRow
                label="Location"
                status={job.match.locationMatch}
              />
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-sm font-bold text-slate-950">
                Matching skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {job.match.matchingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-sm font-bold text-slate-950">
                Missing or unconfirmed skills
              </h3>

              {job.match.missingSkills.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.match.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  No missing skills identified.
                </p>
              )}
            </div>

            <p className="mt-5 border-t border-border pt-5 text-xs leading-5 text-slate-500">
              Match analysis is guidance only. Verify every requirement
              in the original advertisement before applying.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

type ContentCardProps = {
  title: string;
  children: ReactNode;
};

function ContentCard({ title, children }: ContentCardProps) {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type DefinitionItemProps = {
  label: string;
  value: string;
};

function DefinitionItem({ label, value }: DefinitionItemProps) {
  return (
    <div className="border-b border-border py-4 first:pt-0 last:border-0 last:pb-0">
      <dt className="text-sm font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-slate-800">{value}</dd>
    </div>
  );
}

type EvidenceRowProps = {
  label: string;
  status: MatchStatus;
};

const evidenceLabels: Record<MatchStatus, string> = {
  confirmed: "Confirmed",
  likely: "Likely",
  unknown: "Unknown",
  "not-matched": "Not matched",
};

const evidenceClasses: Record<MatchStatus, string> = {
  confirmed: "bg-green-50 text-green-700",
  likely: "bg-brand-50 text-brand-700",
  unknown: "bg-slate-100 text-slate-600",
  "not-matched": "bg-red-50 text-red-700",
};

function EvidenceRow({ label, status }: EvidenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-semibold text-slate-700">{label}</span>

      <span
        className={[
          "rounded-full px-2.5 py-1 text-xs font-bold",
          evidenceClasses[status],
        ].join(" ")}
      >
        {evidenceLabels[status]}
      </span>
    </div>
  );
}

function JobNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-slate-950">
        Job not found
      </h1>

      <p className="mt-3 text-slate-600">
        This job may have expired, been removed, or the address may be
        incorrect.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Return to dashboard
      </Link>
    </main>
  );
}

export default JobDetailsPage;
