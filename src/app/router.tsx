import { createBrowserRouter } from "react-router-dom";
import ApplicationLayout from "../layouts/ApplicationLayout";
import PublicLayout from "../layouts/PublicLayout";
import DashboardPage from "../pages/application/DashboardPage";
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import JobDetailsPage from "../pages/application/JobDetailsPage";
import SavedJobsPage from "../pages/application/SavedJobsPage";
import ApplicationTrackerPage from "../pages/application/ApplicationTrackerPage";
import ApplicationDetailsPage from "../pages/application/ApplicationDetailsPage";
import ProfilePage from "../pages/application/ProfilePage";
import ProfileEditPage from "../pages/application/ProfileEditPage";
import ProfileEducationPage from "../pages/application/ProfileEducationPage";
import ProfileExperiencePage from "../pages/application/ProfileExperiencePage";
import ProfileSkillsPage from "../pages/application/ProfileSkillsPage";
import ProfileCertificationsPage from "../pages/application/ProfileCertificationsPage";
import PreferencesPage from "../pages/application/PreferencesPage";

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
        element: <ApplicationDetailsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/edit",
        element: <ProfileEditPage />,
      },
      {
        path: "/profile/education",
        element: <ProfileEducationPage />,
      },
      {
        path: "/profile/experience",
        element: <ProfileExperiencePage />,
      },
      {
        path: "/profile/skills",
        element: <ProfileSkillsPage />,
      },
      {
        path: "/profile/certifications",
        element: <ProfileCertificationsPage />,
      },
      {
        path: "/preferences",
        element: <PreferencesPage />,
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