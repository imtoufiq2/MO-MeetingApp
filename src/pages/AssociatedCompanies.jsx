import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { CompanyList } from "../data/CompanyList";
import PdfView from "../components/PdfView";
import { useState } from "react";

const AssociatedCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };
  console.log("asdfasdfasd", searchQuery);
  // Filter CompanyList based on searchQuery
  const filteredList = searchQuery
    ? CompanyList.filter((company) =>
        company.name.toLowerCase().includes(searchQuery)
      )
    : CompanyList;
  return (
    <>
      <ResponsiveAppBar
        icon={BusinessIcon}
        title="Associated Companies"
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
        }}
      >
        <MuiList listToShow={filteredList} nextRoute="department" />
      </Box>
      <PdfView />
    </>
  );
};

export default AssociatedCompanies;
