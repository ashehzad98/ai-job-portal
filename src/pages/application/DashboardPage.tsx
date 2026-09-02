import { useState } from "react";

import { DashboardSummary } from "../../components/dashboard/DashboardSummary";
import { JobCardList } from "../../components/jobs/JobCardList";
import { JobTable } from "../../components/jobs/JobTable";
import { mockJobs } from "../../data/mockJobs";

const mockApplicationCount = 4;

function DashboardPage() {
  const [savedJobIds, setSavedJobIds] = useState(
    () =>
      new Set(
        mockJobs
          .filter((job) => job.isSaved)
          .map((job) => job.id),
      ),
  );

  const newMatchCount = mockJobs.filter((job) => job.isNew).length;

  function toggleSavedJob(jobId: string) {
    setSavedJobIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(jobId)) {
        nextIds.delete(jobId);
      } else {
        nextIds.add(jobId);
      }

      return nextIds;
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardSummary
        firstName="Ashraf"
        totalMatches={mockJobs.length}
        newMatches={newMatchCount}
        savedJobs={savedJobIds.size}
        applications={mockApplicationCount}
      />

      <section
        id="jobs-for-you"
        aria-labelledby="jobs-heading"
        className="mt-8 scroll-mt-36"
      >
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2
              id="jobs-heading"
              className="text-2xl font-bold tracking-tight text-slate-950"
            >
              Jobs for you
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Opportunities ranked against your profile and preferences.
            </p>
          </div>

          <p className="text-sm font-semibold text-slate-600">
            {mockJobs.length} results
          </p>
        </div>

        <div className="mt-5">
          <JobTable
            jobs={mockJobs}
            savedJobIds={savedJobIds}
            onToggleSaved={toggleSavedJob}
          />

          <JobCardList
            jobs={mockJobs}
            savedJobIds={savedJobIds}
            onToggleSaved={toggleSavedJob}
          />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;