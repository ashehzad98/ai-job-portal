import {
  ArrowLeft,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import type { EducationInput } from "../../context/profileContext";
import { useProfile } from "../../hooks/useProfile";
import type {
  Education,
  EducationStatus,
} from "../../types/profile";

type EducationFormState = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  status: EducationStatus;
  startDate: string;
  graduationDate: string;
  grade: string;
};

const emptyForm: EducationFormState = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  status: "in_progress",
  startDate: "",
  graduationDate: "",
  grade: "",
};

function formatEducationDate(dateValue: string | null) {
  if (!dateValue) {
    return "Date not provided";
  }

  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00Z`));
}

function ProfileEducationPage() {
  const {
    profile,
    addEducation,
    updateEducation,
    removeEducation,
  } = useProfile();

  const [form, setForm] =
    useState<EducationFormState>(emptyForm);
  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState("");

  function updateField<Key extends keyof EducationFormState>(
    key: Key,
    value: EducationFormState[Key],
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

  function openEditForm(education: Education) {
    setForm({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy ?? "",
      status: education.status,
      startDate: education.startDate ?? "",
      graduationDate: education.graduationDate ?? "",
      grade: education.grade ?? "",
    });

    setEditingId(education.id);
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setIsFormOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      form.institution.trim().length < 2 ||
      form.degree.trim().length < 2
    ) {
      setError("Institution and degree are required.");
      return;
    }

    if (
      form.startDate &&
      form.graduationDate &&
      form.graduationDate < form.startDate
    ) {
      setError(
        "Graduation date cannot be earlier than the start date.",
      );
      return;
    }

    const education: EducationInput = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim() || null,
      status: form.status,
      startDate: form.startDate || null,
      graduationDate: form.graduationDate || null,
      grade: form.grade.trim() || null,
    };

    if (editingId) {
      updateEducation(editingId, education);
    } else {
      addEducation(education);
    }

    closeForm();
  }

  function handleRemove(education: Education) {
    const shouldRemove = window.confirm(
      `Remove ${education.degree} from your profile?`,
    );

    if (shouldRemove) {
      removeEducation(education.id);
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
            Education
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add degrees and qualifications used when matching jobs.
          </p>
        </div>

        {!isFormOpen && (
          <Button type="button" onClick={openAddForm}>
            <Plus aria-hidden="true" className="mr-2 size-4" />
            Add education
          </Button>
        )}
      </header>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-brand-200 bg-white p-5 shadow-card sm:p-6"
        >
          <h2 className="text-lg font-bold text-slate-950">
            {editingId ? "Edit education" : "Add education"}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Institution"
                value={form.institution}
                onChange={(event) =>
                  updateField("institution", event.target.value)
                }
                placeholder="Virtual University of Pakistan"
                required
              />
            </div>

            <Input
              label="Degree"
              value={form.degree}
              onChange={(event) =>
                updateField("degree", event.target.value)
              }
              placeholder="Bachelor of Science"
              required
            />

            <Input
              label="Field of study"
              value={form.fieldOfStudy}
              onChange={(event) =>
                updateField("fieldOfStudy", event.target.value)
              }
              placeholder="Computer Science"
            />

            <div>
              <label
                htmlFor="education-status"
                className="block text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="education-status"
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value as EducationStatus,
                  )
                }
                className="form-control mt-2"
              >
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Input
              type="text"
              label="Grade or CGPA"
              value={form.grade}
              onChange={(event) =>
                updateField("grade", event.target.value)
              }
              placeholder="Optional"
            />

            <Input
              type="date"
              label="Start date"
              value={form.startDate}
              onChange={(event) =>
                updateField("startDate", event.target.value)
              }
            />

            <Input
              type="date"
              label={
                form.status === "in_progress"
                  ? "Expected graduation"
                  : "Graduation date"
              }
              value={form.graduationDate}
              onChange={(event) =>
                updateField(
                  "graduationDate",
                  event.target.value,
                )
              }
            />
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
              {editingId ? "Save changes" : "Add education"}
            </Button>
          </div>
        </form>
      )}

      <section aria-label="Education entries" className="mt-6 space-y-4">
        {profile.education.length > 0 ? (
          profile.education.map((education) => (
            <article
              key={education.id}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <GraduationCap
                      aria-hidden="true"
                      className="size-5"
                    />
                  </span>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      {education.degree}
                      {education.fieldOfStudy
                        ? ` in ${education.fieldOfStudy}`
                        : ""}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {education.institution}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {formatEducationDate(education.startDate)}
                      {" – "}
                      {formatEducationDate(
                        education.graduationDate,
                      )}
                    </p>

                    {education.grade && (
                      <p className="mt-1 text-sm text-slate-500">
                        Grade: {education.grade}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => openEditForm(education)}
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
                    onClick={() => handleRemove(education)}
                    className="text-danger hover:bg-red-50 hover:text-red-700"
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
            <GraduationCap
              aria-hidden="true"
              className="mx-auto size-7 text-slate-400"
            />

            <h2 className="mt-4 font-bold text-slate-950">
              No education added
            </h2>

            <Button
              type="button"
              onClick={openAddForm}
              className="mt-5"
            >
              Add education
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfileEducationPage;