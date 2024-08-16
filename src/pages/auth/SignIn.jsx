import { useState } from "react";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

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
                    Login
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
                    <FormControl variant="standard" fullWidth>
                      <Typography className="label d-flex items-center">
                        Email
                        <sup className="asc">*</sup>
                      </Typography>
                      <BootstrapInput
                        fullWidth
                        id="email"
                        size="small"
                        label="Email Address"
                        name="email"
                        placeholder="Email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // inputProps={{
                        //   "aria-label": "weight",
                        // }}
                      />
                      {/* <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        // autoFocus
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      /> */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <Typography className="label d-flex items-center">
                        Password
                        <sup className="asc">*</sup>
                      </Typography>
                      <BootstrapInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        size="small"
                        label="Password"
                        name="password"
                        placeholder="Password"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseDownPassword}
                              edge="end"
                              color="text.greyLight"
                            >
                              {showPassword ? (
                                <Visibility
                                  fontSize="small"
                                  color="text.greyLight"
                                />
                              ) : (
                                <VisibilityOff fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}></Grid>

                  <Grid item xs={6} alignItems="flex-end">
                    {/* <Link href="#" className="custom-link" onClick={()=>navigate("/forgot-password")}>
                      <Typography variant="caption">
                        Forgot password?
                      </Typography>
                    </Link> */}
                    <Link
                      component="button" // Use component="button" to make the Link behave like a button
                      className="custom-link"
                      onClick={() => navigate("/forgot-password")}
                      underline="none" // Optional: Remove underline if you don't want it
                      sx={{ cursor: "pointer" }} // Ensure pointer cursor
                    >
                      <Typography variant="caption">
                        Forgot password?
                      </Typography>
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      // type="submit"
                      fullWidth
                      aria-label="login button"
                      variant="contained"
                      // sx={{ mt: 1, mb: 1, backgroundColor: "primary.main" }}
                      sx={{
                        // mt: 1,
                        // mb: 1,
                        backgroundColor: "primary.main",
                        borderColor: "primary.main",
                        // color: "primary.main", // Optional: changes the text color to red as well
                        "&:hover": {
                          borderColor: "primary.main", // Optional: changes the border color on hover
                        },
                        "&:active": {
                          border: "none", // Removes the border
                          outline: "none", // Removes the outline
                        },
                        "&:focus": {
                          border: "none", // Removes the border
                          outline: "none", // Removes the outline
                        },
                      }}
                      onClick={() => {
                        navigate("/home/dashboard");
                      }}
                    >
                      Sign In
                    </Button>
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
