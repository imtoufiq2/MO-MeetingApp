import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Groups2Icon from "@mui/icons-material/Groups2";
import { MuiListMeeting } from "../components/MuiListMeeting";
import { MeetingLists } from "../data/MeetingList";
import { useState } from "react";
const Meetings = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  // Filter MeetingLists based on searchQuery
  const filteredList = searchQuery
    ? MeetingLists.filter(
        (meeting) =>
          meeting.startTime.toLowerCase().includes(searchQuery) ||
          meeting.endTime.toLowerCase().includes(searchQuery) ||
          meeting.date.toLowerCase().includes(searchQuery) ||
          meeting.count.toString().includes(searchQuery) ||
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
          // paddingBlock: "20px",
          overflow: "hidden",

          maxWidth: "592px",
          margin: "auto",
        }}
      >
        <MuiListMeeting listToShow={filteredList} />
      </Box>
    </>
  );
};

export default Meetings;
