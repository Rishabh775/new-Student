import { Navigate, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

const Confirmation = lazy(() => import("../pages/Confirmation"));
const MobileEntry = lazy(() => import("../pages/MobileEntry"));
const OTPVerification = lazy(() => import("../pages/OTPVerification"));
const Quiz = lazy(() => import("../pages/Quiz"));
const Registration = lazy(() => import("../pages/Registration"));
const Result = lazy(() => import("../pages/Result"));
const NotFound = lazy(() => import("../components/NotFound"));

interface Route {
  element: JSX.Element;
}

function ProtectedRoute({ element }: Route): JSX.Element {
  const isToken = Cookies.get("token");
  // Use <Navigate /> instead of returning `void` from navigate()
  return isToken ? element : <Navigate to="*" replace />;
}

function AppRouter() {
  const routes = [
    { path: "/", element: <MobileEntry /> },
    { path: "/otp", element: <ProtectedRoute element={<OTPVerification />} /> },
    {
      path: "/registration",
      element: <ProtectedRoute element={<Registration />} />,
    },
    { path: "/quiz", element: <ProtectedRoute element={<Quiz />} /> },
    { path: "/result", element: <ProtectedRoute element={<Result />} /> },
    {
      path: "/confirmation",
      element: <ProtectedRoute element={<Confirmation />} />,
    },
    { path: "*", element: <NotFound /> },
  ];

  return <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>;
}

export default AppRouter;
