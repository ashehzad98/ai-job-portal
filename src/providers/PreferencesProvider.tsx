import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PreferencesContext } from "../context/preferencesContext";
import type { PreferencesDraft } from "../context/preferencesContext";
import { mockPreferences } from "../data/mockPreferences";

interface PreferencesProviderProps {
  children: ReactNode;
}

export default function PreferencesProvider({
  children,
}: PreferencesProviderProps) {
  const [preferences, setPreferences] = useState(mockPreferences);

  const updatePreferences = useCallback((draft: PreferencesDraft) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      ...draft,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      updatePreferences,
    }),
    [preferences, updatePreferences],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}