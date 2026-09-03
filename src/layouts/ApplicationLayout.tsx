import { Outlet } from "react-router-dom";
import { ApplicationHeader } from "../pages/application/ApplicationHeader";
import { ApplicationsProvider } from "../providers/ApplicationsProvider";
import { ProfileProvider } from "../providers/ProfileProvider";
import { SavedJobsProvider } from "../providers/SavedJobsProvider";
import PreferencesProvider from "../providers/PreferencesProvider";

function ApplicationLayout() {
  return (
    <ProfileProvider>
      <PreferencesProvider>
      <SavedJobsProvider>
        <ApplicationsProvider>
          <div className="min-h-screen bg-page">
            <ApplicationHeader />
            <Outlet />
          </div>
        </ApplicationsProvider>
      </SavedJobsProvider>
      </PreferencesProvider>
    </ProfileProvider>
  );
}

export default ApplicationLayout;