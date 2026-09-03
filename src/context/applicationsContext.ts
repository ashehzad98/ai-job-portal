import { createContext } from "react";

import type { JobApplication } from "../types/application";

type ApplicationUpdate = Partial<
  Omit<JobApplication, "id" | "createdAt" | "updatedAt">
>;

type ApplicationsContextValue = {
  applications: JobApplication[];
  updateApplication: (
    applicationId: string,
    update: ApplicationUpdate,
  ) => void;
};

const ApplicationsContext = createContext<
  ApplicationsContextValue | undefined
>(undefined);

export { ApplicationsContext };
export type {
  ApplicationsContextValue,
  ApplicationUpdate,
};