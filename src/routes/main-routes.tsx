import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home-page";
import ProfilePage from "../pages/profile-page";
import RegisterPage from "../pages/register-page";
import LoginPage from "../pages/login-page";
import UploadPage from "../pages/upload-page";
import TopMenu from "../components/layout/topmenu";
import ImageDetailPage from "../pages/image-detail-page";
import AccountPage from "../pages/account-page";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <TopMenu>
          <LoginPage />
        </TopMenu>
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <TopMenu>
          <HomePage />
        </TopMenu>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <TopMenu>
          <ProfilePage />
        </TopMenu>
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <TopMenu>
          <RegisterPage />
        </TopMenu>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <TopMenu>
          <LoginPage />
        </TopMenu>
      </PublicRoute>
    ),
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoute>
        <TopMenu>
          <UploadPage />
        </TopMenu>
      </ProtectedRoute>
    ),
  },
  {
    path: "/images/:id",
    element: (
      <ProtectedRoute>
        <TopMenu>
          <ImageDetailPage />
        </TopMenu>
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <TopMenu>
          <AccountPage />
        </TopMenu>
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const AppRoutes = () => {
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
};

export default AppRoutes;
