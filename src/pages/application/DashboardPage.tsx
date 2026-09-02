import { SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { DashboardSummary } from "../../components/dashboard/DashboardSummary";
import { JobCardList } from "../../components/jobs/JobCardList";
import {
  JobFeedControls,
  type JobQuickFilter,
  type JobSortOption,
} from "../../components/jobs/JobFeedControls";
import { JobTable } from "../../components/jobs/JobTable";
import { Button } from "../../components/ui/Button";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<JobQuickFilter>("all");
  const [sortOption, setSortOption] =
    useState<JobSortOption>("best-match");

  const newMatchCount = mockJobs.filter((job) => job.isNew).length;

  const visibleJobs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filteredJobs = mockJobs.filter((job) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        );

      const matchesQuickFilter =
        activeFilter === "all" ||
        (activeFilter === "remote" &&
          job.workMode === "Remote") ||
        (activeFilter === "hybrid" &&
          job.workMode === "Hybrid") ||
        (activeFilter === "government" &&
          job.sector === "Government");

      return matchesSearch && matchesQuickFilter;
    });

    return [...filteredJobs].sort((firstJob, secondJob) => {
      if (sortOption === "newest") {
        return secondJob.postedAt.localeCompare(firstJob.postedAt);
      }

      return secondJob.match.score - firstJob.match.score;
    });
  }, [activeFilter, searchQuery, sortOption]);

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

  function clearFilters() {
    setSearchQuery("");
    setActiveFilter("all");
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

        <div className="mt-5">
          <JobFeedControls
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            sortOption={sortOption}
            resultCount={visibleJobs.length}
            onSearchChange={setSearchQuery}
            onFilterChange={setActiveFilter}
            onSortChange={setSortOption}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="mt-5">
          {visibleJobs.length > 0 ? (
            <>
              <JobTable
                jobs={visibleJobs}
                savedJobIds={savedJobIds}
                onToggleSaved={toggleSavedJob}
              />

              <JobCardList
                jobs={visibleJobs}
                savedJobIds={savedJobIds}
                onToggleSaved={toggleSavedJob}
              />
            </>
          ) : (
            <div className="rounded-xl border border-border bg-white px-6 py-12 text-center shadow-card">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <SearchX aria-hidden="true" className="size-6" />
              </span>

              <h3 className="mt-4 text-lg font-bold text-slate-950">
                No matching jobs found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                Try another search term or clear the active filters to
                view more opportunities.
              </p>

              <Button
                type="button"
                variant="secondary"
                onClick={clearFilters}
                className="mt-5"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;