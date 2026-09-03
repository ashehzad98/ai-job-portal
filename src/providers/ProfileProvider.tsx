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
  type ExperienceInput,
  type ProfileSkillInput,
  type CertificationInput,
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

  const addExperience = useCallback(
    (experience: ExperienceInput) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        experience: [
          ...currentProfile.experience,
          {
            id: crypto.randomUUID(),
            ...experience,
          },
        ],
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const updateExperience = useCallback(
    (
      experienceId: string,
      experience: ExperienceInput,
    ) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        experience: currentProfile.experience.map((item) =>
          item.id === experienceId
            ? {
              id: item.id,
              ...experience,
            }
            : item,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeExperience = useCallback(
    (experienceId: string) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        experience: currentProfile.experience.filter(
          (item) => item.id !== experienceId,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const addSkill = useCallback((skill: ProfileSkillInput) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      skills: [
        ...currentProfile.skills,
        {
          id: crypto.randomUUID(),
          ...skill,
        },
      ],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateSkill = useCallback(
    (skillId: string, skill: ProfileSkillInput) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        skills: currentProfile.skills.map((item) =>
          item.id === skillId
            ? {
              id: item.id,
              ...skill,
            }
            : item,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeSkill = useCallback((skillId: string) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      skills: currentProfile.skills.filter(
        (item) => item.id !== skillId,
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const addCertification = useCallback(
    (certification: CertificationInput) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        certifications: [
          ...currentProfile.certifications,
          {
            id: crypto.randomUUID(),
            ...certification,
          },
        ],
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const updateCertification = useCallback(
    (
      certificationId: string,
      certification: CertificationInput,
    ) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        certifications: currentProfile.certifications.map(
          (item) =>
            item.id === certificationId
              ? {
                id: item.id,
                ...certification,
              }
              : item,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const removeCertification = useCallback(
    (certificationId: string) => {
      setProfile((currentProfile) => ({
        ...currentProfile,
        certifications: currentProfile.certifications.filter(
          (item) => item.id !== certificationId,
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
      addExperience,
      updateExperience,
      removeExperience,
      addSkill,
      updateSkill,
      removeSkill,
      addCertification,
      updateCertification,
      removeCertification,
    }),
    [
      profile,
      updateBasicInfo,
      addEducation,
      updateEducation,
      removeEducation,
      addExperience,
      updateExperience,
      removeExperience,
    ],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider };