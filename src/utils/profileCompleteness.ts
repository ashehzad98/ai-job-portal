import type { ProfessionalProfile } from "../types/profile";

type ProfileCompleteness = {
  percentage: number;
  completedItems: number;
  totalItems: number;
  missingItems: string[];
};

function calculateProfileCompleteness(
  profile: ProfessionalProfile,
): ProfileCompleteness {
  const checks = [
    {
      label: "Full name",
      completed: profile.fullName.trim().length > 0,
    },
    {
      label: "Professional headline",
      completed:
        Boolean(profile.professionalHeadline?.trim()),
    },
    {
      label: "Current location",
      completed: Boolean(profile.currentLocation?.trim()),
    },
    {
      label: "About section",
      completed: Boolean(profile.about?.trim()),
    },
    {
      label: "Education",
      completed: profile.education.length > 0,
    },
    {
      label: "Experience",
      completed: profile.experience.length > 0,
    },
    {
      label: "Skills",
      completed: profile.skills.length > 0,
    },
    {
      label: "Certifications",
      completed: profile.certifications.length > 0,
    },
    {
      label: "Professional link",
      completed: Boolean(
        profile.linkedinUrl || profile.portfolioUrl,
      ),
    },
  ];

  const completedItems = checks.filter(
    (check) => check.completed,
  ).length;

  const missingItems = checks
    .filter((check) => !check.completed)
    .map((check) => check.label);

  return {
    completedItems,
    totalItems: checks.length,
    percentage: Math.round(
      (completedItems / checks.length) * 100,
    ),
    missingItems,
  };
}

export { calculateProfileCompleteness };
export type { ProfileCompleteness };