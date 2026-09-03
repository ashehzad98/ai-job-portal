import type { ProfessionalProfile } from "../types/profile";

const mockProfile: ProfessionalProfile = {
  userId: "user-001",
  fullName: "Muhammad Ashraf Shehzad",
  professionalHeadline:
    "Junior Software Developer | Flutter, React and Python",
  currentLocation: "Mianwali, Punjab, Pakistan",
  phone: null,
  linkedinUrl: null,
  portfolioUrl: "https://github.com/ashehzad98",
  about:
    "Junior software developer with practical experience building mobile and web interfaces. Interested in backend development, AI-powered applications, and creating reliable software products.",
  education: [
    {
      id: "education-001",
      institution: "Virtual University of Pakistan",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      status: "in_progress",
      startDate: null,
      graduationDate: "2027-07-01",
      grade: null,
    },
  ],
  experience: [
    {
      id: "experience-001",
      jobTitle: "Flutter Developer Intern",
      companyName: "Software Company",
      employmentType: "Internship",
      location: "Remote",
      startDate: "2026-03-01",
      endDate: "2026-08-31",
      isCurrent: false,
      description:
        "Developed and improved Flutter interfaces, integrated application state management, handled API data, and collaborated with backend and product teams.",
      skillsUsed: [
        "Flutter",
        "Dart",
        "BLoC",
        "REST APIs",
        "Git",
      ],
    },
  ],
  skills: [
    {
      id: "skill-001",
      name: "Flutter",
      proficiency: "Intermediate",
    },
    {
      id: "skill-002",
      name: "Dart",
      proficiency: "Intermediate",
    },
    {
      id: "skill-003",
      name: "React",
      proficiency: "Beginner",
    },
    {
      id: "skill-004",
      name: "TypeScript",
      proficiency: "Beginner",
    },
    {
      id: "skill-005",
      name: "Python",
      proficiency: "Beginner",
    },
    {
      id: "skill-006",
      name: "Git",
      proficiency: "Intermediate",
    },
    {
      id: "skill-007",
      name: "REST APIs",
      proficiency: "Intermediate",
    },
  ],
  certifications: [
    {
      id: "certification-001",
      name: "Mobile Application Development",
      issuer: "Training Provider",
      issueDate: "2025-12-01",
      expirationDate: null,
      credentialUrl: null,
    },
  ],
  onboardingCompletedAt: "2026-09-01T10:00:00Z",
  createdAt: "2026-09-01T09:00:00Z",
  updatedAt: "2026-09-03T08:00:00Z",
};

export { mockProfile };