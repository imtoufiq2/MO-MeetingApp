import PropTypes from "prop-types";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
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
    borderRadius: "8px", // Border radius
    border: `2px solid #dcd8d4b3`, // Gray border in normal state
    outline: "none", // Remove default outline

    "&:focus": {
      width: "100%", // Full width on focus
      border: `2px solid #f9af29`, // Orange border color on focus
    },

    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%", // Ensure full width is maintained on focus
      },
    },
  },
}));

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Search
      sx={{
        display: {
          xs: "block",
          lg: "none",
        },
        marginBottom: "12px",
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
          <ClearIcon />
        </IconButton>
      )}
    </Search>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
