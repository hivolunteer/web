import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthenticationService } from "../../../services/authentication.service";
import "./Login.scss";
import titleLogo from "../../../images/logo/primary_logo.png";

function LoginVolunteer() {
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
  const [fodder, setFodder] = useState(true);

  const navigate = useNavigate();

  /* Function to check if all inputs are complete */
  const checkComplete = (data: FormData) => {
    setEmail(false);
    setPhone(false);

    const credential = data.get("credential") as string;
    if (credential !== "") {
      if (credential.includes("@")) {
        setEmail(true);
      } else {
        setPhone(true);
      }
    } else {
      setEmail(false);
      setPhone(false);
    }
    // setEmail(credential.includes("@"));
    setPassword((data.get("password") as string) !== "");
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
    const credential = data.get("credential") as string;
    /* Check email format */
    checkEmailFormat(credential);
    /* Check phone format */
    checkPhoneFormat(credential);
  };

  /* Function to execute response */
  const responseExecute = (response_status: number) => {
    switch (response_status) {
      case 200:
        alert("Connexion réussie");
        localStorage.setItem("role", "volunteer");
        navigate("/");
        window.location.reload();
        break;
      case 400:
        alert("Missing Fields");
        break;
      case 401:
        alert("Connexion échouée");
        break;
      default:
        alert("Erreur inconnue");
        break;
    }
  };

  /* Function to send data and print user token receive */
  const sendData = async (data: FormData) => {
    // convert FormData to table
    const user = Object.fromEntries(data.entries());

    /* If all inputs are complete, send data */
    if (user["credential"] && user["password"]) {
      if ((checkEmailFormat(user["credential"] as string)) || (checkPhoneFormat(user["credential"] as string))) {
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
            <Grid container spacing={2} justifyContent="center" flexDirection="column">
              <Grid item xs={12}>
                <TextField
                  autoComplete="credential"
                  name="credential"
                  required
                  fullWidth
                  id="credential"
                  label="Numéro de téléphone, e-mail"
                  autoFocus
                  sx={{ alignItems: "center" }}
                  type="text"
                  inputProps={{
                    style: {
                      color: "#2D2A32",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px"
                    }
                  }}
                  helperText="Format : +336XXXXXXXX ou XX@XX.X"
                  FormHelperTextProps={{
                    sx: { marginRight: "auto" }
                  }}
                  error={!fodder}

                />
                {!email && !phone && (
                  <Alert severity="error">Un identifiant est requis</Alert>
                )}
                {email && !emailFormat && (
                  <Alert severity="warning">
                    Le format de l'adresse email doit être au format
                    xxxxxx.xxxx@xxx.com
                  </Alert>
                )}
                {phone && !phoneFormat && (
                  <Alert severity="warning">
                    Le format du numéro de téléphone doit être au format
                    +336XXXXXXXX
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
                    )
                  }}
                />
                {/* If password is empty, display an error message */}
                {!password && (
                  <Alert severity="error">Un mot de passe est requis</Alert>
                )}
              </Grid>
            </Grid>
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