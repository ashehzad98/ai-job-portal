import { Outlet } from "react-router-dom";

import { ApplicationHeader } from "../pages/application/ApplicationHeader";
import { SavedJobsProvider } from "../providers/SavedJobsProvider";

function ApplicationLayout() {
  return (
    <SavedJobsProvider>
      <div className="min-h-screen bg-page">
        <ApplicationHeader />

        <Outlet />
      </div>
    </SavedJobsProvider>
  );
}

export default ApplicationLayout;