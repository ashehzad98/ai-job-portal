import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ApplicationsContext,
  type ApplicationsContextValue,
  type ApplicationUpdate,
} from "../context/applicationsContext";
import { mockApplications } from "../data/mockApplications";

type ApplicationsProviderProps = {
  children: ReactNode;
};

function ApplicationsProvider({
  children,
}: ApplicationsProviderProps) {
  const [applications, setApplications] = useState(mockApplications);

  const updateApplication = useCallback(
    (applicationId: string, update: ApplicationUpdate) => {
      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === applicationId
            ? {
                ...application,
                ...update,
                updatedAt: new Date().toISOString(),
              }
            : application,
        ),
      );
    },
    [],
  );

  const contextValue = useMemo<ApplicationsContextValue>(
    () => ({
      applications,
      updateApplication,
    }),
    [applications, updateApplication],
  );

  return (
    <ApplicationsContext.Provider value={contextValue}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export { ApplicationsProvider };