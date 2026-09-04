import type {
  Job,
  JobMatch,
  MatchStatus,
} from "../types/job";
import type { JobPreferences } from "../types/preferences";
import type { ProfessionalProfile } from "../types/profile";
import { calculateWeightedMatchScore } from "./matchScore";

interface ScoredEvidence {
  score: number;
  status: MatchStatus;
}

interface SkillsResult {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateSkillsScore(
  job: Job,
  profile: ProfessionalProfile,
): SkillsResult {
  const profileSkills = new Set(
    [
      ...profile.skills.map((skill) => skill.name),
      ...profile.experience.flatMap(
        (experience) => experience.skillsUsed,
      ),
    ].map(normalizeText),
  );

  const matchingSkills = job.skills.filter((skill) =>
    profileSkills.has(normalizeText(skill)),
  );

  const missingSkills = job.skills.filter(
    (skill) =>
      !profileSkills.has(normalizeText(skill)),
  );

  if (job.skills.length === 0) {
    return {
      score: 50,
      matchingSkills: [],
      missingSkills: [],
    };
  }

  return {
    score: Math.round(
      (matchingSkills.length / job.skills.length) * 100,
    ),
    matchingSkills,
    missingSkills,
  };
}

function getExperienceMonths(
  profile: ProfessionalProfile,
): number {
  return profile.experience.reduce(
    (totalMonths, experience) => {
      const startDate = new Date(experience.startDate);

      const endDate = experience.endDate
        ? new Date(experience.endDate)
        : new Date();

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
      ) {
        return totalMonths;
      }

      const years =
        endDate.getFullYear() - startDate.getFullYear();

      const months =
        endDate.getMonth() - startDate.getMonth();

      const duration = Math.max(
        0,
        years * 12 + months,
      );

      return totalMonths + duration;
    },
    0,
  );
}

function getMinimumExperienceYears(
  requirement: string,
): number | null {
  const normalizedRequirement =
    requirement.toLowerCase();

  if (
    normalizedRequirement.includes("fresh") ||
    normalizedRequirement.includes("entry level")
  ) {
    return 0;
  }

  const numbers =
    normalizedRequirement.match(/\d+(?:\.\d+)?/g);

  if (
    !numbers ||
    !normalizedRequirement.includes("year")
  ) {
    return null;
  }

  return Number(numbers[0]);
}

function calculateExperienceScore(
  job: Job,
  profile: ProfessionalProfile,
): ScoredEvidence {
  const requiredYears = getMinimumExperienceYears(
    job.experienceRequirement,
  );

  if (requiredYears === null) {
    return {
      score: 60,
      status: "unknown",
    };
  }

  if (requiredYears === 0) {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  const experienceMonths =
    getExperienceMonths(profile);

  const requiredMonths = requiredYears * 12;

  if (experienceMonths >= requiredMonths) {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  if (experienceMonths >= requiredMonths / 2) {
    return {
      score: 70,
      status: "likely",
    };
  }

  return {
    score: 25,
    status: "not-matched",
  };
}

function calculateEducationScore(
  job: Job,
  profile: ProfessionalProfile,
): ScoredEvidence {
  const requirement = normalizeText(
    job.educationRequirement,
  );

  if (profile.education.length === 0) {
    return {
      score: 30,
      status: "unknown",
    };
  }

  const requiresBachelor =
    requirement.includes("bachelor");

  const acceptsStudent =
    requirement.includes("student");

  const matchingEducation =
    profile.education.find((education) => {
      const educationText = normalizeText(
        `${education.degree} ${education.fieldOfStudy ?? ""}`,
      );

      if (requiresBachelor) {
        return educationText.includes("bachelor");
      }

      return true;
    });

  if (!matchingEducation) {
    return {
      score: 25,
      status: "not-matched",
    };
  }

  if (
    acceptsStudent &&
    matchingEducation.status === "in_progress"
  ) {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  if (matchingEducation.status === "completed") {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  if (matchingEducation.status === "in_progress") {
    return {
      score: 80,
      status: "likely",
    };
  }

  return {
    score: 60,
    status: "unknown",
  };
}

function locationMatches(
  jobLocation: string,
  preferenceLocation: string,
): boolean {
  const normalizedJobLocation =
    normalizeText(jobLocation);

  const normalizedPreferenceLocation =
    normalizeText(preferenceLocation);

  return (
    normalizedJobLocation.includes(
      normalizedPreferenceLocation,
    ) ||
    normalizedPreferenceLocation.includes(
      normalizedJobLocation,
    )
  );
}

function calculateLocationScore(
  job: Job,
  profile: ProfessionalProfile,
  preferences: JobPreferences,
): ScoredEvidence {
  if (
    job.workMode === "Remote" &&
    preferences.workModes.includes("Remote")
  ) {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  const preferredLocationMatch =
    preferences.preferredLocations.some(
      (location) => {
        return (
          locationMatches(job.location, location.label) ||
          (location.city !== null &&
            locationMatches(job.location, location.city))
        );
      },
    );

  if (preferredLocationMatch) {
    return {
      score: 100,
      status: "confirmed",
    };
  }

  if (
    profile.currentLocation &&
    locationMatches(
      job.location,
      profile.currentLocation,
    )
  ) {
    return {
      score: 85,
      status: "likely",
    };
  }

  if (
    preferences.workModes.includes(job.workMode)
  ) {
    return {
      score: 40,
      status: "likely",
    };
  }

  return {
    score: 0,
    status: "not-matched",
  };
}

function calculateJobTypeScore(
  job: Job,
  preferences: JobPreferences,
): number {
  return preferences.jobTypes.includes(job.jobType)
    ? 100
    : 0;
}

function createMatchReason(
  job: Job,
  matchingSkills: string[],
  missingSkills: string[],
  locationStatus: MatchStatus,
  preferences: JobPreferences,
): string {
  const reasons: string[] = [];

  if (matchingSkills.length > 0) {
    reasons.push(
      `You match ${matchingSkills.length} of ${job.skills.length} listed skills.`,
    );
  } else {
    reasons.push(
      "No exact skill matches were found in your current profile.",
    );
  }

  if (locationStatus === "confirmed") {
    reasons.push(
      "The location or work arrangement matches your preferences.",
    );
  } else if (locationStatus === "likely") {
    reasons.push(
      "The work arrangement is suitable, but the location should be reviewed.",
    );
  }

  if (
    preferences.jobTypes.includes(job.jobType)
  ) {
    reasons.push(
      `${job.jobType} work matches your selected employment types.`,
    );
  }

  if (missingSkills.length > 0) {
    reasons.push(
      `Review the missing skills: ${missingSkills
        .slice(0, 3)
        .join(", ")}.`,
    );
  }

  return reasons.join(" ");
}

export function calculateJobMatch(
  job: Job,
  profile: ProfessionalProfile,
  preferences: JobPreferences,
): JobMatch {
  const skillsResult = calculateSkillsScore(
    job,
    profile,
  );

  const experienceResult =
    calculateExperienceScore(job, profile);

  const educationResult =
    calculateEducationScore(job, profile);

  const locationResult = calculateLocationScore(
    job,
    profile,
    preferences,
  );

  const jobTypeScore = calculateJobTypeScore(
    job,
    preferences,
  );

  const finalScore = calculateWeightedMatchScore({
    skills: skillsResult.score,
    experience: experienceResult.score,
    education: educationResult.score,
    location: locationResult.score,
    jobType: jobTypeScore,
  });

  return {
    score: finalScore,
    educationMatch: educationResult.status,
    experienceMatch: experienceResult.status,
    locationMatch: locationResult.status,
    matchingSkills: skillsResult.matchingSkills,
    missingSkills: skillsResult.missingSkills,
    reason: createMatchReason(
      job,
      skillsResult.matchingSkills,
      skillsResult.missingSkills,
      locationResult.status,
      preferences,
    ),
  };
}

function titleMatchesPreferences(
  job: Job,
  preferences: JobPreferences,
): boolean {
  if (preferences.preferredTitles.length === 0) {
    return true;
  }

  const normalizedJobTitle = normalizeText(job.title);

  return preferences.preferredTitles.some(
    (preferredTitle) => {
      const normalizedPreference =
        preferredTitle.normalizedTitle;

      return (
        normalizedJobTitle.includes(
          normalizedPreference,
        ) ||
        normalizedPreference.includes(
          normalizedJobTitle,
        )
      );
    },
  );
}

function sectorMatchesPreferences(
  job: Job,
  preferences: JobPreferences,
): boolean {
  if (preferences.sectors.length === 0) {
    return true;
  }

  if (job.sector === "Nonprofit") {
    return false;
  }

  return preferences.sectors.includes(job.sector);
}

export function jobMatchesPreferences(
  job: Job,
  preferences: JobPreferences,
): boolean {
  const titleMatches = titleMatchesPreferences(
    job,
    preferences,
  );

  const workModeMatches =
    preferences.workModes.includes(job.workMode);

  const jobTypeMatches =
    preferences.jobTypes.includes(job.jobType);

  const sectorMatches = sectorMatchesPreferences(
    job,
    preferences,
  );

  return (
    titleMatches &&
    workModeMatches &&
    jobTypeMatches &&
    sectorMatches
  );
}