import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

import DescriptionIcon from "@mui/icons-material/Description";
import PdfViewer from "../components/pdfViewer/PdfViewer";
import { useCallback, useEffect, useState } from "react";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import { slideInRight } from "../helpers/animations";

const ViewDocument = () => {
  const [loading, setLoading] = useState(false);
  const [reportFile, setReportFile] = useState("");

  const getReportDetails = useCallback(async () => {
    const body = { meetingDetailId: 4417 };
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        "/BoardMeetingApi/api/Meeting/GetReportPathDetails",
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
      console.log("asdfasdfasfdasfd", responseData);
      if (responseData?.success) {
        setReportFile(responseData?.data?.ReportPath ?? "");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      setLoading(false);
      // throw new Error("Somethings went wrong");
    }
  }, []);
  useEffect(() => {
    getReportDetails();
  }, [getReportDetails]);

  console.log({ reportFile });

  function getDocumentUrl(reportFile) {
    try {
      // Decode base64 string to binary string
      const binaryString = atob(reportFile);
      // Convert binary string to Uint8Array
      const arrayBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        arrayBuffer[i] = binaryString.charCodeAt(i);
      }
      // Create Blob from Uint8Array
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      // Create URL for the Blob
      const url = window.URL.createObjectURL(blob);

      return url;
    } catch (error) {
      console.error("Error generating document URL:", error);
      return null;
    }
  }

  // Example usage
  const reportFiles =
    "FkEdofSG4YRZrSWSSHON9RQ+tgXRegE1WDEwmRN9soks4sUwNTmQ8S2nNBgSaqWDE2BTvrhgy7hYwtePtinYWP6FIm5tVrKQLC08dBQQF0LHKMo6jwvCLeI+H/XJ/ZoIRTbPrUAdrCXFCVR1U5EA1WE6aiuNJoPNPTAnrQTK9Og=";
  const documentUrl = getDocumentUrl(reportFiles);
  console.log("documentUrl", documentUrl);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={DescriptionIcon}
            title="View PDF"
            searchQuery={""}
            setSearchQuery={() => {}}
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
            <PdfViewer />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewDocument;
