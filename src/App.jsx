import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ThemeCustomization from "./themes";
// import { Layout } from "./layout/mainLayout";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/reset_password";
import Verify from "./pages/auth/Verify";

const appLayout = createBrowserRouter([
  {
    path: `/`,
    // element: (
    //   // <AuthGuard>
    //   // </AuthGuard>
    //   // <CommonLayout />
    //   <>Heyyy</>
    // ),
    children: [
      {
        path: "/",
        element: <Navigate to="/sign-in" />,
      },
      // {
      //   path: "sign-up",
      //   element: <SignUp />,
      // },
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
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "home",
        // element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <></>,
          },
        ],
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
