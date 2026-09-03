import type { ReactNode } from "react";

import type {
  JobSector,
  JobType,
  WorkMode,
} from "../../types/job";

type DetailedJobFiltersValue = {
  location: string;
  jobType: JobType | "all";
  workMode: WorkMode | "all";
  sector: JobSector | "all";
  minimumMatchScore: number;
};

type DetailedJobFiltersProps = {
  value: DetailedJobFiltersValue;
  locations: string[];
  onChange: (value: DetailedJobFiltersValue) => void;
  onReset: () => void;
};

function DetailedJobFilters({
  value,
  locations,
  onChange,
  onReset,
}: DetailedJobFiltersProps) {
  function updateFilter<Key extends keyof DetailedJobFiltersValue>(
    key: Key,
    nextValue: DetailedJobFiltersValue[Key],
  ) {
    onChange({
      ...value,
      [key]: nextValue,
    });
  }

  return (
    <div className="mt-3 rounded-xl border border-border bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-950">
            Detailed filters
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Narrow jobs using specific requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 hover:text-brand-700"
        >
          Reset
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <FilterSelect
          id="location-filter"
          label="Location"
          value={value.location}
          onChange={(nextValue) =>
            updateFilter("location", nextValue)
          }
        >
          <option value="all">All locations</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          id="job-type-filter"
          label="Job type"
          value={value.jobType}
          onChange={(nextValue) =>
            updateFilter(
              "jobType",
              nextValue as DetailedJobFiltersValue["jobType"],
            )
          }
        >
          <option value="all">All job types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
        </FilterSelect>

        <FilterSelect
          id="work-mode-filter"
          label="Work mode"
          value={value.workMode}
          onChange={(nextValue) =>
            updateFilter(
              "workMode",
              nextValue as DetailedJobFiltersValue["workMode"],
            )
          }
        >
          <option value="all">All work modes</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </FilterSelect>

        <FilterSelect
          id="sector-filter"
          label="Sector"
          value={value.sector}
          onChange={(nextValue) =>
            updateFilter(
              "sector",
              nextValue as DetailedJobFiltersValue["sector"],
            )
          }
        >
          <option value="all">All sectors</option>
          <option value="Private">Private</option>
          <option value="Government">Government</option>
          <option value="Nonprofit">Nonprofit</option>
        </FilterSelect>

        <FilterSelect
          id="score-filter"
          label="Minimum match"
          value={String(value.minimumMatchScore)}
          onChange={(nextValue) =>
            updateFilter("minimumMatchScore", Number(nextValue))
          }
        >
          <option value="0">Any score</option>
          <option value="60">60% or higher</option>
          <option value="75">75% or higher</option>
          <option value="90">90% or higher</option>
        </FilterSelect>
      </div>
    </div>
  );
}

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  children: ReactNode;
  onChange: (value: string) => void;
};

function FilterSelect({
  id,
  label,
  value,
  children,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
      >
        {children}
      </select>
    </div>
  );
}

export { DetailedJobFilters };
export type {
  DetailedJobFiltersProps,
  DetailedJobFiltersValue,
};