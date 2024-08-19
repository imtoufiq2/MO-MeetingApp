import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { MuiList } from "../components/MuiList";
import { reportsList } from "../data/reports";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  // Filter reportsList based on searchQuery
  const filteredList = searchQuery
    ? reportsList.filter((report) =>
        report.name.toLowerCase().includes(searchQuery)
      )
    : reportsList;
  return (
    <>
      <ResponsiveAppBar
        icon={DescriptionIcon}
        title="Reports"
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
        <MuiList listToShow={filteredList} showIcon />
      </Box>
    </>
  );
};

export default Reports;
