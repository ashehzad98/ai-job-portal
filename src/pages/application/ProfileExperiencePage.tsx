import {
  ArrowLeft,
  BriefcaseBusiness,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import type { ExperienceInput } from "../../context/profileContext";
import { useProfile } from "../../hooks/useProfile";
import type {
  EmploymentType,
  Experience,
} from "../../types/profile";

type ExperienceFormState = {
  jobTitle: string;
  companyName: string;
  employmentType: EmploymentType | "";
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  skillsUsed: string;
};

const emptyForm: ExperienceFormState = {
  jobTitle: "",
  companyName: "",
  employmentType: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  skillsUsed: "",
};

function formatExperienceDate(dateValue: string | null) {
  if (!dateValue) {
    return "Date not provided";
  }

  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00Z`));
}

function ProfileExperiencePage() {
  const {
    profile,
    addExperience,
    updateExperience,
    removeExperience,
  } = useProfile();

  const [form, setForm] =
    useState<ExperienceFormState>(emptyForm);
  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState("");

  function updateField<Key extends keyof ExperienceFormState>(
    key: Key,
    value: ExperienceFormState[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));

    setError("");
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setIsFormOpen(true);
  }

  function openEditForm(experience: Experience) {
    setForm({
      jobTitle: experience.jobTitle,
      companyName: experience.companyName,
      employmentType: experience.employmentType ?? "",
      location: experience.location ?? "",
      startDate: experience.startDate,
      endDate: experience.endDate ?? "",
      isCurrent: experience.isCurrent,
      description: experience.description ?? "",
      skillsUsed: experience.skillsUsed.join(", "),
    });

    setEditingId(experience.id);
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setIsFormOpen(false);
  }

  function handleCurrentRoleChange(isCurrent: boolean) {
    setForm((currentForm) => ({
      ...currentForm,
      isCurrent,
      endDate: isCurrent ? "" : currentForm.endDate,
    }));

    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      form.jobTitle.trim().length < 2 ||
      form.companyName.trim().length < 2
    ) {
      setError("Job title and company name are required.");
      return;
    }

    if (!form.startDate) {
      setError("Start date is required.");
      return;
    }

    if (!form.isCurrent && !form.endDate) {
      setError(
        "Enter an end date or mark this as your current role.",
      );
      return;
    }

    if (
      !form.isCurrent &&
      form.endDate < form.startDate
    ) {
      setError(
        "End date cannot be earlier than the start date.",
      );
      return;
    }

    const skillsUsed = form.skillsUsed
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const experience: ExperienceInput = {
      jobTitle: form.jobTitle.trim(),
      companyName: form.companyName.trim(),
      employmentType: form.employmentType || null,
      location: form.location.trim() || null,
      startDate: form.startDate,
      endDate: form.isCurrent ? null : form.endDate,
      isCurrent: form.isCurrent,
      description: form.description.trim() || null,
      skillsUsed,
    };

    if (editingId) {
      updateExperience(editingId, experience);
    } else {
      addExperience(experience);
    }

    closeForm();
  }

  function handleRemove(experience: Experience) {
    const shouldRemove = window.confirm(
      `Remove ${experience.jobTitle} at ${experience.companyName}?`,
    );

    if (shouldRemove) {
      removeExperience(experience.id);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to profile
      </Link>

      <header className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Experience
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add professional experience used when matching jobs.
          </p>
        </div>

        {!isFormOpen && (
          <Button type="button" onClick={openAddForm}>
            <Plus aria-hidden="true" className="mr-2 size-4" />
            Add experience
          </Button>
        )}
      </header>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-brand-200 bg-white p-5 shadow-card sm:p-6"
        >
          <h2 className="text-lg font-bold text-slate-950">
            {editingId ? "Edit experience" : "Add experience"}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Input
              label="Job title"
              value={form.jobTitle}
              onChange={(event) =>
                updateField("jobTitle", event.target.value)
              }
              placeholder="Flutter Developer Intern"
              required
            />

            <Input
              label="Company"
              value={form.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
              placeholder="Company name"
              required
            />

            <div>
              <label
                htmlFor="employment-type"
                className="block text-sm font-semibold text-slate-700"
              >
                Employment type
              </label>

              <select
                id="employment-type"
                value={form.employmentType}
                onChange={(event) =>
                  updateField(
                    "employmentType",
                    event.target.value as EmploymentType | "",
                  )
                }
                className="form-control mt-2"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <Input
              label="Location"
              value={form.location}
              onChange={(event) =>
                updateField("location", event.target.value)
              }
              placeholder="Remote or city"
            />

            <Input
              type="date"
              label="Start date"
              value={form.startDate}
              onChange={(event) =>
                updateField("startDate", event.target.value)
              }
              required
            />

            <Input
              type="date"
              label="End date"
              value={form.endDate}
              onChange={(event) =>
                updateField("endDate", event.target.value)
              }
              disabled={form.isCurrent}
            />

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={(event) =>
                    handleCurrentRoleChange(event.target.checked)
                  }
                  className="mt-1 size-4 accent-brand-600"
                />

                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    I currently work here
                  </span>

                  <span className="mt-1 block text-xs text-slate-500">
                    Current roles do not require an end date.
                  </span>
                </span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="experience-description"
                className="block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="experience-description"
                rows={5}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe your responsibilities and achievements."
                className="form-control mt-2 resize-y"
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label="Skills used"
                value={form.skillsUsed}
                onChange={(event) =>
                  updateField("skillsUsed", event.target.value)
                }
                placeholder="Flutter, Dart, BLoC, REST APIs"
                helperText="Separate skills with commas."
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={closeForm}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingId ? "Save changes" : "Add experience"}
            </Button>
          </div>
        </form>
      )}

      <section aria-label="Experience entries" className="mt-6 space-y-4">
        {profile.experience.length > 0 ? (
          profile.experience.map((experience) => (
            <article
              key={experience.id}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <BriefcaseBusiness
                      aria-hidden="true"
                      className="size-5"
                    />
                  </span>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      {experience.jobTitle}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {experience.companyName}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {formatExperienceDate(experience.startDate)}
                      {" – "}
                      {experience.isCurrent
                        ? "Present"
                        : formatExperienceDate(
                            experience.endDate,
                          )}
                      {experience.employmentType
                        ? ` · ${experience.employmentType}`
                        : ""}
                    </p>

                    {experience.location && (
                      <p className="mt-1 text-sm text-slate-500">
                        {experience.location}
                      </p>
                    )}

                    {experience.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                        {experience.description}
                      </p>
                    )}

                    {experience.skillsUsed.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {experience.skillsUsed.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => openEditForm(experience)}
                  >
                    <Pencil
                      aria-hidden="true"
                      className="mr-2 size-4"
                    />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemove(experience)}
                    className="text-danger hover:bg-red-50"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="mr-2 size-4"
                    />
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <BriefcaseBusiness
              aria-hidden="true"
              className="mx-auto size-7 text-slate-400"
            />

            <h2 className="mt-4 font-bold text-slate-950">
              No experience added
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Experience is optional. Fresh candidates can still use
              the job portal.
            </p>

            <Button
              type="button"
              onClick={openAddForm}
              className="mt-5"
            >
              Add experience
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfileExperiencePage;