import { BriefcaseBusiness } from "lucide-react";
import { DashboardSummary } from "../../components/dashboard/DashboardSummary";
import { JobTable } from "../../components/jobs/JobTable";
import { mockJobs } from "../../data/mockJobs";

const mockApplicationCount = 4;

function DashboardPage() {
  const newMatchCount = mockJobs.filter((job) => job.isNew).length;
  const savedJobCount = mockJobs.filter((job) => job.isSaved).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardSummary
        firstName="First Name"
        totalMatches={mockJobs.length}
        newMatches={newMatchCount}
        savedJobs={savedJobCount}
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
          <JobTable jobs={mockJobs} />

          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center xl:hidden">
            <BriefcaseBusiness
              aria-hidden="true"
              className="mx-auto size-6 text-slate-400"
            />

            <p className="mt-3 text-sm text-slate-500">
              The responsive job cards will be added in the next step.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;