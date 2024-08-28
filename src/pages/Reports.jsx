import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { MuiList } from "../components/MuiList";
// import { reportsList } from "../data/reports";
import { useCallback, useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import useScrollToTop from "../hooks/useScrollToTop";
import { slideInRight } from "../helpers/animations";

const Reports = () => {
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter reportsList based on searchQuery
  const filteredList = searchQuery
    ? reportsData.filter((report) =>
        report.name.toLowerCase().includes(searchQuery)
      )
    : reportsData;

  const getReports = useCallback(async () => {
    const body = { meetingDetailId: "494" }; //TODO
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        "/BoardMeetingApi/api/Meeting/GetMeetingDetails",
        {
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
        }
      );
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      console.log("responseData", responseData?.success, responseData);
      if (responseData?.success) {
        setReportsData(responseData?.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error making POST request:", error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getReports();
  }, [getReports]);
  return (
    <>
      {loading && !searchQuery ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={DescriptionIcon}
            title="Reports"
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
            <MuiList
              listToShow={filteredList}
              showIcon
              nextRoute="file/view"
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Reports;
