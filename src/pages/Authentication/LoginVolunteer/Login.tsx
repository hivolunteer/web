import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthenticationService } from "../../../services/authentication.service";
import "./Login.scss";
import titleLogo from "../../../images/logo/primary_logo.png";
import AutohideSnackbar from "../../../components/SnackBar";

function LoginVolunteer() {
  const [response, setResponse] = useState<{ error: Boolean; message: string }>(
    { error: false, message: "" }
  );
  /***
   * Define all states
   ***/
  /* State for password visibility */
  const [showPassword, setShowPassword] = React.useState(false);
  /* Set mail format state */
  const [emailFormat, setEmailFormat] = useState(true);
  /* Set phone format state */
  const [phoneFormat, setPhoneFormat] = useState(true);
  /* State complete for all inputs*/
  const [phone, setPhone] = useState(true);
  const [email, setEmail] = useState(true);
  const [password, setPassword] = useState(true);

  const navigate = useNavigate();

  /* Function to check if all inputs are complete */
  const checkComplete = (data: FormData) => {
    /*data.forEach((value, key) => {
            if (value === '') {
                setComplete({...complete, [key]: false});
            } else {
                setComplete({...complete, [key]: true});
            }
        });*/
    if (data.get("email") === "") {
      setEmail(false);
    } else {
      setEmail(true);
    }
    if (data.get("password") === "") {
      setPassword(false);
    } else {
      setPassword(true);
    }
  };

  /* Function to check email format */
  const checkEmailFormat = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // regex :  1 @, 1 point, 2 to 4 characters
    if (regex.test(email)) {
      setEmailFormat(true);
      return true;
    } else {
      setEmailFormat(false);
      return false;
    }
  };

  /* Function to check phone format */
  const checkPhoneFormat = (phone: string) => {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    // regex : "+" or "00", 1 to 3 numbers country code, 1 to 12 numbers
    if (regex.test(phone)) {
      setPhoneFormat(true);
      return true;
    } else {
      setPhoneFormat(false);
      return false;
    }
  };

  /* Function to check Inputs */
  const checkInput = (data: FormData) => {
    /* Check if all inputs are complete */
    checkComplete(data);
    /* Check email format */
    checkEmailFormat(data.get("email") as string);
    /* Check phone format */
    checkPhoneFormat(data.get("phone") as string);
  };

  /* Function to execute response */
  const responseExecute = (response_status: number) => {
    switch (response_status) {
      case 200:
        setResponse({
          error: false,
          message: "Connexion réussie",
        });
        localStorage.setItem("role", "volunteer");
        navigate("/");
        window.location.reload();
        break;
      case 401:
        setResponse({
          error: true,
          message: "Connexion échouée, veuillez vérifier vos identifiants",
        });
        break;
      default:
        setResponse({
          error: true,
          message: "Erreur inconnue, veuillez réessayer plus tard",
        });
        break;
    }
  };

  /* Function to send data and print user token receive */
  const sendData = async (data: FormData) => {
    // convert FormData to table
    const user = Object.fromEntries(data.entries());

    /* If all inputs are complete, send data */
    if (user["phone"] && user["email"] && user["password"]) {
      /* If user is major, password is strong enough, email format is correct and phone format is correct, send data */
      if (checkEmailFormat(user["email"] as string)) {
        // call LoginVolunteer service
        const response_status = AuthenticationService.loginVolunteers(user);
        responseExecute(await response_status);
      }
    }
  };

  /* Function to submit form */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /* Prevent default behavior of form */
    const form = event.currentTarget;
    event.preventDefault();
    const data = new FormData(form);
    /* Check all inputs x2 */
    for (let i = 0; i < 2; i++) {
      checkInput(data);
    }
    /* If all states are true, send data */
    console.log(email, password, emailFormat);
    sendData(data);
  };

  function handleClick(): void {
    setShowPassword(!showPassword);
  }

  return (
    <div className="center-form">
      <div className="choice-form">
        <div className="row">
          <div className="col-12">
            <img className="titleLogo" src={titleLogo} alt="" />
          </div>
        </div>
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" marginBottom="10px">
            Connexion Bénévole
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              flexDirection="column"
            >
              {/* Input phone number */}
              <Grid item xs={12}>
                <TextField
                  autoComplete="tel"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Numéro de téléphone"
                  autoFocus
                  sx={{ alignItems: "center" }}
                  type="tel"
                  /* accept only numbers and symbols + */
                  inputProps={{
                    pattern: "[0-9+]*",
                    style: {
                      color: "#2D2A32",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                    },
                  }}
                  helperText="Format : +336XXXXXXXX"
                  FormHelperTextProps={{
                    sx: { marginRight: "auto" },
                  }}
                  error={!phone || !phoneFormat}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  sx={{ alignItems: "center" }}
                  InputProps={{
                    style: {
                      color: "#2D2A32",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                    },
                  }}
                />
                {/* If email is empty, display an error message */}
                {!email && (
                  <Alert severity="error">L'adresse email est requise</Alert>
                )}
                {/* If email is not empty but format is not correct, display a warning message */}
                {email && !emailFormat && (
                  <Alert severity="warning">
                    Le format de l'adresse email doit être au format
                    xxxxxx.xxxx@xxx.com
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  sx={{ alignItems: "center" }}
                  InputProps={{
                    style: {
                      color: "#2D2A32",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClick} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* If password is empty, display an error message */}
                {!password && (
                  <Alert severity="error">Un mot de passe est requis</Alert>
                )}
              </Grid>
            </Grid>
            {response.message !== "" && (
              <AutohideSnackbar
                message={"L'adresse mail ou le mot de passe est incorrect"}
                open={true}
                response={response.error}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 6,
                mb: 3,
                color: "#FFFEFF",
                backgroundColor: "#67A191",
                borderRadius: "10px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                width: "200px",
              }}
            >
              Connexion
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mb: 4 }}>
              <Grid item>
                <Link href="/volunteers/register" variant="body2">
                  Vous n'avez pas de compte ? Inscrivez-vous
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default LoginVolunteer;
