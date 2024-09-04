import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  icon: Icon,
  title,
  searchQuery,
  setSearchQuery,
  logo,
}) {
  console.log({ logo });
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Auto-focus the input field on component mount
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Stack direction="row" gap={2} flexGrow={1} alignItems="center">
            {location?.pathname !== "/boardmeeting" && (
              <>
                <IconButton
                  onClick={() => navigate(-1)}
                  aria-label="back button"
                  sx={{
                    display: { xs: "block", lg: "none" },
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "&:focus": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize: 20, color: "white" }} />
                </IconButton>
                <Button
                  onClick={() => navigate(-1)}
                  variant="contained"
                  sx={{
                    display: { xs: "none", lg: "block" },
                    backgroundColor: "#f9af29",
                    border: "2px solid white",
                    maxHeight: "38px", // Updated maxHeight
                    color: "white",
                    borderRadius: "8px",
                    padding: "6px 12px", // Adjusted padding to fit within maxHeight
                    fontSize: "0.875rem", // Adjusted font size
                    lineHeight: "1.5", // Ensures text fits well
                    "&:hover": {
                      backgroundColor: "#f9af29",
                      border: "2px solid white",
                    },
                    "&:focus": {
                      outline: "none",
                      border: "none",
                    },
                    "&:active": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  Back
                </Button>
              </>
            )}

            <Stack
              direction={"row"}
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                paddingRight:
                  location?.pathname !== "/boardmeeting" ? "38px" : "0px",
              }}
            >
              <Icon sx={{ fontSize: 40 }} />
              {/* <img src={logo} alt="" /> */}
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            </Stack>
          </Stack>

          <Search
            sx={{
              visibility: location.pathname?.includes("/file/view")
                ? "hidden"
                : "visible",
              display: {
                xs: "none",
                lg: "block",
                border: "1.3px solid white",
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // inputRef={inputRef}
            />

            {searchQuery?.length > 0 && (
              <IconButton
                aria-label="clear"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  outline: "none",
                }}
              >
                <ClearIcon color="warning" />
              </IconButton>
            )}
          </Search>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: "63.99px" }}></Box>
    </Box>
  );
}

SearchAppBar.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  // handleSearch: PropTypes.func,
  setSearchQuery: PropTypes.func.isRequired,
};
