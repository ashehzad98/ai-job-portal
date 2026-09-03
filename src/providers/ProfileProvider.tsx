import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ProfileContext,
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

  const contextValue = useMemo<ProfileContextValue>(
    () => ({
      profile,
      updateBasicInfo,
    }),
    [profile, updateBasicInfo],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider };