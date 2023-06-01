import React, { useState } from 'react';
import { Alert, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import './Register.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { MuiTelInput } from 'mui-tel-input';
import { AuthenticationService } from '../../../services/authentication.service';

const theme = createTheme();

function RegisterVolunteer() {
    /***
     * Define all states
    ***/
    /* State for password visibility */
    const [showPassword, setShowPassword] = React.useState(false);
    /* State complete for all inputs*/
    const [first_name, setfirst_name] = useState(true);
    const [last_name, setlast_name] = useState(true);
    const [birthdate, setBirthdate] = useState(true);
    const [phone, setPhone] = useState(true);
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);
    /* Check specific parameters */
        /* State for age major */
        const [major, setMajor] = useState(true);
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
    /* Function to check if user is major */
    const checkMajor = (birthdate: Date) => {
       // const birthdate = new Date(data.get('birthdate') as string);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        if (age < 18) {
            setMajor(false);
            return false;
        } else {
            setMajor(true);
            return true;
        }
    };


    /* Function to check if all inputs are complete */
    const checkComplete = (data: FormData) => {
        /*data.forEach((value, key) => {
            if (value === '') {
                setComplete({...complete, [key]: false});
            } else {
                setComplete({...complete, [key]: true});
            }
        });*/
        if (data.get('first_name') === '') {
            setfirst_name(false);
        } else {
            setfirst_name(true);
        }
        if (data.get('last_name') === '') {
            setlast_name(false);
        } else {
            setlast_name(true);
        }
        if (data.get('birthdate') === '') {
            setBirthdate(false);
        } else {
            setBirthdate(true);
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

    /* Function to check strength password */
    const checkStrength = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@:_#$%.^&*])(?=.{8,})/;
        // regex : 1 uppercase, 1 lowercase, 1 number, 1 special character (!@:_#$%.^&*), 8 characters minimum
        if (regex.test(password)) {
            setStrength(true);
            return true;
        } else {
            setStrength(false);
            return false;
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
        /* Check if user is major */
        checkMajor(new Date(data.get('birthdate') as string));
        /* Check strength password */
        checkStrength(data.get('password') as string);
        /* Check email format */
        checkEmailFormat(data.get('email') as string);
        /* Check phone format */
        checkPhoneFormat(data.get('phone') as string);        
    };

    /* Function to send data and print user token receive */
    const sendData = async (data: FormData) => {
        // convert FormData to table
        const user = Object.fromEntries(data.entries());

        /* If all inputs are complete, send data */
        if (user['first_name'] && user['last_name'] && user['birthdate'] && user['phone'] && user['email'] && user['password']) {
            /* If user is major, password is strong enough, email format is correct and phone format is correct, send data */
            if (checkStrength(user['password'] as string) && checkEmailFormat(user['email'] as string) && checkPhoneFormat(user['phone'] as string)) {
                /* If user is major, send data */
                if (checkMajor(new Date(user['birthdate'] as string))) {
                    // call registerVolunteer service
                    const response = AuthenticationService.registerVolunteers(user);
                    console.log(response);
                }
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
        console.log(first_name, last_name, birthdate, phone, email, password, major, strength, emailFormat, phoneFormat);
        sendData(data);
    };


    function handleClick(): void {
        setShowPassword(!showPassword);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[50]
                            : theme.palette.grey[900],
                    borderRadius: 8,
                    borderColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[800],
                    boxShadow: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.shadows[1]
                            : 'none',
                }}
                >
                <CssBaseline />
                <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Inscription Bénévole
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="Prénom"
                                    autoFocus
                                />
                                {/* If first_name is empty, display an error message */}
                                {!first_name && (
                                    <Alert severity="error">
                                        Le prénom est requis
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='family-name'
                                    name='last_name'
                                    required
                                    fullWidth
                                    id='last_name'
                                    label='Nom'
                                />
                                {/* If last_name is empty, display an error message */}
                                {!last_name && (
                                    <Alert severity="error">
                                        Le nom de famille est requis
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='bday'
                                    name='birthdate'
                                    required
                                    fullWidth
                                    id='birthdate'
                                    label='Date de naissance'
                                    type='date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {/* If birthdate is empty, display an error message */}
                                {!birthdate && (
                                    <Alert severity="error">
                                        Une date de naissance est requise pour vérifier votre majorité
                                    </Alert>
                                )}
                                {/* If birthdate is not empty but user is not major, display an info message */}
                                {(birthdate && !major) && (
                                    <Alert severity="info">
                                        Vous devez être majeur pour vous inscrire
                                    </Alert>
                                )}
                            </Grid>
                            {/* Input phone number */}
                            <Grid item xs={12}>
                                {/*<MuiTelInput
                                    name='phone'
                                    label='Numéro de téléphone'
                                    required
                                    fullWidth
                                    id='phone'
                                    autoComplete='tel'
                                    continents={['EU']}
                                    defaultCountry='FR'
                                    value='phone'
                                    //value={phoneInput}
                                    //onChange={setPhoneInput}
                                />*/}
                                <TextField
                                    autoComplete='tel'
                                    name='phone'
                                    required
                                    fullWidth
                                    id='phone'
                                    label='Numéro de téléphone'
                                    type='tel'
                                    /* accept only numbers and symbols + */
                                    inputProps={{pattern: '[0-9+]*'}}
                                    helperText='Format : +336XXXXXXXX'
                                    error={!phone || !phoneFormat}
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
                                    InputProps={{
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Inscription
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/login' variant='body2'>
                                    Vous avez déjà un compte ? Connectez-vous
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default RegisterVolunteer;