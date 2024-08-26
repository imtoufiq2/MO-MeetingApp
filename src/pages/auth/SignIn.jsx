import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BootstrapInput } from "../../utils/Input/textfield";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import encryptData from "../../helpers/encryption";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("vlaues is", values);
    navigate("/");
    resetForm();
    // Prepare the data to be encrypted
    // const bodyData = {
    //   iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
    //   authType: "client_credentials",
    //   clientToken: "",
    //   password: values.password, // Use Formik value for password
    //   clientCode: values.email, // Use Formik value for email
    // };

    // try {
    //   const encryptedData = encryptData(bodyData);

    //   const response = await fetch(
    //     "https://prd.motilaloswal.com/BoardMeetingApi/api/Login/authorize",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
    //         Referer: "http://localhost:5173/",
    //         "Sec-CH-UA":
    //           '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
    //         "Sec-CH-UA-Mobile": "?0",
    //         "Sec-CH-UA-Platform": '"Windows"',
    //         "User-Agent":
    //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    //         "Accept-Encoding": "br",
    //       },
    //       body: encryptedData,
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error making POST request:", error);
    // }
  };

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box
      className="poppins"
      sx={{
        minHeight: "100vh",
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
                <Stack alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{ color: "primary.main", fontWeight: 500 }}
                  >
                    Login
                  </Typography>
                </Stack>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnBlur={false}
                  // validateOnChange={false}
                >
                  {({ values, handleChange, errors }) => (
                    <Form style={{ width: "100%" }}>
                      <Grid
                        container
                        spacing={2}
                        direction="column"
                        sx={{
                          mt: 1,
                          width: {
                            xs: "100%",
                            sm: "450px",
                          },
                          margin: {
                            // xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        <Grid item xs={12}>
                          <FormControl variant="standard" fullWidth>
                            <Typography className="label d-flex items-center">
                              Email
                              <sup className="asc">*</sup>
                            </Typography>
                            <Field
                              name="email"
                              as={BootstrapInput}
                              fullWidth
                              id="email"
                              size="small"
                              placeholder="Email"
                            />
                            <Typography
                              color="error"
                              variant="caption"
                              component="div"
                            >
                              <ErrorMessage name="email" />
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl variant="standard" fullWidth>
                            <Typography className="label d-flex items-center">
                              Password
                              <sup className="asc">*</sup>
                            </Typography>
                            <Field
                              name="password"
                              as={BootstrapInput}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              fullWidth
                              size="small"
                              placeholder="Password"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <Visibility fontSize="small" />
                                    ) : (
                                      <VisibilityOff fontSize="small" />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />

                            <Typography
                              color="error"
                              variant="caption"
                              component="div"
                            >
                              <ErrorMessage name="password" />
                            </Typography>
                          </FormControl>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          alignItems="flex-end"
                          onClick={() => navigate("/forgot-password")}
                        >
                          <Link
                            component="button"
                            className="custom-link"
                            underline="none"
                            sx={{ cursor: "pointer" }}
                          >
                            <Typography variant="caption">
                              Forgot password?
                            </Typography>
                          </Link>
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            fullWidth
                            aria-label="login button"
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
                            Sign In
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
