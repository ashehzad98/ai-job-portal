import { Bookmark, Eye, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import type { Job } from "../../data/job";
import {
  formatExactDate,
  formatPostedDate,
} from "../../utils/jobDate";
import { MatchScoreBadge } from "./MatchScoreBadge";

type JobTableProps = {
  jobs: Job[];
  savedJobIds: ReadonlySet<string>;
  onToggleSaved: (jobId: string) => void;
};

function JobTable({
  jobs,
  savedJobIds,
  onToggleSaved,
}: JobTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-border bg-white shadow-card xl:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left">
          <caption className="sr-only">
            Personalized jobs matched against your profile
          </caption>

          <thead className="border-b border-border bg-slate-50">
            <tr>
              <TableHeading>Match</TableHeading>
              <TableHeading>Job</TableHeading>
              <TableHeading>Company</TableHeading>
              <TableHeading>Location</TableHeading>
              <TableHeading>Work</TableHeading>
              <TableHeading>Posted</TableHeading>
              <TableHeading>Salary</TableHeading>
              <TableHeading align="right">Actions</TableHeading>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {jobs.map((job) => {
              const isSaved = savedJobIds.has(job.id);

              return (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <TableCell>
                    <MatchScoreBadge score={job.match.score} />
                  </TableCell>

                  <TableCell>
                    <div className="max-w-xs">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="font-bold text-slate-950 transition hover:text-brand-700"
                        >
                          {job.title}
                        </Link>

                        {job.isNew && (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                            New
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.match.matchingSkills
                          .slice(0, 2)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex max-w-44 items-center gap-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                        {job.companyInitials}
                      </span>

                      <span className="font-medium text-slate-700">
                        {job.company}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <MapPin
                        aria-hidden="true"
                        className="size-4 shrink-0"
                      />
                      {job.location}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-700">
                        {job.workMode}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {job.jobType}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <time
                      dateTime={job.postedAt}
                      title={formatExactDate(job.postedAt)}
                      className="text-slate-600"
                    >
                      {formatPostedDate(job.postedAt)}
                    </time>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium text-slate-700">
                      {job.salary ?? "Not listed"}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-1">
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
                          "rounded-lg p-2 transition",
                          isSaved
                            ? "bg-brand-50 text-brand-700"
                            : "text-slate-400 hover:bg-slate-100 hover:text-slate-700",
                        ].join(" ")}
                      >
                        <Bookmark
                          aria-hidden="true"
                          className="size-4"
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>

                      <Link
                        to={`/jobs/${job.id}`}
                        aria-label={`View ${job.title}`}
                        title="View job"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-brand-700"
                      >
                        <Eye aria-hidden="true" className="size-4" />
                      </Link>
                    </div>
                  </TableCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type TableHeadingProps = {
  children: ReactNode;
  align?: "left" | "right";
};

function TableHeading({
  children,
  align = "left",
}: TableHeadingProps) {
  return (
    <th
      scope="col"
      className={[
        "px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </th>
  );
}

type TableCellProps = {
  children: ReactNode;
  align?: "left" | "right";
};

function TableCell({ children, align = "left" }: TableCellProps) {
  return (
    <td
      className={[
        "px-4 py-5 text-sm align-middle",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </td>
  );
}

export { JobTable };
export type { JobTableProps };