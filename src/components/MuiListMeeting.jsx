import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";
import DateDisplay from "./dateDisplay/DateDisplay";
import getTimeFromDateTime from "../helpers/timeFromDateTime";
import getDateDetails from "../helpers/getDateDetails";

export const MuiListMeeting = ({ listToShow, setSearchQuery, searchQuery }) => {
  const navigate = useNavigate();
  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
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
        {console.log(
          "value is ",
          listToShow.length,
          searchQuery !== "",
          searchQuery?.length
        )}
        {listToShow.length === 0 &&
        (searchQuery !== "" || searchQuery === "") ? (
          <EmptyState />
        ) : (
          listToShow?.map((item) => (
            <ListItem
              onClick={() =>
                navigate(`/boardmeeting/reports/${item.MeetingID ?? 0}`)
              }
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
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  height: "100%",
                  width: "100px",
                  padding: "8px",
                  textAlign: "center",
                  gap: "8px",
                }}
              >
                <DateDisplay
                  dateTorender={getDateDetails(item?.MeetingDate)?.day ?? 0}
                  monthTorender={getDateDetails(item?.MeetingDate)?.month ?? 0}
                  yearToRender={getDateDetails(item?.MeetingDate)?.year ?? 0}
                />
                {/* <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    color: "gray",
                    marginTop: "8px",
                    margin: "auto",
                  }}
                >
                  {getDateDetails(item?.MeetingDate)?.year ?? 0}
                </Typography> */}
              </Box>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      fontSize: {
                        xs: "16px",
                        lg: "18px",
                      },
                      letterSpacing: "-0.3px",
                      fontWeight: "500",
                      marginBottom: {
                        xs: "4px",
                        md: "8px",
                      },
                    }}
                  >
                    {item.MeetingVenue
                      ? item.MeetingVenue
                      : "No venue specified"}
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
                      Start time: {getTimeFromDateTime(item.MeetingStartTime)}
                    </Typography>
                    <Typography variant="body2">
                      End time: {getTimeFromDateTime(item.MeetingEndTime)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))
        )}
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
      day: PropTypes.number.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      MeetingVenue: PropTypes.string.isRequired,
    })
  ).isRequired,
  showIcon: PropTypes.bool,
  nextRoute: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

MuiListMeeting.defaultProps = {
  showIcon: false,
};
