import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { MuiList } from "../components/MuiList";
import { reportsList } from "../data/reports";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
const Reports = () => {
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");

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
          nextRoute="Reports"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </Box>
    </>
  );
};

export default Reports;
