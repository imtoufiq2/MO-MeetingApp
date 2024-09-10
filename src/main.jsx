// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import Contexts from "./Contexts.jsx";

createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  <Contexts>
    {/* <StrictMode> */}
    <App />
    {/* </StrictMode> */}
  </Contexts>
  // </BrowserRouter>
);
