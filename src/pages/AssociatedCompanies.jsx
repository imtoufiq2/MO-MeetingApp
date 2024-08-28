// import { Box } from "@mui/material";
// import ResponsiveAppBar from "../components/ResponsiveAppBar";
// import BusinessIcon from "@mui/icons-material/Business";
// import { MuiList } from "../components/MuiList";
// import { useCallback, useEffect, useState } from "react";
// // import CompanyList from "../data/companyList";
// import useScrollToTop from "../hooks/useScrollToTop";
// import encryptData from "../helpers/encryption";
// import decryptData from "../helpers/decryption";
// import Loader from "../components/loader/Loader";
// import EmptyState from "../components/EmptyState";
// // import EmptyState from "../components/EmptyState";

// const AssociatedCompanies = () => {
//   useScrollToTop();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [associatedCompanies, setAssociatedCompanies] = useState([]);

//   const filteredList = searchQuery
//     ? associatedCompanies.filter(
//         (company) =>
//           company.CompanyName.toLowerCase().includes(
//             searchQuery.toLowerCase()
//           ) ||
//           company.CommitteeID.toString().includes(searchQuery) ||
//           company.CommitteeName.toLowerCase().includes(
//             searchQuery.toLowerCase()
//           ) ||
//           company.CommitteeShortName.toLowerCase().includes(
//             searchQuery.toLowerCase()
//           )
//       )
//     : associatedCompanies;

//   useEffect(() => {
//     // throw new Error("This is a simulated error in the FallbackComponent");
//   }, []);
//   const getDepartments = useCallback(async () => {
//     const body = { committeid: "20" };
//     try {
//       setLoading(true);
//       const encryptedData = encryptData(body);
//       const response = await fetch(
//         "/BoardMeetingApi/api/Meeting/Getcommittee",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
//             Authorization: `Bearer ${
//               JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
//             }`,
//             clientCode: "kailash.purohit@motilaloswal.com",
//             "Accept-Encoding": "br",
//           },
//           body: encryptedData,
//         }
//       );
//       // Handle non-JSON responses
//       const result = await response.text();

//       const responseData = decryptData(result);
//       if (responseData?.success) {
//         // responseData?.data
//         setAssociatedCompanies(responseData?.data ?? []);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error making POST request:", error);
//       setLoading(false);
//       throw new Error("Somethings went wrong");
//     }
//   }, []);
//   useEffect(() => {
//     getDepartments();
//   }, [getDepartments]);

//   return (
//     <>
//       {loading && !searchQuery ? (
//         <Loader />
//       ) : (
//         <Box>
//           <ResponsiveAppBar
//             icon={BusinessIcon}
//             title="Associated Companies"
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />

//           <Box
//             className="poppins"
//             sx={{
//               minHeight: "100vh",
//               overflow: "hidden",
//               maxWidth: "592px",
//               margin: "auto",
//               marginTop: {
//                 lg: "24px",
//               },
//             }}
//           >
//             {!loading && associatedCompanies?.length === 0 ? (
//               <EmptyState
//                 title="No data available"
//                 subTitle="We couldn't retrieve any data from the server."
//               />
//             ) : (
//               <MuiList
//                 listToShow={filteredList}
//                 nextRoute="department"
//                 setSearchQuery={setSearchQuery}
//                 searchQuery={searchQuery}
//                 loading={loading}
//               />
//             )}
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default AssociatedCompanies;

import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { useCallback, useEffect, useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import EmptyState from "../components/EmptyState";
import { groupDataByCompany } from "../helpers/groupDataByCompany";
import { slideInRight } from "../helpers/animations";

const AssociatedCompanies = () => {
  useScrollToTop();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [associatedCompanies, setAssociatedCompanies] = useState([]);

  const filteredList = searchQuery
    ? associatedCompanies.filter(
        (company) =>
          company.CompanyName.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          company.CommitteeID.toString().includes(searchQuery) ||
          company.CommitteeName.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          company.CommitteeShortName.toLowerCase().includes(
            searchQuery.toLowerCase()
          )
      )
    : associatedCompanies;

  useEffect(() => {
    // throw new Error("This is a simulated error in the FallbackComponent");
  }, []);

  const getDepartments = useCallback(async () => {
    const body = { committeid: "20" };
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        "/BoardMeetingApi/api/Meeting/Getcommittee",
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
      console.log("check data", responseData?.data);
      if (responseData?.success) {
        // responseData?.data
        setAssociatedCompanies(groupDataByCompany(responseData?.data) ?? []);
        sessionStorage.setItem(
          "companiesData",
          encryptData(JSON.stringify(responseData?.data) ?? [])
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      setLoading(false);
      throw new Error("Somethings went wrong");
    }
  }, []);

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

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
            icon={BusinessIcon}
            title="Associated Companies"
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
            {!loading && associatedCompanies?.length === 0 ? (
              <EmptyState
                title="No data available"
                subTitle="We couldn't retrieve any data from the server."
              />
            ) : (
              <MuiList
                listToShow={filteredList}
                nextRoute="department"
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                loading={loading}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AssociatedCompanies;
