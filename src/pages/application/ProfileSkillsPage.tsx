import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import type { ProfileSkillInput } from "../../context/profileContext";
import { useProfile } from "../../hooks/useProfile";
import type {
  ProfileSkill,
  SkillProficiency,
} from "../../types/profile";

function ProfileSkillsPage() {
  const {
    profile,
    addSkill,
    updateSkill,
    removeSkill,
  } = useProfile();

  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] =
    useState<SkillProficiency>(null);
  const [editingId, setEditingId] =
    useState<string | null>(null);
  const [error, setError] = useState("");

  function resetForm() {
    setSkillName("");
    setProficiency(null);
    setEditingId(null);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = skillName.trim();

    if (normalizedName.length < 2) {
      setError("Enter a valid skill name.");
      return;
    }

    const duplicate = profile.skills.some(
      (skill) =>
        skill.id !== editingId &&
        skill.name.trim().toLowerCase() ===
          normalizedName.toLowerCase(),
    );

    if (duplicate) {
      setError("This skill is already in your profile.");
      return;
    }

    const skill: ProfileSkillInput = {
      name: normalizedName,
      proficiency,
    };

    if (editingId) {
      updateSkill(editingId, skill);
    } else {
      addSkill(skill);
    }

    resetForm();
  }

  function startEditing(skill: ProfileSkill) {
    setSkillName(skill.name);
    setProficiency(skill.proficiency);
    setEditingId(skill.id);
    setError("");
  }

  function handleRemove(skill: ProfileSkill) {
    const shouldRemove = window.confirm(
      `Remove ${skill.name} from your profile?`,
    );

    if (shouldRemove) {
      removeSkill(skill.id);

      if (editingId === skill.id) {
        resetForm();
      }
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

      <header className="mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Skills
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Add skills that can be compared with job requirements.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
      >
        <h2 className="text-lg font-bold text-slate-950">
          {editingId ? "Edit skill" : "Add a skill"}
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end">
          <Input
            label="Skill name"
            value={skillName}
            onChange={(event) => {
              setSkillName(event.target.value);
              setError("");
            }}
            placeholder="For example: React"
            required
          />

          <div>
            <label
              htmlFor="skill-proficiency"
              className="block text-sm font-semibold text-slate-700"
            >
              Proficiency
            </label>

            <select
              id="skill-proficiency"
              value={proficiency ?? ""}
              onChange={(event) =>
                setProficiency(
                  (event.target.value || null) as SkillProficiency,
                )
              }
              className="form-control mt-2"
            >
              <option value="">Not specified</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <Button type="submit">
            {editingId ? (
              <>
                <Pencil aria-hidden="true" className="mr-2 size-4" />
                Save
              </>
            ) : (
              <>
                <Plus aria-hidden="true" className="mr-2 size-4" />
                Add
              </>
            )}
          </Button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-4 text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            Cancel editing
          </button>
        )}
      </form>

      <section aria-labelledby="skills-list-heading" className="mt-6">
        <div className="flex items-center justify-between">
          <h2
            id="skills-list-heading"
            className="text-lg font-bold text-slate-950"
          >
            Your skills
          </h2>

          <p className="text-sm font-semibold text-slate-500">
            {profile.skills.length}{" "}
            {profile.skills.length === 1 ? "skill" : "skills"}
          </p>
        </div>

        {profile.skills.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {profile.skills.map((skill) => (
              <article
                key={skill.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-4 shadow-card"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Wrench
                      aria-hidden="true"
                      className="size-4"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-950">
                      {skill.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {skill.proficiency ?? "Proficiency not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label={`Edit ${skill.name}`}
                    title="Edit skill"
                    onClick={() => startEditing(skill)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                  >
                    <Pencil
                      aria-hidden="true"
                      className="size-4"
                    />
                  </button>

                  <button
                    type="button"
                    aria-label={`Remove ${skill.name}`}
                    title="Remove skill"
                    onClick={() => handleRemove(skill)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-danger"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-4"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <Wrench
              aria-hidden="true"
              className="mx-auto size-7 text-slate-400"
            />

            <h2 className="mt-4 font-bold text-slate-950">
              No skills added
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              At least one skill is required for job matching.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfileSkillsPage;