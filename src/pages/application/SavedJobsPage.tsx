import { Bookmark, Search } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { JobCardList } from "../../components/jobs/JobCardList";
import { Button, ButtonLink } from "../../components/ui/Button";
import { useMatchedJobs } from "../../hooks/useMatchedJobs";
import { useSavedJobs } from "../../hooks/useSavedJobs";

type SavedJobSort = "recently-saved" | "best-match";

type RemovedJob = {
  id: string;
  title: string;
};

function SavedJobsPage() {
  const {
    savedJobIds,
    savedAtByJobId,
    savedCount,
    toggleSavedJob,
  } = useSavedJobs();
  const { allJobs } = useMatchedJobs();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] =
    useState<SavedJobSort>("recently-saved");
  const [removedJob, setRemovedJob] =
    useState<RemovedJob | null>(null);

  useEffect(() => {
    if (!removedJob) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRemovedJob(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [removedJob]);

  const visibleSavedJobs = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const jobs = allJobs.filter((job) => {
      const isSaved = savedJobIds.has(job.id);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        job.title.toLowerCase().includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        );

      return isSaved && matchesSearch;
    });

    return [...jobs].sort((firstJob, secondJob) => {
      if (sortOption === "best-match") {
        return secondJob.match.score - firstJob.match.score;
      }

      const firstSavedAt =
        savedAtByJobId.get(firstJob.id) ?? "";
      const secondSavedAt =
        savedAtByJobId.get(secondJob.id) ?? "";

      return secondSavedAt.localeCompare(firstSavedAt);
    });
  }, [
    allJobs,
    savedAtByJobId,
    savedJobIds,
    searchQuery,
    sortOption,
  ]);

  function handleToggleSaved(jobId: string) {
    const job = allJobs.find((item) => item.id === jobId);

    if (job && savedJobIds.has(jobId)) {
      setRemovedJob({
        id: job.id,
        title: job.title,
      });
    }

    toggleSavedJob(jobId);
  }

  function undoRemoval() {
    if (!removedJob) {
      return;
    }

    if (!savedJobIds.has(removedJob.id)) {
      toggleSavedJob(removedJob.id);
    }

    setRemovedJob(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Saved jobs
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          {savedCount} {savedCount === 1 ? "job" : "jobs"} saved for
          later review.
        </p>
      </div>

      {savedCount > 0 ? (
        <>
          <section
            aria-label="Saved job controls"
            className="mt-6 rounded-xl border border-border bg-white p-4 shadow-card"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="saved-job-search" className="sr-only">
                  Search saved jobs
                </label>

                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="saved-job-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search saved jobs"
                  className="min-h-11 w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
                />
              </div>

              <div>
                <label htmlFor="saved-job-sort" className="sr-only">
                  Sort saved jobs
                </label>

                <select
                  id="saved-job-sort"
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(
                      event.target.value as SavedJobSort,
                    )
                  }
                  className="min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-100 sm:w-auto"
                >
                  <option value="recently-saved">
                    Recently saved
                  </option>
                  <option value="best-match">Best match</option>
                </select>
              </div>
            </div>

            <p
              aria-live="polite"
              className="mt-3 text-sm font-semibold text-slate-600"
            >
              {visibleSavedJobs.length}{" "}
              {visibleSavedJobs.length === 1
                ? "result"
                : "results"}
            </p>
          </section>

          <section aria-label="Saved job results" className="mt-5">
            {visibleSavedJobs.length > 0 ? (
              <JobCardList
                jobs={visibleSavedJobs}
                savedJobIds={savedJobIds}
                savedAtByJobId={savedAtByJobId}
                onToggleSaved={handleToggleSaved}
                displayMode="always"
              />
            ) : (
              <div className="rounded-xl border border-border bg-white px-6 py-12 text-center shadow-card">
                <Search
                  aria-hidden="true"
                  className="mx-auto size-7 text-slate-400"
                />

                <h2 className="mt-4 text-lg font-bold text-slate-950">
                  No saved jobs match your search
                </h2>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSearchQuery("")}
                  className="mt-5"
                >
                  Clear search
                </Button>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="mt-8 rounded-xl border border-border bg-white px-6 py-14 text-center shadow-card">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <Bookmark aria-hidden="true" className="size-6" />
          </span>

          <h2 className="mt-4 text-xl font-bold text-slate-950">
            You haven&apos;t saved any jobs
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
            Save interesting opportunities from your personalized feed
            so you can review them later.
          </p>

          <ButtonLink to="/dashboard#jobs-for-you" className="mt-5">
            Browse matching jobs
          </ButtonLink>
        </section>
      )}

      {removedJob && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-xl bg-slate-950 px-4 py-3 text-sm text-white shadow-xl"
        >
          <p className="min-w-0 truncate">
            Removed “{removedJob.title}”
          </p>

          <button
            type="button"
            onClick={undoRemoval}
            className="shrink-0 rounded-lg px-2 py-1 font-bold text-brand-300 hover:bg-white/10"
          >
            Undo
          </button>
        </div>
      )}
    </main>
  );
}

export default SavedJobsPage;