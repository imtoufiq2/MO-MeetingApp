import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Groups2Icon from "@mui/icons-material/Groups2";
import { MuiListMeeting } from "../components/MuiListMeeting";
// import { MeetingLists } from "../data/MeetingList";
import { useCallback, useEffect, useState } from "react";

import useScrollToTop from "../hooks/useScrollToTop";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import EmptyState from "../components/EmptyState";
import { useParams } from "react-router-dom";
import { slideInRight } from "../helpers/animations";

const Meetings = () => {
  useScrollToTop();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [meetingsData, setMeetingsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  const filteredList = searchQuery
    ? meetingsData.filter(
        (meeting) =>
          meeting.MeetingVenue.toLowerCase().includes(searchQuery) ||
          meeting.MeetingStartTime.toLowerCase().includes(searchQuery) ||
          meeting.MeetingEndTime.toLowerCase().includes(searchQuery) ||
          meeting.MeetingDate.toLowerCase().includes(searchQuery) ||
          meeting.MeetingID.toString().includes(searchQuery)
      )
    : meetingsData;

  const getMeetings = useCallback(async () => {
    const body = { committeid: id ?? 0 };
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch("/BoardMeetingApi/api/Meeting/GetMeetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
          }`,
          clientCode: "kailash.purohit@motilaloswal.com",
          "Accept-Encoding": "br",
        },
        body: encryptedData,
      });
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      console.log("responseData", responseData?.success, responseData?.data);
      if (responseData?.success) {
        setMeetingsData(responseData?.data);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !loading && meetingsData?.length === 0 ? (
        <EmptyState
          title="No data available"
          subTitle="We couldn't retrieve any data from the server."
        />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
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
        </Box>
      )}
    </>
  );
};

export default Meetings;
