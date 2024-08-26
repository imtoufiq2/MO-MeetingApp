// import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import DescriptionIcon from "@mui/icons-material/Description";
const ViewPdf = () => {
  return (
    <>
      <ResponsiveAppBar
        icon={DescriptionIcon}
        title="View Pdf"
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
            // xs: "24px",
            lg: "24px",
          },
        }}
      >
        asfdasdf
      </Box>
    </>
  );
};

export default ViewPdf;
