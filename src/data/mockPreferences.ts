import type { JobPreferences } from "../types/preferences";

const mockPreferences: JobPreferences = {
  userId: "user-001",
  preferredTitles: [
    {
      id: "title-001",
      title: "Junior Software Developer",
      normalizedTitle: "junior software developer",
    },
    {
      id: "title-002",
      title: "Backend Developer",
      normalizedTitle: "backend developer",
    },
    {
      id: "title-003",
      title: "IT Support Engineer",
      normalizedTitle: "it support engineer",
    },
    {
      id: "title-004",
      title: "Program Coordinator",
      normalizedTitle: "program coordinator",
    },
  ],
  preferredLocations: [
    {
      id: "location-001",
      label: "Islamabad, Pakistan",
      city: "Islamabad",
      region: "Islamabad Capital Territory",
      countryCode: "PK",
    },
    {
      id: "location-002",
      label: "Rawalpindi, Punjab, Pakistan",
      city: "Rawalpindi",
      region: "Punjab",
      countryCode: "PK",
    },
    {
      id: "location-003",
      label: "Lahore, Punjab, Pakistan",
      city: "Lahore",
      region: "Punjab",
      countryCode: "PK",
    },
    {
      id: "location-004",
      label: "Mianwali, Punjab, Pakistan",
      city: "Mianwali",
      region: "Punjab",
      countryCode: "PK",
    },
  ],
  workModes: ["Remote", "Hybrid", "On-site"],
  jobTypes: ["Full-time", "Internship"],
  sectors: ["Private", "Government"],
  minimumSalary: 30000,
  salaryCurrency: "PKR",
  salaryPeriod: "month",
  includeUnspecifiedSalary: true,
  createdAt: "2026-09-01T10:00:00Z",
  updatedAt: "2026-09-03T10:00:00Z",
};

export { mockPreferences };