import { useMemo } from "react";
import { mockJobs } from "../data/mockJobs";
import { usePreferences } from "./usePreferences";
import { useProfile } from "./useProfile";
import {
  calculateJobMatch,
  jobMatchesPreferences,
} from "../utils/jobMatcher";

export function useMatchedJobs() {
  const { profile } = useProfile();
  const { preferences } = usePreferences();

  return useMemo(() => {
    const allJobs = mockJobs
      .map((job) => ({
        ...job,
        match: calculateJobMatch(
          job,
          profile,
          preferences,
        ),
      }))
      .sort(
        (firstJob, secondJob) =>
          secondJob.match.score -
          firstJob.match.score,
      );

    const matchedJobs = allJobs.filter((job) =>
      jobMatchesPreferences(job, preferences),
    );

    return {
      matchedJobs,
      allJobs,
    };
  }, [profile, preferences]);
}