import type {
  MatchLabel,
  MatchScoreComponents,
} from "../types/match";

const MATCH_WEIGHTS = {
  skills: 0.4,
  experience: 0.25,
  education: 0.15,
  location: 0.1,
  jobType: 0.1,
} as const;

export function clampScore(score: number): number {
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function calculateWeightedMatchScore(
  components: MatchScoreComponents,
): number {
  const score =
    clampScore(components.skills) * MATCH_WEIGHTS.skills +
    clampScore(components.experience) *
      MATCH_WEIGHTS.experience +
    clampScore(components.education) *
      MATCH_WEIGHTS.education +
    clampScore(components.location) *
      MATCH_WEIGHTS.location +
    clampScore(components.jobType) *
      MATCH_WEIGHTS.jobType;

  return clampScore(score);
}

export function getMatchLabel(score: number): MatchLabel {
  const safeScore = clampScore(score);

  if (safeScore >= 90) {
    return "Excellent match";
  }

  if (safeScore >= 75) {
    return "Strong match";
  }

  if (safeScore >= 60) {
    return "Moderate match";
  }

  return "Weak match";
}