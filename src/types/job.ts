type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Temporary";

type WorkMode = "On-site" | "Remote" | "Hybrid";

type JobSector = "Private" | "Government" | "Nonprofit";

type MatchStatus =
  | "confirmed"
  | "likely"
  | "unknown"
  | "not-matched";

type JobMatch = {
  score: number;
  educationMatch: MatchStatus;
  experienceMatch: MatchStatus;
  locationMatch: MatchStatus;
  matchingSkills: string[];
  missingSkills: string[];
  reason: string;
};

type Job = {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  description: string;
  location: string;
  salary: string | null;
  jobType: JobType;
  workMode: WorkMode;
  sector: JobSector;
  experienceRequirement: string;
  educationRequirement: string;
  skills: string[];
  postedAt: string;
  deadline: string | null;
  applicationUrl: string | null;
  sourceName: string;
  isSaved: boolean;
  isNew: boolean;
  match: JobMatch;
};

export type {
  Job,
  JobMatch,
  JobSector,
  JobType,
  MatchStatus,
  WorkMode,
};