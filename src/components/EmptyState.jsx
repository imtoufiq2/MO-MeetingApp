import { Typography, Container } from "@mui/material";

const EmptyState = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 130px)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#f8a206" }}>
        No data found
      </Typography>
      <Typography variant="body1" sx={{ color: "#f8a206" }}>
        Please try another keyword
      </Typography>
    </Container>
  );
};

export default EmptyState;
