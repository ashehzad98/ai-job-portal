import { createContext } from "react";

type SavedJobsContextValue = {
  savedJobIds: ReadonlySet<string>;
  savedAtByJobId: ReadonlyMap<string, string>;
  savedCount: number;
  isJobSaved: (jobId: string) => boolean;
  toggleSavedJob: (jobId: string) => void;
};

const SavedJobsContext = createContext<
  SavedJobsContextValue | undefined
>(undefined);

export { SavedJobsContext };
export type { SavedJobsContextValue };