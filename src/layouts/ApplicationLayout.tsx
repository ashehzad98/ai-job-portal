import { Outlet } from "react-router-dom";

import { ApplicationHeader } from "../pages/application/ApplicationHeader";

function ApplicationLayout() {
  return (
    <div className="min-h-screen bg-page">
      <ApplicationHeader />

      <Outlet />
    </div>
  );
}

export default ApplicationLayout;