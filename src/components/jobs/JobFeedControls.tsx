import { Search, SlidersHorizontal, X } from "lucide-react";

type JobQuickFilter = "all" | "remote" | "hybrid" | "government";

type JobSortOption = "best-match" | "newest";

type JobFeedControlsProps = {
  searchQuery: string;
  activeFilter: JobQuickFilter;
  sortOption: JobSortOption;
  resultCount: number;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: JobQuickFilter) => void;
  onSortChange: (sort: JobSortOption) => void;
  onClearFilters: () => void;
};

const quickFilters: Array<{
  label: string;
  value: JobQuickFilter;
}> = [
  { label: "All", value: "all" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Government", value: "government" },
];

function JobFeedControls({
  searchQuery,
  activeFilter,
  sortOption,
  resultCount,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onClearFilters,
}: JobFeedControlsProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 || activeFilter !== "all";

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-card">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>

          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          />

          <input
            id="job-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, company, or skill"
            className="min-h-11 w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            aria-hidden="true"
            className="hidden size-4 text-slate-400 sm:block"
          />

          <label htmlFor="job-sort" className="sr-only">
            Sort jobs
          </label>

          <select
            id="job-sort"
            value={sortOption}
            onChange={(event) =>
              onSortChange(event.target.value as JobSortOption)
            }
            className="min-h-11 flex-1 rounded-lg border border-border bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-100 lg:flex-none"
          >
            <option value="best-match">Best match</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
        <div
          aria-label="Quick job filters"
          className="flex flex-wrap gap-2"
        >
          {quickFilters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter.value)}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                  isActive
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-border bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <p
            aria-live="polite"
            className="text-sm font-semibold text-slate-600"
          >
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <X aria-hidden="true" className="size-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { JobFeedControls };
export type {
  JobFeedControlsProps,
  JobQuickFilter,
  JobSortOption,
};