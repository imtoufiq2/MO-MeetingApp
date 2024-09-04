import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();

  // const token = "token";
  // console.log(
  // )
  const token = JSON.parse(sessionStorage.getItem("loginData"))?.accessToken;
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/boardmeeting/sign-in" state={{ from: location }} replace />
  );
};

export { PrivateRoute };