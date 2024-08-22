import { Routes, Route } from "react-router-dom";
import AssociatedCompanies from "../pages/AssociatedCompanies";
import SignIn from "../pages/auth/SignIn";
import VerifyMobile from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/reset_password";
import Department from "../pages/Department";
import Meetings from "../pages/Meetings";
import Reports from "../pages/Reports";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "../components/SomethingWentWrong";

const Routers = () => {
  function FallbackComponent() {
    return <SomethingWentWrong />;
  }
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Routes>
        <Route path="/" element={<AssociatedCompanies />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify-otp" element={<VerifyMobile />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/department/:id" element={<Department />} />
        <Route path="/meetings/:id" element={<Meetings />} />
        <Route path="/reports/:id" element={<Reports />} />
        <Route path="/*" element={<>No page found</>} />
      </Routes>
    </ErrorBoundary>
  );
};

export default Routers;
