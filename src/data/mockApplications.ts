import type { JobApplication } from "../types/application";

const mockApplications: JobApplication[] = [
  {
    id: "application-001",
    jobId: "job-001",
    status: "Applied",
    addedAt: "2026-09-01T09:30:00Z",
    appliedAt: "2026-09-02T11:15:00Z",
    nextAction: "Check for an employer response",
    nextActionAt: "2026-09-09T09:00:00Z",
    notes:
      "Applied using the software-development CV. Review the company before any interview.",
    createdAt: "2026-09-01T09:30:00Z",
    updatedAt: "2026-09-02T11:15:00Z",
  },
  {
    id: "application-002",
    jobId: "job-002",
    status: "Interview",
    addedAt: "2026-08-29T08:00:00Z",
    appliedAt: "2026-08-29T08:30:00Z",
    nextAction: "Prepare networking and troubleshooting examples",
    nextActionAt: "2026-09-05T10:00:00Z",
    notes:
      "Prepare examples involving Windows support, networking fundamentals, and user troubleshooting.",
    createdAt: "2026-08-29T08:00:00Z",
    updatedAt: "2026-09-03T07:45:00Z",
  },
  {
    id: "application-003",
    jobId: "job-003",
    status: "Assessment",
    addedAt: "2026-08-30T12:00:00Z",
    appliedAt: "2026-08-31T10:20:00Z",
    nextAction: "Complete the coordination assessment",
    nextActionAt: "2026-09-06T17:00:00Z",
    notes:
      "Focus on communication, scheduling, record management, and Microsoft Office.",
    createdAt: "2026-08-30T12:00:00Z",
    updatedAt: "2026-09-02T15:10:00Z",
  },
  {
    id: "application-004",
    jobId: "job-004",
    status: "Saved",
    addedAt: "2026-09-02T14:00:00Z",
    appliedAt: null,
    nextAction: "Review FastAPI and PostgreSQL requirements",
    nextActionAt: "2026-09-04T09:00:00Z",
    notes:
      "Review the missing backend skills before deciding whether to apply.",
    createdAt: "2026-09-02T14:00:00Z",
    updatedAt: "2026-09-02T14:00:00Z",
  },
];

export { mockApplications };