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
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <Box
      sx={{
        padding: {
          // xs: "20px",
          // lg: "0px",
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
        {listToShow.length === 0 ? (
          <EmptyState />
        ) : (
          listToShow.map((cur) => (
            <ListItem
              key={cur.id}
              disablePadding
              onClick={() => {
                if (cur.id && !location.pathname.includes("reports")) {
                  navigate(`/${nextRoute}/${cur.id}`);
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
                    <DescriptionIcon style={{ color: "#e67272" }} />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{
                        fontSize: "18px",
                        letterSpacing: "-0.3px",
                        fontWeight: "500",
                      }}
                    >
                      {cur.name}
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
