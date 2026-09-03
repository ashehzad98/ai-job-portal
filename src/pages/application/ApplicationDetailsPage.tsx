import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
} from "lucide-react";
import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { mockJobs } from "../../data/mockJobs";
import { useApplications } from "../../hooks/useApplications";
import {
  applicationStatusOptions,
  type ApplicationStatus,
  type JobApplication,
} from "../../types/application";
import type { Job } from "../../types/job";

type ApplicationFormState = {
  status: ApplicationStatus;
  appliedAt: string;
  nextAction: string;
  nextActionAt: string;
  notes: string;
};

function toDateInputValue(dateValue: string | null) {
  return dateValue ? dateValue.slice(0, 10) : "";
}

function toIsoDate(dateValue: string) {
  return dateValue ? `${dateValue}T00:00:00Z` : null;
}

function ApplicationDetailsPage() {
  const { applicationId } = useParams();
  const { applications, updateApplication } = useApplications();

  const application = applications.find(
    (item) => item.id === applicationId,
  );

  const job = mockJobs.find(
    (item) => item.id === application?.jobId,
  );

  if (!application) {
    return <ApplicationNotFound />;
  }

  return (
    <ApplicationDetailsForm
      key={application.id}
      application={application}
      job={job}
      onSave={(update) =>
        updateApplication(application.id, update)
      }
    />
  );
}

type ApplicationDetailsFormProps = {
  application: JobApplication;
  job: Job | undefined;
  onSave: (
    update: Partial<
      Pick<
        JobApplication,
        | "status"
        | "appliedAt"
        | "nextAction"
        | "nextActionAt"
        | "notes"
      >
    >,
  ) => void;
};

function ApplicationDetailsForm({
  application,
  job,
  onSave,
}: ApplicationDetailsFormProps) {
  const [form, setForm] = useState<ApplicationFormState>({
    status: application.status,
    appliedAt: toDateInputValue(application.appliedAt),
    nextAction: application.nextAction ?? "",
    nextActionAt: toDateInputValue(application.nextActionAt),
    notes: application.notes,
  });

  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function updateField<Key extends keyof ApplicationFormState>(
    key: Key,
    value: ApplicationFormState[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));

    setError("");
    setSavedMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.status !== "Saved" && !form.appliedAt) {
      setError("Enter the date when you applied.");
      return;
    }

    onSave({
      status: form.status,
      appliedAt: toIsoDate(form.appliedAt),
      nextAction: form.nextAction.trim() || null,
      nextActionAt: toIsoDate(form.nextActionAt),
      notes: form.notes.trim(),
    });

    setSavedMessage("Application changes saved.");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        to="/applications"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to applications
      </Link>

      <header className="mt-5 rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <BriefcaseBusiness
              aria-hidden="true"
              className="size-6"
            />
          </span>

          <div>
            <p className="text-sm font-semibold text-brand-600">
              Application details
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              {job?.title ?? "Unavailable job"}
            </h1>

            <p className="mt-1 text-slate-600">
              {job?.company ?? "Unknown company"}
            </p>

            {job && (
              <Link
                to={`/jobs/${job.id}`}
                className="mt-3 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View job details
              </Link>
            )}
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Status" htmlFor="application-status">
            <select
              id="application-status"
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as ApplicationStatus,
                )
              }
              className="form-control"
            >
              {applicationStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Applied date" htmlFor="applied-date">
            <input
              id="applied-date"
              type="date"
              value={form.appliedAt}
              onChange={(event) =>
                updateField("appliedAt", event.target.value)
              }
              className="form-control"
            />
          </FormField>

          <FormField label="Next action" htmlFor="next-action">
            <input
              id="next-action"
              type="text"
              value={form.nextAction}
              onChange={(event) =>
                updateField("nextAction", event.target.value)
              }
              placeholder="For example: Prepare for interview"
              className="form-control"
            />
          </FormField>

          <FormField
            label="Follow-up date"
            htmlFor="next-action-date"
          >
            <input
              id="next-action-date"
              type="date"
              value={form.nextActionAt}
              onChange={(event) =>
                updateField("nextActionAt", event.target.value)
              }
              className="form-control"
            />
          </FormField>
        </div>

        <div className="mt-5">
          <FormField label="Notes" htmlFor="application-notes">
            <textarea
              id="application-notes"
              rows={6}
              value={form.notes}
              onChange={(event) =>
                updateField("notes", event.target.value)
              }
              placeholder="Add preparation notes, employer feedback, or reminders"
              className="form-control resize-y"
            />
          </FormField>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}

        {savedMessage && (
          <p
            role="status"
            className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700"
          >
            {savedMessage}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="submit">Save changes</Button>

          {job?.applicationUrl ? (
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Original job
              <ExternalLink
                aria-hidden="true"
                className="ml-2 size-4"
              />
            </a>
          ) : (
            <span className="text-sm text-slate-500">
              Original link unavailable for mock data.
            </span>
          )}
        </div>
      </form>
    </main>
  );
}

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
};

function FormField({
  label,
  htmlFor,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function ApplicationNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-950">
        Application not found
      </h1>

      <p className="mt-3 text-slate-600">
        The application may have been removed or the address is
        incorrect.
      </p>

      <Link
        to="/applications"
        className="mt-6 inline-flex font-semibold text-brand-600"
      >
        Return to applications
      </Link>
    </main>
  );
}

export default ApplicationDetailsPage;