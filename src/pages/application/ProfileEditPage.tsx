import { ArrowLeft } from "lucide-react";
import {
  useState,
  type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, ButtonLink } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useProfile } from "../../hooks/useProfile";

type ProfileFormState = {
  fullName: string;
  professionalHeadline: string;
  currentLocation: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  about: string;
};

function ProfileEditPage() {
  const navigate = useNavigate();
  const { profile, updateBasicInfo } = useProfile();

  const [form, setForm] = useState<ProfileFormState>({
    fullName: profile.fullName,
    professionalHeadline: profile.professionalHeadline ?? "",
    currentLocation: profile.currentLocation ?? "",
    phone: profile.phone ?? "",
    linkedinUrl: profile.linkedinUrl ?? "",
    portfolioUrl: profile.portfolioUrl ?? "",
    about: profile.about ?? "",
  });

  const [fullNameError, setFullNameError] = useState("");

  function updateField<Key extends keyof ProfileFormState>(
    key: Key,
    value: ProfileFormState[Key],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));

    if (key === "fullName") {
      setFullNameError("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fullName = form.fullName.trim();

    if (fullName.length < 2) {
      setFullNameError(
        "Enter your full name using at least 2 characters.",
      );
      return;
    }

    updateBasicInfo({
      fullName,
      professionalHeadline:
        form.professionalHeadline.trim() || null,
      currentLocation: form.currentLocation.trim() || null,
      phone: form.phone.trim() || null,
      linkedinUrl: form.linkedinUrl.trim() || null,
      portfolioUrl: form.portfolioUrl.trim() || null,
      about: form.about.trim() || null,
    });

    navigate("/profile");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to profile
      </Link>

      <header className="mt-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Edit basic information
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Keep this information accurate so job matching can understand
          your professional background.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              id="profile-full-name"
              label="Full name"
              value={form.fullName}
              onChange={(event) =>
                updateField("fullName", event.target.value)
              }
              autoComplete="name"
              error={fullNameError}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              id="professional-headline"
              label="Professional headline"
              value={form.professionalHeadline}
              onChange={(event) =>
                updateField(
                  "professionalHeadline",
                  event.target.value,
                )
              }
              placeholder="Junior Software Developer"
              maxLength={200}
            />
          </div>

          <Input
            id="current-location"
            label="Current location"
            value={form.currentLocation}
            onChange={(event) =>
              updateField("currentLocation", event.target.value)
            }
            placeholder="Mianwali, Punjab, Pakistan"
            autoComplete="address-level2"
          />

          <Input
            id="phone"
            type="tel"
            label="Phone"
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            placeholder="+92 300 0000000"
            autoComplete="tel"
          />

          <Input
            id="linkedin-url"
            type="url"
            label="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={(event) =>
              updateField("linkedinUrl", event.target.value)
            }
            placeholder="https://linkedin.com/in/username"
          />

          <Input
            id="portfolio-url"
            type="url"
            label="Portfolio or GitHub URL"
            value={form.portfolioUrl}
            onChange={(event) =>
              updateField("portfolioUrl", event.target.value)
            }
            placeholder="https://github.com/username"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="profile-about"
            className="block text-sm font-semibold text-slate-700"
          >
            About
          </label>

          <textarea
            id="profile-about"
            rows={6}
            maxLength={1200}
            value={form.about}
            onChange={(event) =>
              updateField("about", event.target.value)
            }
            placeholder="Briefly describe your experience, strengths, and career direction."
            className="form-control mt-2 resize-y"
          />

          <p className="mt-1.5 text-right text-xs text-slate-500">
            {form.about.length}/1200
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <ButtonLink
            to="/profile"
            variant="secondary"
            className="sm:min-w-24"
          >
            Cancel
          </ButtonLink>

          <Button type="submit" className="sm:min-w-32">
            Save changes
          </Button>
        </div>
      </form>
    </main>
  );
}

export default ProfileEditPage;