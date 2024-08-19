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

export const MuiList = ({ listToShow, showIcon, nextRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        padding: {
          xs: "20px",
          lg: "0px",
        },
      }}
    >
      <List
        sx={{
          gap: {
            xs: "4px", // Small screens
            md: "8px", // Medium screens and up
          },
          display: "flex",
          flexDirection: "column", // Ensure items stack vertically
        }}
      >
        {listToShow?.length === 0 ? (
          <EmptyState />
        ) : (
          listToShow?.map((cur) => (
            <ListItem
              onClick={() => {
                if (cur.id && !location?.pathname?.includes("reports")) {
                  navigate(`/${nextRoute}/${cur.id}`);
                }
              }}
              key={cur.id}
              disablePadding
              sx={{
                borderRadius: "8px",
                overflow: "hidden", // Ensure rounded corners work properly
                bgcolor: "background.paper", // Optional: Add background color to visualize the border radius
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
  listToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  showIcon: PropTypes.bool,
  nextRoute: PropTypes.string.isRequired,
};

MuiList.defaultProps = {
  showIcon: false,
};
