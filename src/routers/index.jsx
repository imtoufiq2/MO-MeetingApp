import { Routes, Route } from "react-router-dom";
import AssociatedCompanies from "../pages/AssociatedCompanies";
import SignIn from "../pages/auth/SignIn";
import VerifyMobile from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/reset_password";
import Department from "../pages/Department";
import Meetings from "../pages/Meetings";
import Reports from "../pages/Reports";
import ViewDocument from "../pages/ViewDocument";
import { ErrorBoundary } from "react-error-boundary";
// import PrivateRoute from "../pages/private-route";
// import PrivateRoute from "../pages/private-route";
// import ViewPdf from "../pages/ViewPdf";
// import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "../components/SomethingWentWrong";
import FaceAuth from "../pages/FaceAuth";
// import { PrivateRoute } from "../../privateRoute";
// import { useEffect, useState } from "react";
// import NoInternetConnection from "../components/NoInternetConnection";

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
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Routes>
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/boardmeeting" element={<AssociatedCompanies />} />
        {/* </Route> */}
        <Route path="/boardmeeting/sign-in" element={<SignIn />} />
        <Route path="/boardmeeting/verify-otp" element={<VerifyMobile />} />
        <Route path="/boardmeeting/face-auth" element={<FaceAuth />} />
        <Route
          path="/boardmeeting/forgot-password"
          element={<ResetPassword />}
        />

        <Route path="/boardmeeting/department/:id" element={<Department />} />
        <Route path="/boardmeeting/meetings/:id" element={<Meetings />} />
        <Route path="/boardmeeting/reports/:id" element={<Reports />} />

        {/* <Route path="/file/view" element={<ViewDocument />} /> */}
        <Route path="/boardmeeting/file/view/:id" element={<ViewDocument />} />

        {/* <Route path="/view-pdf/:id" element={<ViewPdf />} /> */}
        <Route path="/*" element={<>No page found</>} />
      </Routes>
    </ErrorBoundary>
  );
};

export default Routers;
