type EducationStatus =
  | "in_progress"
  | "completed"
  | "incomplete"
  | "other";

type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Temporary"
  | "Freelance";

type SkillProficiency =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | null;

type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  status: EducationStatus;
  startDate: string | null;
  graduationDate: string | null;
  grade: string | null;
};

type Experience = {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: EmploymentType | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  skillsUsed: string[];
};

type ProfileSkill = {
  id: string;
  name: string;
  proficiency: SkillProficiency;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string | null;
  expirationDate: string | null;
  credentialUrl: string | null;
};

type ProfessionalProfile = {
  userId: string;
  fullName: string;
  professionalHeadline: string | null;
  currentLocation: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  about: string | null;
  education: Education[];
  experience: Experience[];
  skills: ProfileSkill[];
  certifications: Certification[];
  onboardingCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type {
  Certification,
  Education,
  EducationStatus,
  EmploymentType,
  Experience,
  ProfessionalProfile,
  ProfileSkill,
  SkillProficiency,
};