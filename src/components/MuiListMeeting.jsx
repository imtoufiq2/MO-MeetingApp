import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MuiListMeeting = ({ listToShow }) => {
  const navigate = useNavigate();
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
            xs: "4px",
            md: "8px",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {console.log("itesadfasdas", listToShow?.[0])}
        {listToShow?.map((item) => (
          <ListItem
            onClick={() => navigate(`/reports/${item.id}`)}
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "flex-start", // Align to the top
              cursor: "pointer",
              gap: {
                xs: "8px",
                lg: "12px",
              },
              borderRadius: "8px",
              overflow: "hidden",
              bgcolor: "background.paper",
              margin: "4px 0",
              paddingRight: "12px",
              paddingLeft: "5px",
              boxShadow: 1,
            }}
            disablePadding
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                height: "100%",
                width: "100px",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <div
                id="_logo"
                style={{
                  width: "60px",
                  height: "35px",
                  backgroundColor: "#fb8c00",
                  borderRadius: "40% 40% 0 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                {item.count} {/* Display dynamic count */}
              </div>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  color: "gray",
                  marginTop: "8px",
                }}
              >
                {item.date}
              </Typography>
            </div>

            <ListItemText
              primary={
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontSize: "18px",
                    letterSpacing: "-0.3px",
                    fontWeight: "500",
                    marginBottom: {
                      xs: "4px",
                      md: "8px",
                    },
                  }}
                >
                  {item.address}
                </Typography>
              }
              secondary={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <Typography variant="body2">
                    Start time: {item.startTime}
                  </Typography>
                  <Typography variant="body2">
                    End time: {item.endTime}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

MuiListMeeting.propTypes = {
  listToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  showIcon: PropTypes.bool,
};

MuiListMeeting.defaultProps = {
  showIcon: false,
};
