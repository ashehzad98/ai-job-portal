import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Plus,
  Save,
  X,
} from "lucide-react";
import type { PreferencesDraft } from "../../context/preferencesContext";
import { usePreferences } from "../../hooks/usePreferences";
import type { JobType, WorkMode } from "../../types/job";
import type {
  PreferenceSector,
  SalaryCurrency,
  SalaryPeriod,
} from "../../types/preferences";

const workModeOptions: Array<{
  value: WorkMode;
  label: string;
}> = [
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "On-site", label: "On-site" },
];

const jobTypeOptions: Array<{
  value: JobType;
  label: string;
}> = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

const sectorOptions: Array<{
  value: PreferenceSector;
  label: string;
}> = [
  { value: "Private", label: "Private sector" },
  { value: "Government", label: "Government sector" },
];

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

interface PreferenceSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

function PreferenceSection({
  title,
  description,
  children,
}: PreferenceSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

interface CheckboxOptionProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

function CheckboxOption({
  checked,
  label,
  onChange,
}: CheckboxOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-indigo-600"
      />

      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
    </label>
  );
}

export default function PreferencesPage() {
  const { preferences, updatePreferences } = usePreferences();

  const [form, setForm] = useState<PreferencesDraft>(() => ({
    preferredTitles: [...preferences.preferredTitles],
    preferredLocations: [...preferences.preferredLocations],
    workModes: [...preferences.workModes],
    jobTypes: [...preferences.jobTypes],
    sectors: [...preferences.sectors],
    minimumSalary: preferences.minimumSalary,
    salaryCurrency: preferences.salaryCurrency,
    salaryPeriod: preferences.salaryPeriod,
    includeUnspecifiedSalary:
      preferences.includeUnspecifiedSalary,
  }));

  const [titleInput, setTitleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function clearMessages() {
    setError("");
    setSuccessMessage("");
  }

function addTitle() {
  const title = titleInput.trim();

  if (!title) {
    setError("Enter a job title before adding it.");
    return;
  }

  const normalizedTitle = title
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const alreadyExists = form.preferredTitles.some(
    (item) => item.normalizedTitle === normalizedTitle,
  );

  if (alreadyExists) {
    setError("That target role has already been added.");
    return;
  }

  setForm((currentForm) => ({
    ...currentForm,
    preferredTitles: [
      ...currentForm.preferredTitles,
      {
        id: crypto.randomUUID(),
        title,
        normalizedTitle,
      },
    ],
  }));

  setTitleInput("");
  clearMessages();
}

  function removeTitle(id: string) {
    setForm((currentForm) => ({
      ...currentForm,
      preferredTitles: currentForm.preferredTitles.filter(
        (item) => item.id !== id,
      ),
    }));

    clearMessages();
  }

  function addLocation() {
    const location = locationInput.trim();

    if (!location) {
      setError("Enter a location before adding it.");
      return;
    }

    const alreadyExists = form.preferredLocations.some(
      (item) =>
        item.label.toLowerCase() === location.toLowerCase(),
    );

    if (alreadyExists) {
      setError("That location has already been added.");
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      preferredLocations: [
        ...currentForm.preferredLocations,
        {
          id: crypto.randomUUID(),
          label: location,
          city: location,
          region: null,
          countryCode: "PK",
        },
      ],
    }));

    setLocationInput("");
    clearMessages();
  }

  function removeLocation(id: string) {
    setForm((currentForm) => ({
      ...currentForm,
      preferredLocations:
        currentForm.preferredLocations.filter(
          (item) => item.id !== id,
        ),
    }));

    clearMessages();
  }

  function toggleWorkMode(workMode: WorkMode) {
    setForm((currentForm) => ({
      ...currentForm,
      workModes: toggleValue(
        currentForm.workModes,
        workMode,
      ),
    }));

    clearMessages();
  }

  function toggleJobType(jobType: JobType) {
    setForm((currentForm) => ({
      ...currentForm,
      jobTypes: toggleValue(
        currentForm.jobTypes,
        jobType,
      ),
    }));

    clearMessages();
  }

  function toggleSector(sector: PreferenceSector) {
    setForm((currentForm) => ({
      ...currentForm,
      sectors: toggleValue(
        currentForm.sectors,
        sector,
      ),
    }));

    clearMessages();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.preferredTitles.length === 0) {
      setError("Add at least one target role.");
      setSuccessMessage("");
      return;
    }

    if (
      form.preferredLocations.length === 0 &&
      !form.workModes.includes("Remote")
    ) {
      setError(
        "Add at least one preferred location or select Remote.",
      );
      setSuccessMessage("");
      return;
    }

    if (form.workModes.length === 0) {
      setError("Select at least one work mode.");
      setSuccessMessage("");
      return;
    }

    if (form.jobTypes.length === 0) {
      setError("Select at least one employment type.");
      setSuccessMessage("");
      return;
    }

    if (form.sectors.length === 0) {
      setError("Select at least one sector.");
      setSuccessMessage("");
      return;
    }

    if (
      form.minimumSalary !== null &&
      form.minimumSalary < 0
    ) {
      setError("Minimum salary cannot be negative.");
      setSuccessMessage("");
      return;
    }

    updatePreferences(form);

    setError("");
    setSuccessMessage(
      "Preferences saved. Job matches will reflect these changes on the next refresh.",
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/profile"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft size={17} />
        Back to profile
      </Link>

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Job matching
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Job preferences
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Tell us what kind of opportunities you want to see.
          These settings will later be used by the matching system.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PreferenceSection
          title="Target roles"
          description="Add the job titles you are currently looking for."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <BriefcaseBusiness
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={titleInput}
                onChange={(event) =>
                  setTitleInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTitle();
                  }
                }}
                placeholder="Example: Frontend Developer"
                className="form-control pl-10"
              />
            </div>

            <button
              type="button"
              onClick={addTitle}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Plus size={17} />
              Add role
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {form.preferredTitles.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700"
              >
                {item.title}

                <button
                  type="button"
                  onClick={() => removeTitle(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="rounded-full hover:text-indigo-950"
                >
                  <X size={15} />
                </button>
              </span>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          title="Preferred locations"
          description="Add cities or regions where you would like to work."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={locationInput}
                onChange={(event) =>
                  setLocationInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addLocation();
                  }
                }}
                placeholder="Example: Islamabad"
                className="form-control pl-10"
              />
            </div>

            <button
              type="button"
              onClick={addLocation}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Plus size={17} />
              Add location
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {form.preferredLocations.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                {item.label}

                <button
                  type="button"
                  onClick={() => removeLocation(item.id)}
                  aria-label={`Remove ${item.label}`}
                  className="rounded-full hover:text-emerald-950"
                >
                  <X size={15} />
                </button>
              </span>
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          title="Work arrangement"
          description="Select every work arrangement you are open to."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {workModeOptions.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={form.workModes.includes(option.value)}
                onChange={() =>
                  toggleWorkMode(option.value)
                }
              />
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          title="Employment type"
          description="Choose the types of employment you want."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {jobTypeOptions.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={form.jobTypes.includes(option.value)}
                onChange={() =>
                  toggleJobType(option.value)
                }
              />
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          title="Preferred sector"
          description="Choose whether you want private or government opportunities."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {sectorOptions.map((option) => (
              <CheckboxOption
                key={option.value}
                label={option.label}
                checked={form.sectors.includes(option.value)}
                onChange={() =>
                  toggleSector(option.value)
                }
              />
            ))}
          </div>
        </PreferenceSection>

        <PreferenceSection
          title="Salary preference"
          description="Jobs below this amount can later be excluded from matches."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Minimum salary
              </span>

              <input
                type="number"
                min="0"
                step="1000"
                value={form.minimumSalary ?? ""}
                onChange={(event) => {
                  setForm((currentForm) => ({
                    ...currentForm,
                    minimumSalary:
                      event.target.value === ""
                        ? null
                        : Number(event.target.value),
                  }));

                  clearMessages();
                }}
                className="form-control"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Currency
              </span>

              <select
                value={form.salaryCurrency}
                onChange={(event) => {
                  setForm((currentForm) => ({
                    ...currentForm,
                    salaryCurrency:
                      event.target.value as SalaryCurrency,
                  }));

                  clearMessages();
                }}
                className="form-control"
              >
                <option value="PKR">PKR</option>
                <option value="USD">USD</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Salary period
              </span>

              <select
                value={form.salaryPeriod}
                onChange={(event) => {
                  setForm((currentForm) => ({
                    ...currentForm,
                    salaryPeriod:
                      event.target.value as SalaryPeriod,
                  }));

                  clearMessages();
                }}
                className="form-control"
              >
                <option value="month">Per month</option>
                <option value="year">Per year</option>
              </select>
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.includeUnspecifiedSalary}
              onChange={(event) => {
                setForm((currentForm) => ({
                  ...currentForm,
                  includeUnspecifiedSalary:
                    event.target.checked,
                }));

                clearMessages();
              }}
              className="mt-1 h-4 w-4 accent-indigo-600"
            />

            <span>
              <span className="block text-sm font-medium text-slate-800">
                Include jobs without salary information
              </span>

              <span className="mt-1 block text-sm text-slate-500">
                Some suitable jobs do not publish a salary
                range.
              </span>
            </span>
          </label>
        </PreferenceSection>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {successMessage && (
          <p
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            {successMessage}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Save size={18} />
            Save preferences
          </button>
        </div>
      </form>
    </div>
  );
}