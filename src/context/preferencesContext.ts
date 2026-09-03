import { createContext } from "react";
import type { JobPreferences } from "../types/preferences";

export type PreferencesDraft = Omit<
  JobPreferences,
  "userId" | "createdAt" | "updatedAt"
>;

export interface PreferencesContextValue {
  preferences: JobPreferences;
  updatePreferences: (preferences: PreferencesDraft) => void;
}

export const PreferencesContext =
  createContext<PreferencesContextValue | null>(null);