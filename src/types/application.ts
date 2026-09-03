type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

type JobApplication = {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  addedAt: string;
  appliedAt: string | null;
  nextAction: string | null;
  nextActionAt: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type ApplicationStatusOption = {
  value: ApplicationStatus;
  label: string;
  description: string;
};

const applicationStatusOptions: ApplicationStatusOption[] = [
  {
    value: "Saved",
    label: "Saved",
    description: "Interested, but not applied yet.",
  },
  {
    value: "Applied",
    label: "Applied",
    description: "Application submitted to the employer.",
  },
  {
    value: "Assessment",
    label: "Assessment",
    description: "Test or assessment is in progress.",
  },
  {
    value: "Interview",
    label: "Interview",
    description: "Interview stage reached.",
  },
  {
    value: "Offer",
    label: "Offer",
    description: "An employment offer was received.",
  },
  {
    value: "Rejected",
    label: "Rejected",
    description: "The application was unsuccessful.",
  },
  {
    value: "Withdrawn",
    label: "Withdrawn",
    description: "The application was withdrawn.",
  },
];

export { applicationStatusOptions };
export type {
  ApplicationStatus,
  ApplicationStatusOption,
  JobApplication,
};