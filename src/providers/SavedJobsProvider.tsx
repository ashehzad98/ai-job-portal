import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  SavedJobsContext,
  type SavedJobsContextValue,
} from "../context/savedJobsContext";
import { mockJobs } from "../data/mockJobs";

type SavedJobsProviderProps = {
  children: ReactNode;
};

function SavedJobsProvider({ children }: SavedJobsProviderProps) {
  const [savedJobIds, setSavedJobIds] = useState(
    () =>
      new Set(
        mockJobs
          .filter((job) => job.isSaved)
          .map((job) => job.id),
      ),
  );

  const toggleSavedJob = useCallback((jobId: string) => {
    setSavedJobIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(jobId)) {
        nextIds.delete(jobId);
      } else {
        nextIds.add(jobId);
      }

      return nextIds;
    });
  }, []);

  const isJobSaved = useCallback(
    (jobId: string) => savedJobIds.has(jobId),
    [savedJobIds],
  );

  const contextValue = useMemo<SavedJobsContextValue>(
    () => ({
      savedJobIds,
      savedCount: savedJobIds.size,
      isJobSaved,
      toggleSavedJob,
    }),
    [isJobSaved, savedJobIds, toggleSavedJob],
  );

  return (
    <SavedJobsContext.Provider value={contextValue}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export { SavedJobsProvider };