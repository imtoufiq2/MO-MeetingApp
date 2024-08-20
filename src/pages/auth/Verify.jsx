import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Stack, TextField } from "@mui/material";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import ResponsiveImage from "../../components/Logo";
import { useEffect, useRef, useState } from "react";

const numberOfDigits = 4;
export default function VerifyMobile() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));

  const otpBoxReference = useRef([]);
  const inputRefs = useRef([]);

  function handlePaste(e, index) {
    e.preventDefault();
    const pastedOtp = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedOtp)) {
      if (pastedOtp.length === numberOfDigits) {
        const otpDigits = pastedOtp.split("");
        setOtp(otpDigits);
        if (index < numberOfDigits - 1) {
          otpBoxReference.current[index + 1].focus();
        }
      } else {
        // toast("Please enter exactly 6 digits for the OTP", {
        //   icon: "⚠️",
        //   iconTheme: {
        //     primary: "#FFA500",
        //     secondary: "#000000",
        //   },
        //   style: {
        //     borderRadius: "10px",
        //     background: "#FFA500",
        //     color: "#fff",
        //   },
        // });
      }
    } else {
      // toast("Please enter only numeric characters for the OTP", {
      //   icon: "⚠️",
      //   iconTheme: {
      //     primary: "#FFA500",
      //     secondary: "#000000",
      //   },
      //   style: {
      //     borderRadius: "10px",
      //     background: "#FFA500",
      //     color: "#fff",
      //   },
      // });
    }
  }

  function handleChange(value, index) {
    if (value.length <= 1 && !isNaN(value) && value !== "e") {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    } else if (value.length > 1) {
      let newDigit = value.charAt(value.length - 1);
      let newArr = [...otp];
      newArr[index] = newDigit;
      setOtp(newArr);

      if (newDigit && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index].value = "";
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  return (
    // <AuthWrapper>
    <Box
      className="poppins"
      sx={{
        minHeight: "100vh",
        // paddingBlock: "20px",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <Grid container spacing={3}>
          <ResponsiveImage />
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
                    Enter OTP
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={2}
                  component="form"
                  direction="column"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, width: { xs: "100%", sm: "400px" } }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      id="_form_control"
                      variant="standard"
                      fullWidth
                      sx={{ gap: { xs: "20px", md: "28px" } }}
                    >
                      <Box>
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="space-between"
                        >
                          {otp.map((digit, index) => (
                            <Grid item key={index}>
                              <TextField
                                id={`otp-input-${index}`}
                                value={digit}
                                inputMode="numeric"
                                maxLength={1}
                                placeholder="•"
                                onPaste={(e) => handlePaste(e, index)}
                                onChange={(e) =>
                                  handleChange(e.target.value, index)
                                }
                                onKeyUp={(e) =>
                                  handleBackspaceAndEnter(e, index)
                                }
                                ref={(reference) =>
                                  (otpBoxReference.current[index] = reference)
                                }
                                variant="outlined"
                                sx={{
                                  maxWidth: "60px",
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "gray",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "orange",
                                    },
                                  },
                                }}
                                inputProps={{
                                  maxLength: 1,
                                  style: { textAlign: "center" },
                                }}
                              />
                            </Grid>
                          ))}
                        </Stack>
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
                            "&:focus": { border: "none", outline: "none" },
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
                            "&:hover": { borderColor: "primary.main" },
                            "&:active": { border: "none", outline: "none" },
                            "&:focus": { border: "none", outline: "none" },
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
