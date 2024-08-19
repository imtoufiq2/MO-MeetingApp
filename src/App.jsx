import {
  createBrowserRouter,
  // Navigate,
  RouterProvider,
} from "react-router-dom";
import ThemeCustomization from "./themes";
// import { Layout } from "./layout/mainLayout";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/reset_password";
import Verify from "./pages/auth/Verify";
import AssociatedCompanies from "./pages/AssociatedCompanies";
import Department from "./pages/Department";
import Reports from "./pages/Reports";
import Meetings from "./pages/Meetings";
// import { PrivateRoute } from "./pages/private-route";

const appLayout = createBrowserRouter([
  {
    path: `/`,
    children: [
      {
        path: "/",
        element: <AssociatedCompanies />,
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
        // element: <PrivateRoute element={<Department />} />,
        element: <Department />,
      },
      {
        path: "meetings/:id",
        // element: <PrivateRoute element={<Meetings />} />,
        element: <Meetings />,
      },
      {
        path: "reports/:id",
        // element: <PrivateRoute element={<Reports />} />,
        element: <Reports />,
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
    <>
      <ThemeCustomization>
        {/* <ThemeProvider theme={theme}> */}
        {/* <ToasterProvider> */}
        <RouterProvider router={appLayout} />
        {/* </ToasterProvider> */}
        {/* </ThemeProvider> */}
      </ThemeCustomization>
    </>
  );
}
export default App;
