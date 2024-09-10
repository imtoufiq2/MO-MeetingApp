import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Fab } from "@mui/material";
import { useGlobalHook } from "../../Contexts";
import { useLocation, useNavigate } from "react-router-dom";

export default function FloatingFooterAction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(1);
  const { darkMode, toggleDarkMode } = useGlobalHook();
  const noShow = [
    "/boardmeeting/sign-in",
    "/boardmeeting/verify-otp",
    "/boardmeeting/enter-mobile",
    "/boardmeeting/forgot-password",
  ];
  const hidePrivateIcon = noShow.some((path) =>
    location?.pathname.includes(path)
  );

  return (
    <>
      <div id="_spacing" style={{ height: "56px" }} />
      <Box
        id="_FloatingFooterAction_box"
        sx={{
          position: {
            xs: "Fixed",
            md: "Static",
          },
          zIndex: "100",
          right: "0px",
          bottom: "0px",
          left: "0px",
          boxShadow:
            "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.03), 0px -1px 0px 0px rgba(0,0,0,0.12)",
        }}
      >
        <BottomNavigation
          id="_bottom_navigation"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            bgcolor: darkMode ? "#343332" : "background.paper",

            "& .MuiBottomNavigationAction-root": {
              color: "#fbb02f", // Set color of non-active icons
            },
            "& .Mui-selected": {
              border: "none",
              outline: "none",
              // color: "red", // Set color of active icon
              // Remove border or outline
              "& .MuiBottomNavigationAction-icon": {
                border: "none",
                outline: "none",
              },
            },
            "& .MuiBottomNavigationAction-label": {
              // Optional: You can style labels here if needed
            },
          }}
        >
          <BottomNavigationAction
            sx={{ display: hidePrivateIcon ? "none" : "flex" }}
            label="Logout"
            onClick={() => {
              navigate("/boardmeeting/sign-in");
              sessionStorage.clear();
            }}
            icon={<ExitToAppRoundedIcon />}
          />
          <BottomNavigationAction
            // label="Favorites"
            sx={{ display: hidePrivateIcon ? "none" : "flex" }}
            icon={
              <Fab color="primary" aria-label="add">
                <HomeRoundedIcon />
              </Fab>
            }
          />

          <BottomNavigationAction
            label={`${darkMode ? "Light mode" : "Dark mode"}`}
            onClick={() => toggleDarkMode(!darkMode)}
            icon={<Brightness4RoundedIcon />}
          />
        </BottomNavigation>
      </Box>
    </>
  );
}
