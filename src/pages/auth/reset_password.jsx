import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Stack } from "@mui/material";
import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    // <AuthWrapper>
    <Box
      className="poppins"
      sx={{
        minHeight: "100vh",
        paddingBlock: "20px",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign="center">
            {/* <Logo /> */}
            <img
              src="https://imgs.search.brave.com/-NLPufxpYH-GyQyrpsElVt4626cidyyBEX9hvyVjpA0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmFsdWVyZXNlYXJj/aG9ubGluZS5jb20v/Y29udGVudC1hc3Nl/dHMvaW1hZ2VzL2Z1/bmQtbmV3cy1tb3Rp/bGFsLW9zd2FsX193/MTIwX19oNjhfXy5q/cGc"
              alt="logo"
              className=""
              style={{ borderRadius: "10px" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Container component="main" maxWidth="2xl">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <Avatar sx={{ m: 1, bgcolor: "green" }}>
                  <LockOutlinedIcon />
                </Avatar> */}
                <Stack alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{ color: "primary.main", fontWeight: 500 }}
                  >
                    {/* MO Meeting App */}
                    Reset Password
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={2}
                  component="form"
                  direction="column"
                  onSubmit={handleSubmit}
                  noValidate
                  // sx={{ mt: 1, width: { md: "30%", xs: "100%" } }}
                  sx={{
                    mt: 1,
                    width: {
                      xs: "100%", // 100% width for extra-small screens
                      sm: "450px", // 30% width for medium screens and larger
                    },
                  }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      id="_form_control"
                      variant="standard"
                      fullWidth
                      sx={{
                        gap: { xs: "20px", md: "28px" },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h3"
                          component="h3"
                          className="label d-flex items-center"
                        >
                          Mobile
                          <sup className="asc">*</sup>
                        </Typography>
                        <BootstrapInput
                          fullWidth
                          id="email"
                          size="small"
                          label="Email Address"
                          name="email"
                          placeholder="Enter Registered Mobile Number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 1,
                          flexDirection: { xs: "column-reverse", md: "row" },
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            borderColor: "primary.main",
                            color: "primary.main",
                            backgroundColor: "secondary.main",
                            "&:hover": {
                              borderColor: "#f57c00",
                              backgroundColor: "secondary.main",
                            },
                            "&:active": {
                              border: "none",
                              backgroundColor: "secondary.light",
                            },
                            "&:focus": {
                              border: "none",
                              outline: "none",
                            },
                          }}
                          onClick={() => navigate("/sign-in")}
                        >
                          Cancel
                        </Button>

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: "primary.main",
                            borderColor: "primary.main",
                            "&:hover": {
                              borderColor: "primary.main",
                            },
                            "&:active": {
                              border: "none",
                              outline: "none",
                            },
                            "&:focus": {
                              border: "none",
                              outline: "none",
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    // </AuthWrapper>
  );
}
