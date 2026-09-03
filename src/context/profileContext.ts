import { createContext } from "react";
import type {
  Education,
  Experience,
  ProfessionalProfile,
  ProfileSkill,
} from "../types/profile";

type EducationInput = Omit<Education, "id">;
type ExperienceInput = Omit<Experience, "id">;
type ProfileSkillInput = Omit<ProfileSkill, "id">;

type ProfileBasicInfoUpdate = Pick<
  ProfessionalProfile,
  | "fullName"
  | "professionalHeadline"
  | "currentLocation"
  | "phone"
  | "linkedinUrl"
  | "portfolioUrl"
  | "about"
>;

type ProfileContextValue = {
  profile: ProfessionalProfile;
  updateBasicInfo: (update: ProfileBasicInfoUpdate) => void;
  addEducation: (education: EducationInput) => void;
  updateEducation: (
    educationId: string,
    education: EducationInput,
  ) => void;
  removeEducation: (educationId: string) => void;
  addExperience: (experience: ExperienceInput) => void;
  updateExperience: (
    experienceId: string,
    experience: ExperienceInput,
  ) => void;
  removeExperience: (experienceId: string) => void;
  addSkill: (skill: ProfileSkillInput) => void;
  updateSkill: (
    skillId: string,
    skill: ProfileSkillInput,
  ) => void;
  removeSkill: (skillId: string) => void;
};

const ProfileContext = createContext<
  ProfileContextValue | undefined
>(undefined);

export { ProfileContext };
export type {
  EducationInput,
  ExperienceInput,
  ProfileBasicInfoUpdate,
  ProfileContextValue,
};