import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { departmentList } from "../data/departmentList";
import { useState } from "react";
const Department = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

  // Filter departmentList based on searchQuery
  const filteredList = searchQuery
    ? departmentList.filter((department) =>
        department.name.toLowerCase().includes(searchQuery)
      )
    : departmentList;
  return (
    <>
      <ResponsiveAppBar
        icon={BusinessIcon}
        title="Department "
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
          //   backgroundColor: "red",
          maxWidth: "592px",
          margin: "auto",
        }}
      >
        <MuiList listToShow={filteredList} nextRoute="meetings" />
      </Box>
    </>
  );
};

export default Department;
