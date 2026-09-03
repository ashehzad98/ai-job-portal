import { createBrowserRouter } from "react-router-dom";
import ApplicationLayout from "../layouts/ApplicationLayout";
import PublicLayout from "../layouts/PublicLayout";
import DashboardPage from "../pages/application/DashboardPage";
import PlaceholderPage from "../pages/application/PlaceholderPage";
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import JobDetailsPage from "../pages/application/JobDetailsPage";
import SavedJobsPage from "../pages/application/SavedJobsPage";
import ApplicationTrackerPage from "../pages/application/ApplicationTrackerPage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ApplicationLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/jobs/:jobId",
        element: <JobDetailsPage />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobsPage />,
      },
      {
        path: "/applications",
        element: <ApplicationTrackerPage />,
      },
      {
        path: "/applications/:applicationId",
        element: (
          <PlaceholderPage
            title="Application details"
            description="Review and update a specific application."
          />
        ),
      },
      {
        path: "/profile",
        element: (
          <PlaceholderPage
            title="Professional profile"
            description="Manage your education, experience, skills, and certifications."
          />
        ),
      },
      {
        path: "/preferences",
        element: (
          <PlaceholderPage
            title="Job preferences"
            description="Manage your preferred titles, locations, work modes, and sectors."
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <PublicLayout />
    ),
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;