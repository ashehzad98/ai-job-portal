import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ProfileContext,
  type EducationInput,
  type ProfileBasicInfoUpdate,
  type ProfileContextValue,
} from "../context/profileContext";
import { mockProfile } from "../data/mockProfile";

type ProfileProviderProps = {
  children: ReactNode;
};

function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfile] = useState(mockProfile);

  const updateBasicInfo = useCallback(
    (update: ProfileBasicInfoUpdate) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        ...update,
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const addEducation = useCallback(
      (education: EducationInput) => {
        setProfile((currentProfile) => ({
          ...currentProfile,
          education: [
            ...currentProfile.education,
            {
              id: crypto.randomUUID(),
              ...education,
            },
          ],
          updatedAt: new Date().toISOString(),
        }));
      },
      [],
    );

    const updateEducation = useCallback(
      (
        educationId: string,
        education: EducationInput,
      ) => {
        setProfile((currentProfile) => ({
          ...currentProfile,
          education: currentProfile.education.map((item) =>
            item.id === educationId
              ? {
                  id: item.id,
                  ...education,
                }
              : item,
          ),
          updatedAt: new Date().toISOString(),
        }));
      },
      [],
    );

    const removeEducation = useCallback(
      (educationId: string) => {
        setProfile((currentProfile) => ({
          ...currentProfile,
          education: currentProfile.education.filter(
            (item) => item.id !== educationId,
          ),
          updatedAt: new Date().toISOString(),
        }));
      },
      [],
    );

  const contextValue = useMemo<ProfileContextValue>(
  () => ({
    profile,
    updateBasicInfo,
    addEducation,
    updateEducation,
    removeEducation,
  }),
  [
    profile,
    updateBasicInfo,
    addEducation,
    updateEducation,
    removeEducation,
  ],
);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider };