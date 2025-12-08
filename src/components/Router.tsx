import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';

// Pages
import HomePage from '@/components/pages/HomePage';
import DisastersPage from '@/components/pages/DisastersPage';
import DisasterDetailPage from '@/components/pages/DisasterDetailPage';
import EmergencyGuidePage from '@/components/pages/EmergencyGuidePage';
import RescueTeamsPage from '@/components/pages/RescueTeamsPage';
import RescueTeamDetailPage from '@/components/pages/RescueTeamDetailPage';
import SafeZoneMapPage from '@/components/pages/SafeZoneMapPage';
import SOSPage from '@/components/pages/SOSPage';
import DonationPage from '@/components/pages/DonationPage';
import VolunteerPage from '@/components/pages/VolunteerPage';
import ContactsPage from '@/components/pages/ContactsPage';
import AwarenessPage from '@/components/pages/AwarenessPage';
import ArticleDetailPage from '@/components/pages/ArticleDetailPage';
import GalleryPage from '@/components/pages/GalleryPage';
import AboutPage from '@/components/pages/AboutPage';
import DashboardPage from '@/components/pages/DashboardPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "disasters",
        element: <DisastersPage />,
      },
      {
        path: "disasters/:id",
        element: <DisasterDetailPage />,
      },
      {
        path: "emergency-guide",
        element: <EmergencyGuidePage />,
      },
      {
        path: "rescue-teams",
        element: <RescueTeamsPage />,
      },
      {
        path: "rescue-teams/:id",
        element: <RescueTeamDetailPage />,
      },
      {
        path: "safe-zone-map",
        element: <SafeZoneMapPage />,
      },
      {
        path: "sos",
        element: <SOSPage />,
      },
      {
        path: "donation",
        element: <DonationPage />,
      },
      {
        path: "volunteer",
        element: <VolunteerPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "awareness",
        element: <AwarenessPage />,
      },
      {
        path: "awareness/:id",
        element: <ArticleDetailPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your volunteer dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
