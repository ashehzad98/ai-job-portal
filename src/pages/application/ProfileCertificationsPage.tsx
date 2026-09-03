import {
  ArrowLeft,
  Award,
  ExternalLink,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import type { CertificationInput } from "../../context/profileContext";
import { useProfile } from "../../hooks/useProfile";
import type { Certification } from "../../types/profile";

type CertificationFormState = {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  credentialUrl: string;
};

const emptyForm: CertificationFormState = {
  name: "",
  issuer: "",
  issueDate: "",
  expirationDate: "",
  credentialUrl: "",
};

function formatCertificationDate(dateValue: string | null) {
  if (!dateValue) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat("en-PK", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00Z`));
}

function ProfileCertificationsPage() {
  const {
    profile,
    addCertification,
    updateCertification,
    removeCertification,
  } = useProfile();

  const [form, setForm] =
    useState<CertificationFormState>(emptyForm);
  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState("");

  function updateField<Key extends keyof CertificationFormState>(
    key: Key,
    value: CertificationFormState[Key],
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

  function openEditForm(certification: Certification) {
    setForm({
      name: certification.name,
      issuer: certification.issuer,
      issueDate: certification.issueDate ?? "",
      expirationDate: certification.expirationDate ?? "",
      credentialUrl: certification.credentialUrl ?? "",
    });

    setEditingId(certification.id);
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
      form.name.trim().length < 2 ||
      form.issuer.trim().length < 2
    ) {
      setError(
        "Certification name and issuing organization are required.",
      );
      return;
    }

    if (
      form.issueDate &&
      form.expirationDate &&
      form.expirationDate < form.issueDate
    ) {
      setError(
        "Expiration date cannot be earlier than the issue date.",
      );
      return;
    }

    const certification: CertificationInput = {
      name: form.name.trim(),
      issuer: form.issuer.trim(),
      issueDate: form.issueDate || null,
      expirationDate: form.expirationDate || null,
      credentialUrl: form.credentialUrl.trim() || null,
    };

    if (editingId) {
      updateCertification(editingId, certification);
    } else {
      addCertification(certification);
    }

    closeForm();
  }

  function handleRemove(certification: Certification) {
    const shouldRemove = window.confirm(
      `Remove ${certification.name} from your profile?`,
    );

    if (shouldRemove) {
      removeCertification(certification.id);
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
            Certifications
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add certifications that support your qualifications.
          </p>
        </div>

        {!isFormOpen && (
          <Button type="button" onClick={openAddForm}>
            <Plus aria-hidden="true" className="mr-2 size-4" />
            Add certification
          </Button>
        )}
      </header>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-brand-200 bg-white p-5 shadow-card sm:p-6"
        >
          <h2 className="text-lg font-bold text-slate-950">
            {editingId
              ? "Edit certification"
              : "Add certification"}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Input
              label="Certification name"
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="Mobile Application Development"
              required
            />

            <Input
              label="Issuing organization"
              value={form.issuer}
              onChange={(event) =>
                updateField("issuer", event.target.value)
              }
              placeholder="Issuing organization"
              required
            />

            <Input
              type="date"
              label="Issue date"
              value={form.issueDate}
              onChange={(event) =>
                updateField("issueDate", event.target.value)
              }
            />

            <Input
              type="date"
              label="Expiration date"
              value={form.expirationDate}
              onChange={(event) =>
                updateField(
                  "expirationDate",
                  event.target.value,
                )
              }
              helperText="Leave empty if it does not expire."
            />

            <div className="sm:col-span-2">
              <Input
                type="url"
                label="Credential URL"
                value={form.credentialUrl}
                onChange={(event) =>
                  updateField(
                    "credentialUrl",
                    event.target.value,
                  )
                }
                placeholder="https://example.com/credential"
                helperText="Optional link used to verify the credential."
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
              {editingId
                ? "Save changes"
                : "Add certification"}
            </Button>
          </div>
        </form>
      )}

      <section
        aria-label="Certification entries"
        className="mt-6 space-y-4"
      >
        {profile.certifications.length > 0 ? (
          profile.certifications.map((certification) => (
            <article
              key={certification.id}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Award
                      aria-hidden="true"
                      className="size-5"
                    />
                  </span>

                  <div>
                    <h2 className="font-bold text-slate-950">
                      {certification.name}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {certification.issuer}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Issued{" "}
                      {formatCertificationDate(
                        certification.issueDate,
                      )}

                      {certification.expirationDate &&
                        ` · Expires ${formatCertificationDate(
                          certification.expirationDate,
                        )}`}
                    </p>

                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                      >
                        View credential
                        <ExternalLink
                          aria-hidden="true"
                          className="size-4"
                        />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      openEditForm(certification)
                    }
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
                    onClick={() =>
                      handleRemove(certification)
                    }
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
            <Award
              aria-hidden="true"
              className="mx-auto size-7 text-slate-400"
            />

            <h2 className="mt-4 font-bold text-slate-950">
              No certifications added
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Certifications are optional and do not prevent profile
              completion.
            </p>

            <Button
              type="button"
              onClick={openAddForm}
              className="mt-5"
            >
              Add certification
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfileCertificationsPage;