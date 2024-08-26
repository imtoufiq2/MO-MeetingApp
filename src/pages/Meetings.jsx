import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Groups2Icon from "@mui/icons-material/Groups2";
import { MuiListMeeting } from "../components/MuiListMeeting";
import { MeetingLists } from "../data/MeetingList";
import { useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
const Meetings = () => {
  useScrollToTop();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  const filteredList = searchQuery
    ? MeetingLists.filter(
        (meeting) =>
          meeting.startTime.toLowerCase().includes(searchQuery) ||
          meeting.endTime.toLowerCase().includes(searchQuery) ||
          meeting.month.toLowerCase().includes(searchQuery) ||
          meeting.day.toString().includes(searchQuery) ||
          meeting.year.toString().includes(searchQuery) ||
          meeting.address.toLowerCase().includes(searchQuery)
      )
    : MeetingLists;

  return (
    <>
      <ResponsiveAppBar
        icon={Groups2Icon}
        title="Meetings"
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box
        className="poppins"
        sx={{
          minHeight: "100vh",
          overflow: "hidden",
          maxWidth: "592px",
          margin: "auto",
          marginTop: {
            // xs: "24px",
            lg: "24px",
          },
        }}
      >
        <MuiListMeeting
          listToShow={filteredList}
          nextRoute="department"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </Box>
    </>
  );
};

export default Meetings;
