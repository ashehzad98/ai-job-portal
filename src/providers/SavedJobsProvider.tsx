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

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

function createInitialSavedJobs() {
  const savedJobs = mockJobs.filter((job) => job.isSaved);

  return new Map(
    savedJobs.map((job, index) => [
      job.id,
      new Date(
        Date.now() - index * oneDayInMilliseconds,
      ).toISOString(),
    ]),
  );
}

function SavedJobsProvider({ children }: SavedJobsProviderProps) {
  const [savedAtByJobId, setSavedAtByJobId] = useState(
    createInitialSavedJobs,
  );

  const savedJobIds = useMemo(
    () => new Set(savedAtByJobId.keys()),
    [savedAtByJobId],
  );

  const toggleSavedJob = useCallback((jobId: string) => {
    setSavedAtByJobId((currentSavedJobs) => {
      const nextSavedJobs = new Map(currentSavedJobs);

      if (nextSavedJobs.has(jobId)) {
        nextSavedJobs.delete(jobId);
      } else {
        nextSavedJobs.set(jobId, new Date().toISOString());
      }

      return nextSavedJobs;
    });
  }, []);

  const isJobSaved = useCallback(
    (jobId: string) => savedAtByJobId.has(jobId),
    [savedAtByJobId],
  );

  const contextValue = useMemo<SavedJobsContextValue>(
    () => ({
      savedJobIds,
      savedAtByJobId,
      savedCount: savedAtByJobId.size,
      isJobSaved,
      toggleSavedJob,
    }),
    [
      isJobSaved,
      savedAtByJobId,
      savedJobIds,
      toggleSavedJob,
    ],
  );

  return (
    <SavedJobsContext.Provider value={contextValue}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export { SavedJobsProvider };