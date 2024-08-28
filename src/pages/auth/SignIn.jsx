import { useState } from "react";
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
import encryptData from "../../helpers/encryption";
import decryptData from "../../helpers/decryption";
import toast from "react-hot-toast";
// import BaBranding_logo from "../assets/img/BaBranding_logo.png";
import brandingLogo from "../../assets/img/BaBranding_logo.png";
import { LoadingButton } from "@mui/lab";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("values is", values);

    const body = {
      iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
      authType: "client_credentials",
      clientCode: "kailash.purohit@motilaloswal.com",
      password: "bW9zbEAxMjM0",
      clientToken: "",
    };

    try {
      const encryptedData = encryptData(body);

      const response = await fetch("/BoardMeetingApi/api/Login/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
        },
        body: encryptedData,
      });

      const result = await response.text();

      const responseData = decryptData(result);

      console.log("responseData", responseData);

      if (responseData?.success) {
        sessionStorage.setItem("loginData", JSON.stringify(responseData?.data));
        navigate("/");
        resetForm();
      } else if (responseData?.message) {
        toast.error(responseData?.message);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

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
            {/* <img
              src={brandingLogo}
              alt="logo"
              style={{ borderRadius: "10px", width: "150px", height: "100px" }}
            /> */}
            <Box
              component="img"
              src={brandingLogo}
              alt="logo"
              sx={{
                borderRadius: "10px",
                width: { xs: "100px", sm: "150px" },
                height: { xs: "auto", sm: "90px" },
                objectFit: "inherit",
              }}
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
                  validateOnChange={true}
                >
                  {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    submitCount,
                    isSubmitting,
                  }) => (
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
                              value={values.email}
                              onChange={handleChange}
                              error={
                                submitCount > 0 &&
                                (touched.email || !!errors.email)
                              }
                            />
                            {submitCount > 0 &&
                              (touched.email || !!errors.email) && (
                                <Typography
                                  color="error"
                                  variant="caption"
                                  component="div"
                                >
                                  <ErrorMessage name="email" />
                                </Typography>
                              )}
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
                              value={values.password}
                              onChange={handleChange}
                              error={
                                submitCount > 0 &&
                                (touched.password || !!errors.password)
                              }
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
                            {submitCount > 0 &&
                              (touched.password || !!errors.password) && (
                                <Typography
                                  color="error"
                                  variant="caption"
                                  component="div"
                                >
                                  <ErrorMessage name="password" />
                                </Typography>
                              )}
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
                          <LoadingButton
                            loading={isSubmitting}
                            loadingPosition="center"
                            type="submit"
                            fullWidth
                            aria-label="login button"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                              backgroundColor: isSubmitting
                                ? "rgba(251, 140, 0, 0.5)"
                                : "primary.main",
                              borderColor: isSubmitting
                                ? "rgba(251, 140, 0, 0.5)"
                                : "primary.main",
                              "&:hover": {
                                borderColor: isSubmitting
                                  ? "rgba(251, 140, 0, 0.5)"
                                  : "primary.main",
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
                          </LoadingButton>

                          {/* <LoadingButton
                            loading={!isSubmitting}
                            loadingPosition="center"
                            type="submit"
                            fullWidth
                            aria-label="login button"
                            variant="contained"
                            disabled={isSubmitting}
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
                          </LoadingButton> */}
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
