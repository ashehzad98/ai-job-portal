import {
  Bookmark,
  BriefcaseBusiness,
  ClipboardList,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../ui/Button";

type DashboardSummaryProps = {
  firstName: string;
  totalMatches: number;
  newMatches: number;
  savedJobs: number;
  applications: number;
};

type SummaryCardProps = {
  label: string;
  value: number;
  description: string;
  path: string;
  icon: LucideIcon;
};

function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning";
  }

  if (currentHour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function DashboardSummary({
  firstName,
  totalMatches,
  newMatches,
  savedJobs,
  applications,
}: DashboardSummaryProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("10 minutes ago");

  function handleRefresh() {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    // Temporary UI simulation. Replace with the jobs API later.
    window.setTimeout(() => {
      setLastUpdated("Just now");
      setIsRefreshing(false);
    }, 800);
  }

  return (
    <section aria-labelledby="dashboard-heading">
      <div className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-brand-600">
              {newMatches} new {newMatches === 1 ? "match" : "matches"}
            </p>

            <h1
              id="dashboard-heading"
              className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              {getGreeting()}, {firstName}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              You have{" "}
              <span className="font-semibold text-slate-900">
                {totalMatches} matching jobs
              </span>
              . Last updated {lastUpdated}.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleRefresh}
            isLoading={isRefreshing}
            className="shrink-0"
          >
            {!isRefreshing && (
              <RefreshCw aria-hidden="true" className="mr-2 size-4" />
            )}

            {isRefreshing ? "Finding jobs..." : "Find new jobs"}
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Job matches"
          value={totalMatches}
          description={`${newMatches} new since your last visit`}
          path="/dashboard#jobs-for-you"
          icon={BriefcaseBusiness}
        />

        <SummaryCard
          label="Saved jobs"
          value={savedJobs}
          description="Review jobs saved for later"
          path="/saved-jobs"
          icon={Bookmark}
        />

        <SummaryCard
          label="Applications"
          value={applications}
          description="Track your application progress"
          path="/applications"
          icon={ClipboardList}
        />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  description,
  path,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <Link
      to={path}
      className="group rounded-xl border border-border bg-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-600">{label}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-100">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </Link>
  );
}

export { DashboardSummary };
export type { DashboardSummaryProps };