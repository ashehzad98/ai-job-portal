import { createContext } from "react";

import type { ProfessionalProfile } from "../types/profile";

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
};

const ProfileContext = createContext<
  ProfileContextValue | undefined
>(undefined);

export { ProfileContext };
export type {
  ProfileBasicInfoUpdate,
  ProfileContextValue,
};