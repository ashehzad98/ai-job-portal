export type EvidenceState =
  | "confirmed"
  | "likely"
  | "unknown"
  | "mismatch";

export type MatchMethod =
  | "rules"
  | "rules_and_ai";

export type MatchLabel =
  | "Excellent match"
  | "Strong match"
  | "Moderate match"
  | "Weak match";

export interface MatchScoreComponents {
  skills: number;
  experience: number;
  education: number;
  location: number;
  jobType: number;
}

export interface JobMatchResult {
  jobId: string;

  ruleScore: number;
  finalScore: number;

  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  locationScore: number;
  jobTypeScore: number;

  method: MatchMethod;

  educationMatch: EvidenceState;
  experienceMatch: EvidenceState;
  locationMatch: EvidenceState;

  matchingSkills: string[];
  missingSkills: string[];
  unknownRequirements: string[];

  reason: string;
  calculatedAt: string;
}