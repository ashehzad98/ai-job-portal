import type {
  JobType,
  WorkMode,
} from "./job";

type PreferenceSector = "Private" | "Government";

type SalaryPeriod = "hour" | "month" | "year";

type SalaryCurrency = "PKR" | "USD" | "GBP" | "EUR";

type PreferredTitle = {
  id: string;
  title: string;
  normalizedTitle: string;
};

type PreferredLocation = {
  id: string;
  label: string;
  city: string | null;
  region: string | null;
  countryCode: string | null;
};

type JobPreferences = {
  userId: string;
  preferredTitles: PreferredTitle[];
  preferredLocations: PreferredLocation[];
  workModes: WorkMode[];
  jobTypes: JobType[];
  sectors: PreferenceSector[];
  minimumSalary: number | null;
  salaryCurrency: SalaryCurrency;
  salaryPeriod: SalaryPeriod;
  includeUnspecifiedSalary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type {
  JobPreferences,
  PreferredLocation,
  PreferredTitle,
  PreferenceSector,
  SalaryCurrency,
  SalaryPeriod,
};