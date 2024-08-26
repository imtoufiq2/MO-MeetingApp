import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import BusinessIcon from "@mui/icons-material/Business";
import { MuiList } from "../components/MuiList";
import { departmentList } from "../data/departmentList";
import { useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
const Department = () => {
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value) => {
    setSearchQuery(value.trim().toLowerCase());
  };

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
          nextRoute="meetings"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </Box>
    </>
  );
};

export default Department;
