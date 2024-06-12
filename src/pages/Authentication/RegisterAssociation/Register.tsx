import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthenticationService } from '../../../services/authentication.service';
import './Register.scss';
import titleLogo from "../../../images/logo/primary_logo.png";
import checkStrengthPassword from '../../../functions/checkStrengthPassword';
import AutohideSnackbar from "../../../components/SnackBar";

function RegisterAssociation() {
    const [response, setResponse] = useState<{ error: Boolean; message: string }>(
        { error: false, message: "" }
    );
    /***
     * Define all states
    ***/
    /* State for password visibility */
    const [showPassword, setShowPassword] = React.useState(false);
    /* State complete for all inputs*/
    const [name, setName] = useState(true);
    const [rna, setRna] = useState(true);
    const [phone, setPhone] = useState(true);
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);

    const navigate = useNavigate();
    /* Check specific parameters */
        /* State strength password */
        const [strength, setStrength] = useState(true);
        /* State for email format */
        const [emailFormat, setEmailFormat] = useState(true);
        /* State for phone format */
        const [phoneFormat, setPhoneFormat] = useState(true);
        const [phoneInput, setPhoneInput] = useState('' as string);


    /***
     * Define all functions
    ***/

    /* Function to check if all inputs are complete */
    const checkComplete = (data: FormData) => {
        /*data.forEach((value, key) => {
            if (value === '') {
                setComplete({...complete, [key]: false});
            } else {
                setComplete({...complete, [key]: true});
            }
        });*/
        if (data.get('name') === '') {
            setName(false);
        } else {
            setName(true);
        }
        if (data.get('rna') === '') {
            setRna(false);
        } else {
            setRna(true);
        }
        if (data.get('phone') === '') {
            setPhone(false);
        } else {
            setPhone(true);
        }
        if (data.get('email') === '') {
            setEmail(false);
        } else {
            setEmail(true);
        }
        if (data.get('password') === '') {
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
        /* Check strength password */
        checkStrengthPassword(data.get('password') as string);
        /* Check email format */
        checkEmailFormat(data.get('email') as string);
        /* Check phone format */
        checkPhoneFormat(data.get('phone') as string);        
    };

    /* Function to execute response */
    const responseExecute = (response_status: number) => {
        switch (response_status) {
          case 201:
              setResponse({
                  error: false,
                  message: "Inscription réussie",
              });
              localStorage.setItem("role", "association");
              navigate("/");
              window.location.reload();
              break;
          case 400:
              setResponse({
                  error: true,
                  message: "Inscription échouée, veuillez vérifier que tous les champs sont rempli",
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
        if (user['name'] && user['rna'] && user['phone'] && user['email'] && user['password']) {
            setStrength(checkStrengthPassword(user['password'] as string));
            /* If user is major, password is strong enough, email format is correct and phone format is correct, send data */
            if (strength && checkEmailFormat(user['email'] as string) && checkPhoneFormat(user['phone'] as string)) {
                // call RegisterAssociation service
                const response_status = AuthenticationService.registerAssociations(user);
                responseExecute(await response_status)
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
        console.log(name, rna, phone, email, password, strength, emailFormat, phoneFormat);
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
                        <img className="titleLogo" src={titleLogo} alt=""/>
                    </div>
                 </div>
                <Box
                    sx={{
                      marginTop: "30px",
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" marginBottom="10px">
                        Inscription Association
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
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nom de l'association"
                                    autoFocus
                                    sx={{ alignItems: "center" }}
                                    InputProps={{
                                        style: { color: "#2D2A32",
                                                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                 borderRadius: "10px"
                                               }
                                    }}
                                />
                                {/* If first_name is empty, display an error message */}
                                {!name && (
                                    <Alert severity="error">
                                        Le nom de l'association est requis
                                    </Alert>
                                )}
                            </Grid>
                            {/* Input RNA */}
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='rna'
                                    name='rna'
                                    required
                                    fullWidth
                                    id='rna'
                                    label='Numéro RNA'
                                    sx={{ alignItems: "center" }}
                                    InputProps={{
                                        style: { color: "#2D2A32",
                                                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                 borderRadius: "10px",
                                               }
                                    }}
                                />
                                {/* If rna is empty, display an error message */}
                                {!rna && (
                                    <Alert severity="error">
                                        Le numéro RNA est requis
                                    </Alert>
                                )}
                            </Grid>
                            {/* Input phone number */}
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='tel'
                                    name='phone'
                                    required
                                    fullWidth
                                    id='phone'
                                    label='Numéro de téléphone'
                                    type='tel'
                                    inputProps={{
                                        pattern: "[0-9+]*",
                                        style:
                                        {
                                            color: "#2D2A32",
                                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                            borderRadius: "10px"
                                        }
                                    }}
                                    /* accept only numbers and symbols + */
                                    helperText='Format : +336XXXXXXXX'
                                    FormHelperTextProps={{
                                        sx: { marginRight: "auto" }
                                    }}
                                    error={!phone || !phoneFormat}
                                    sx={{ alignItems: "center" }}
                                />


                                {/* If phone is empty, display an error message */}
                                {!phone && (
                                    <Alert severity="error">
                                        Un numéro de téléphone est requis
                                    </Alert>
                                )}
                                {/* If phone is not empty but format is not correct, display a warning message */}
                                {(phone && !phoneFormat) && (
                                    <Alert severity="warning">
                                        Le format du numéro de téléphone doit être +336XXXXXXXX
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='email'
                                    name='email'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Adresse email'
                                    sx={{ alignItems: "center" }}
                                    InputProps={{
                                        style: { color: "#2D2A32",
                                                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                 borderRadius: "10px",
                                               }
                                    }}
                                />
                                {/* If email is empty, display an error message */}
                                {!email && (
                                    <Alert severity="error">
                                        L'adresse email est requise
                                    </Alert>
                                )}
                                {/* If email is not empty but format is not correct, display a warning message */}
                                {(email && !emailFormat) && (
                                    <Alert severity="warning">
                                        Le format de l'adresse email doit être au format xxxxxx.xxxx@xxx.com
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='new-password'
                                    name='password'
                                    required
                                    fullWidth
                                    id='password'
                                    label='Mot de passe'
                                    type={showPassword ? 'text' : 'password'}
                                    sx={{ alignItems: "center" }}
                                    InputProps={{
                                        style: { color: "#2D2A32",
                                                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                 borderRadius: "10px",
                                                 marginRight: "10px"
                                               },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                             <IconButton
                                               onClick={handleClick}
                                               edge="end"
                                             >
                                               {showPassword ? <Visibility /> : <VisibilityOff />}
                                             </IconButton>
                                           </InputAdornment>
                                        )
                                    }}
                                />
                                {/* If password is empty, display an error message */}
                                {!password && (
                                    <Alert severity="error">
                                        Un mot de passe est requis
                                    </Alert>
                                )}
                                {/* If password is not empty but not strong enough, display a warning message */}
                                {(password && !strength) && (
                                    <Alert severity="warning">
                                        Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial parmi : !@:_#$%.^&*
                                    </Alert>
                                )}
                            </Grid>
                        </Grid>
                        {response.message !== "" && (
                            <AutohideSnackbar
                                message={response.message}
                                open={true}
                                response={response.error}
                            />
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 6,
                                mb: 3,
                                color: "#FFFEFF",
                                backgroundColor: "#67A191",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                width: "200px",
                              }}
                        >
                            Inscription
                        </Button>
                        <Grid container justifyContent='flex-end' sx={{ mb: 4 }}>
                            <Grid item sx={{ textAlign: 'center', width: '100%'}}>
                                <Link href='/associations/login' variant='body2'>
                                    Vous avez déjà un compte ? Connectez-vous
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default RegisterAssociation;