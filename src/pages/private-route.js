import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const userToken = localStorage.getItem('userToken'); // Retrieve the token from local storage
  const location = useLocation(); // To redirect back after sign-in

  // Redirect to sign-in and remember the attempted route
  if (!userToken) {
    localStorage.setItem('redirectAfterSignin', JSON.stringify(location.pathname));
    return <Navigate to="/sign-in" replace />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
