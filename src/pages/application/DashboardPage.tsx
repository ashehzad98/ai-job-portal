import { DashboardSummary } from "../../components/dashboard/DashboardSummary";

const mockDashboardData = {
  firstName: "First Name",
  totalMatches: 24,
  newMatches: 3,
  savedJobs: 6,
  applications: 4,
};

function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardSummary
        firstName={mockDashboardData.firstName}
        totalMatches={mockDashboardData.totalMatches}
        newMatches={mockDashboardData.newMatches}
        savedJobs={mockDashboardData.savedJobs}
        applications={mockDashboardData.applications}
      />

      <section
        id="jobs-for-you"
        aria-labelledby="jobs-heading"
        className="mt-8 scroll-mt-36"
      >
        <div>
          <h2
            id="jobs-heading"
            className="text-2xl font-bold tracking-tight text-slate-950"
          >
            Jobs for you
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Personalized opportunities will appear here.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            The job feed will be built in the next step.
          </p>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;