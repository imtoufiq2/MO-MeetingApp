import { Grid, Box } from "@mui/material";

function ResponsiveImage() {
  return (
    <Grid item xs={12} textAlign="center">
      <Box
        component="img"
        src="https://imgs.search.brave.com/-NLPufxpYH-GyQyrpsElVt4626cidyyBEX9hvyVjpA0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmFsdWVyZXNlYXJj/aG9ubGluZS5jb20v/Y29udGVudC1hc3Nl/dHMvaW1hZ2VzL2Z1/bmQtbmV3cy1tb3Rp/bGFsLW9zd2FsX193/MTIwX19oNjhfXy5q/cGc"
        alt="logo"
        sx={{
          borderRadius: "10px",
          width: {
            xs: "100px",
            md: "120px",
          },
        }}
      />
    </Grid>
  );
}

export default ResponsiveImage;
