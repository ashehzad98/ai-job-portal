import { Outlet } from "react-router-dom";

import { PublicHeader } from "../components/navigation/PublicHeader";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-page">
      <PublicHeader />

      <Outlet />
    </div>
  );
}

export default PublicLayout;