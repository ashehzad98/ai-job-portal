import {
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";

import type { Job } from "../../data/job";
import {
  formatExactDate,
  formatPostedDate,
  formatSavedDate,
} from "../../utils/jobDate";
import { ButtonLink } from "../ui/Button";
import { MatchScoreBadge } from "./MatchScoreBadge";

type JobCardListProps = {
  jobs: Job[];
  savedJobIds: ReadonlySet<string>;
  savedAtByJobId?: ReadonlyMap<string, string>;
  onToggleSaved: (jobId: string) => void;
  displayMode?: "responsive" | "always";
};

function JobCardList({
  jobs,
  savedJobIds,
  savedAtByJobId,
  onToggleSaved,
  displayMode = "responsive",
}: JobCardListProps) {
  return (
    <div
      className={[
        "grid gap-4 md:grid-cols-2",
        displayMode === "responsive" ? "xl:hidden" : "xl:grid-cols-3",
      ].join(" ")}
    >
      {jobs.map((job) => {
        const isSaved = savedJobIds.has(job.id);
        const savedAt = savedAtByJobId?.get(job.id);
        return (
          <article
            key={job.id}
            className="flex flex-col rounded-xl border border-border bg-white p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <MatchScoreBadge score={job.match.score} />

              {job.isNew && (
                <span className="rounded-full bg-brand-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                  New
                </span>
              )}
            </div>

            <div className="mt-4 flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="size-5"
                />
              </span>

              <div className="min-w-0">
                <h3 className="font-bold leading-6 text-slate-950">
                  {job.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                {job.location}
              </span>

              <span>{job.workMode}</span>
              <span>{job.jobType}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.match.matchingSkills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <time
                dateTime={job.postedAt}
                title={formatExactDate(job.postedAt)}
                className="inline-flex items-center gap-1.5 text-slate-500"
              >
                <Clock3 aria-hidden="true" className="size-4" />
                Posted {formatPostedDate(job.postedAt)}
              </time>

              {savedAt && (
                <time
                  dateTime={savedAt}
                  className="text-xs font-medium text-brand-700"
                >
                  Saved {formatSavedDate(savedAt)}
                </time>
              )}
            </div>

            <div className="mt-auto flex gap-2 pt-5">
              <ButtonLink
                to={`/jobs/${job.id}`}
                fullWidth
                aria-label={`View ${job.title}`}
              >
                View job
              </ButtonLink>

              <button
                type="button"
                aria-label={
                  isSaved
                    ? `Remove ${job.title} from saved jobs`
                    : `Save ${job.title}`
                }
                aria-pressed={isSaved}
                title={isSaved ? "Remove saved job" : "Save job"}
                onClick={() => onToggleSaved(job.id)}
                className={[
                  "flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg border transition",
                  isSaved
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-border bg-white text-slate-500 hover:bg-slate-50 hover:text-brand-700",
                ].join(" ")}
              >
                <Bookmark
                  aria-hidden="true"
                  className="size-4"
                  fill={isSaved ? "currentColor" : "none"}
                />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export { JobCardList };
export type { JobCardListProps };