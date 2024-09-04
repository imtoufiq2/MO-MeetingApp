import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";

export const MuiList = ({
  showIcon,
  nextRoute = "",
  setSearchQuery,
  searchQuery,
  listToShow,
  loading,
  logo,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("locaton data", location.pathname.includes("/reports"));
  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase() ?? "");
    console.log(query);
  };

  return (
    <Box
      sx={{
        padding: {
          xs: "20px",
          lg: "0px",
        },
        paddingTop: {
          xs: "12px",
        },
      }}
    >
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
      />
      {/* {console.log({ searchQuery, setSearchQuery })} */}
      <List
        sx={{
          gap: {
            xs: "4px",
            md: "8px",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {listToShow.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          listToShow.map((cur, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                if (cur.CompanyID) {
                  navigate(`/boardmeeting/${nextRoute}/${cur.CompanyID ?? 0}`);
                } else if (cur.CommitteeID ?? 0) {
                  navigate(
                    `/boardmeeting/${nextRoute}/${cur.CommitteeID ?? 0}`
                  );
                } else {
                  navigate(
                    `/boardmeeting/${nextRoute}/${cur.MeetingDetailID ?? 0}`
                  );
                  if (location.pathname.includes("/reports")) {
                    sessionStorage.setItem("url", cur?.ReportPath ?? "");
                  }
                }
              }}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                bgcolor: "background.paper",
                margin: "4px 0",
                boxShadow: 1,
              }}
            >
              <ListItemButton>
                {showIcon && (
                  <ListItemIcon>
                    {/* <DescriptionIcon style={{ color: "#e67272" }} /> */}
                    <img
                      src={logo}
                      alt="pdf-icon"
                      style={{ width: "35px", height: "35px" }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        fontSize: "16px",
                        letterSpacing: "-0.3px",
                        fontWeight: "500",
                      }}
                    >
                      {location?.pathname === "/boardmeeting"
                        ? cur?.CompanyName
                        : location.pathname.includes("/boardmeeting/reports")
                        ? cur?.ReportName
                        : location.pathname.includes("/boardmeeting/department")
                        ? cur.CommitteeName
                        : cur.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

MuiList.propTypes = {
  showIcon: PropTypes.bool,
  loading: PropTypes.bool,
  nextRoute: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  listToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
