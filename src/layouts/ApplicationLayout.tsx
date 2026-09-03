import { Outlet } from "react-router-dom";

import { ApplicationHeader } from "../pages/application/ApplicationHeader";
import { ApplicationsProvider } from "../providers/ApplicationsProvider";
import { SavedJobsProvider } from "../providers/SavedJobsProvider";

function ApplicationLayout() {
  return (
    <SavedJobsProvider>
      <ApplicationsProvider>
        <div className="min-h-screen bg-page">
          <ApplicationHeader />
          <Outlet />
        </div>
      </ApplicationsProvider>
    </SavedJobsProvider>
  );
}

export default ApplicationLayout;