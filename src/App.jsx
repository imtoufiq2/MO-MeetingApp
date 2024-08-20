import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import PropTypes from "prop-types";

import ThemeCustomization from "./themes";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/reset_password";
import Verify from "./pages/auth/Verify";
import AssociatedCompanies from "./pages/AssociatedCompanies";
import Department from "./pages/Department";
import Reports from "./pages/Reports";
import Meetings from "./pages/Meetings";

function isUserAuthenticated() {
  // return !!localStorage.getItem("authToken");
  return true;
}

function PrivateRoute({ children }) {
  const isUserAuthenticatedUser = isUserAuthenticated();
  return isUserAuthenticatedUser ? children : <Navigate to="/sign-in" />;
}
// PropTypes validation for PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const appLayout = createBrowserRouter([
  {
    path: `/`,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <AssociatedCompanies />
          </PrivateRoute>
        ),
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "verify-otp",
        element: <Verify />,
      },
      {
        path: "forgot-password",
        element: <ResetPassword />,
      },
      {
        path: "department/:id",
        element: (
          <PrivateRoute>
            <Department />
          </PrivateRoute>
        ),
      },
      {
        path: "meetings/:id",
        element: (
          <PrivateRoute>
            <Meetings />
          </PrivateRoute>
        ),
      },
      {
        path: "reports/:id",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <>No page found</>,
  },
]);

function App() {
  return (
    <ThemeCustomization>
      <RouterProvider router={appLayout} />
    </ThemeCustomization>
  );
}

export default App;
