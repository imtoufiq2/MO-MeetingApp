import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { useDispatch, } from "react-redux";
// import { clearProfile } from "../../redux/slices/userSlice";

// const verifyToken = (authToken) => {
//   if (!authToken) {
//     return false;
//   }
//   const decoded = jwtDecode(authToken);
//   return decoded.exp > Date.now() / 1000;
// };
function AuthGuard({ children }) {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const token = useSelector((state) => state.user.token);
  const token = JSON.parse(sessionStorage.getItem("loginData"))?.accessToken;
//   console.log("session data", JSON.parse(sessionStorage.getItem("loginData"))?.accessToken)
  useEffect(() => {
    // if (!verifyToken(token)) {
    if (!token) {
      navigate("/boardmeeting/sign-in", { replace: true });
    }

  }, [token, navigate]);

  if (!token) {
    // console.log(verifyToken(token));
    return null; // Prevent rendering if token is not valid
  }


  return children;
}

export default AuthGuard;
