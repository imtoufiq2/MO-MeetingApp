// import { Routes, Route } from "react-router-dom";
import AssociatedCompanies from "../pages/AssociatedCompanies";
import SignIn from "../pages/auth/SignIn";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import VerifyMobile from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/reset_password";
import Department from "../pages/Department";
import Meetings from "../pages/Meetings";
import Reports from "../pages/Reports";
import ViewDocument from "../pages/ViewDocument";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "../components/SomethingWentWrong";
import EnterMobile from "../pages/auth/enter-mobile";
import AuthGuard from "../utils/AuthGuard";
import FloatingFooterAction from "../components/floatingFooterAction";

const Routers = () => {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  // useEffect(() => {
  //   const handleOnline = () => setIsOnline(true);
  //   const handleOffline = () => setIsOnline(false);

  //   window.addEventListener("online", handleOnline);
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("online", handleOnline);
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, []);
  function FallbackComponent() {
    return <SomethingWentWrong />;
  }
  const LayoutWithFooter = () => {
    return (
      <>
        <Outlet />
        <FloatingFooterAction />
      </>
    );
  };
  const appLayout = createBrowserRouter([
    {
      path: "boardmeeting",
      // element: <Navigate to="sign-in" />,
      element: <LayoutWithFooter />, // Set layout as parent element
      children: [
        {
          path: "",
          element: JSON.parse(sessionStorage.getItem("loginData"))
            ?.accessToken ? (
            <Navigate to="companies" />
          ) : (
            <Navigate to="sign-in" />
          ),
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "verify-otp",
          element: <VerifyMobile />,
        },
        {
          path: "enter-mobile",
          element: <EnterMobile />,
        },
        {
          path: "forgot-password",
          element: <ResetPassword />,
        },
        {
          path: "companies",
          element: (
            <AuthGuard>
              <AssociatedCompanies />
            </AuthGuard>
          ),
        },
        {
          path: "department/:id",
          element: (
            <AuthGuard>
              <Department />
            </AuthGuard>
          ),
        },
        {
          path: "meetings/:id",
          element: (
            <AuthGuard>
              <Meetings />
            </AuthGuard>
          ),
        },
        {
          path: "reports/:id",
          element: (
            <AuthGuard>
              <Reports />
            </AuthGuard>
          ),
        },
        {
          path: "file/view/:id",
          element: (
            <AuthGuard>
              <ViewDocument />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <>No page found</>,
    },
  ]);

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <RouterProvider router={appLayout} />
      {/* <Routes>
        <Route path="/boardmeeting" element={<AssociatedCompanies />} />
        <Route path="/boardmeeting/sign-in" element={<SignIn />} />
        <Route path="/boardmeeting/verify-otp" element={<VerifyMobile />} />
        <Route path="/boardmeeting/enter-mobile" element={<EnterMobile />} />
        <Route path="/boardmeeting/face-auth" element={<FaceAuth />} />
        <Route
          path="/boardmeeting/forgot-password"
          element={<ResetPassword />}
        />

        <Route path="/boardmeeting/department/:id" element={<Department />} />
        <Route path="/boardmeeting/meetings/:id" element={<Meetings />} />
        <Route path="/boardmeeting/reports/:id" element={<Reports />} />

        <Route path="/boardmeeting/file/view/:id" element={<ViewDocument />} />
        <Route path="/*" element={<>No page found</>} />
      </Routes> */}
    </ErrorBoundary>
  );
};

export default Routers;
