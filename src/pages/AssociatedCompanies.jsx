import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { useEffect, useState } from "react";
import CompanyList from "../data/companyList";
import useScrollToTop from "../hooks/useScrollToTop";

const AssociatedCompanies = () => {
  useScrollToTop();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = searchQuery
    ? CompanyList.filter((company) =>
        company.name.toLowerCase().includes(searchQuery)
      )
    : CompanyList;

  useEffect(() => {
    // throw new Error("This is a simulated error in the FallbackComponent");
  }, []);
  return (
    <Box>
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
            // xs: "24px",
            lg: "24px",
          },
        }}
      >
        <MuiList
          listToShow={filteredList}
          nextRoute="department"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </Box>
      {/* <PdfView /> */}
    </Box>
  );
};

export default AssociatedCompanies;
