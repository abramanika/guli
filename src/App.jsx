import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import AppShell from './layouts/AppShell.jsx';
import OnboardingShell from './layouts/OnboardingShell.jsx';

// Onboarding pages
import SplashPage from './pages/Onboarding/SplashPage.jsx';
import CarouselPage from './pages/Onboarding/CarouselPage.jsx';
import AuthPage from './pages/Onboarding/AuthPage.jsx';
import NamePage from './pages/Onboarding/NamePage.jsx';
import BirthdayPage from './pages/Onboarding/BirthdayPage.jsx';
import LanguagePage from './pages/Onboarding/LanguagePage.jsx';
import ConsentPage from './pages/Onboarding/ConsentPage.jsx';

// Main tab pages
import TodayPage from './pages/Today/TodayPage.jsx';
import MapPage from './pages/Map/MapPage.jsx';
import TraitDetailPage from './pages/Map/TraitDetailPage.jsx';
import ArchetypePage from './pages/Map/ArchetypePage.jsx';
import PortraitPage from './pages/Map/PortraitPage.jsx';
import SharePage from './pages/Map/SharePage.jsx';
import CirclePage from './pages/Circle/CirclePage.jsx';
import PairPage from './pages/Circle/PairPage.jsx';
import GroupPage from './pages/Circle/GroupPage.jsx';
import MePage from './pages/Me/MePage.jsx';
import SettingsPage from './pages/Me/SettingsPage.jsx';

// Assessment pages (no tab bar)
import ChapterHomePage from './pages/Assessment/ChapterHomePage.jsx';
import QuestionFlowPage from './pages/Assessment/QuestionFlowPage.jsx';
import RevealPage from './pages/Assessment/RevealPage.jsx';

const router = createBrowserRouter([
  // Onboarding flow — no tab bar
  {
    element: <OnboardingShell />,
    children: [
      { path: '/', element: <SplashPage /> },
      { path: '/onboarding/carousel', element: <CarouselPage /> },
      { path: '/onboarding/auth', element: <AuthPage /> },
      { path: '/onboarding/name', element: <NamePage /> },
      { path: '/onboarding/birthday', element: <BirthdayPage /> },
      { path: '/onboarding/language', element: <LanguagePage /> },
      { path: '/onboarding/consent', element: <ConsentPage /> },
    ],
  },

  // Assessment flow — no tab bar
  {
    element: <OnboardingShell />,
    children: [
      { path: '/assessment/:chapterId', element: <ChapterHomePage /> },
      { path: '/assessment/:chapterId/questions', element: <QuestionFlowPage /> },
      { path: '/assessment/:chapterId/reveal', element: <RevealPage /> },
    ],
  },

  // Main app — with tab bar
  {
    element: <AppShell />,
    children: [
      { path: '/today', element: <TodayPage /> },

      { path: '/map', element: <MapPage /> },
      { path: '/map/trait/:traitId', element: <TraitDetailPage /> },
      { path: '/map/archetype', element: <ArchetypePage /> },
      { path: '/map/portrait', element: <PortraitPage /> },
      { path: '/map/share', element: <SharePage /> },

      { path: '/circle', element: <CirclePage /> },
      { path: '/circle/pair/:userId', element: <PairPage /> },
      { path: '/circle/group/:groupId', element: <GroupPage /> },

      { path: '/me', element: <MePage /> },
      { path: '/me/settings', element: <SettingsPage /> },
    ],
  },

  // Fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
