import { Box, Container, Typography } from "@mui/material";
import offlineImage from "../assets/img/offline_image.svg";
const NoInternetConnection = () => {
  //TODO hanlde offline and all validation and offline data show background script
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "240px",
        bgcolor: "background.paper",
        textAlign: "center",
        // border: "1px solid",
        borderColor: "#D7DFE9",
        borderRadius: 2,
        // height: "100vh",
        // marginTop: "50%",
        transform: "translateY(50%)",
        p: 3,
        maxWidth: "592px",
      }}
    >
      <Box
        component="img"
        src={offlineImage}
        alt="Offline"
        sx={{ maxWidth: "140px", width: "100%", height: "auto" }}
      />{" "}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#f8a206",
          fontWeight: 600,
          fontSize: "1.25rem", // Using rem for better responsiveness
          lineHeight: 1.75, // Using unitless line-height for better scaling
          letterSpacing: "-0.3px",
        }}
      >
        You’re offline
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#f8a206",
          fontWeight: 400,
          fontSize: "0.875rem", // Using rem for better responsiveness
          lineHeight: 1.5, // Using unitless line-height for better scaling
          letterSpacing: "-0.2px",
        }}
      >
        It seems you are not connected to the internet. Please check your
        connection and try again.{" "}
      </Typography>
    </Container>
  );
};

export default NoInternetConnection;
