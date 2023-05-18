import React, { useState } from 'react';
import { Alert, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import './Register.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { MuiTelInput } from 'mui-tel-input';

const theme = createTheme();

function Register() {
    /***
     * Define all states
    ***/
    /* State for password visibility */
    const [showPassword, setShowPassword] = React.useState(false);
    /* State complete for all inputs*/
    const [firstName, setFirstName] = useState(true);
    const [lastName, setLastName] = useState(true);
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
    /*const [complete, setComplete] = useState({
        firstName: true,
        lastName: true,
        birthdate: true,
        phone: true,
        email: true,
        password: true,
    });*/


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
        } else {
            setMajor(true);
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
        if (data.get('firstName') === '') {
            setFirstName(false);
        } else {
            setFirstName(true);
        }
        if (data.get('lastName') === '') {
            setLastName(false);
        } else {
            setLastName(true);
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
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.^&*])(?=.{8,})/;
        // regex : 1 uppercase, 1 lowercase, 1 number, 1 special character (!@#$%.^&*), 8 characters minimum
        if (regex.test(password)) {
            setStrength(true);
        } else {
            setStrength(false);
        }
    };

    /* Function to check email format */
    const checkEmailFormat = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // regex :  1 @, 1 point, 2 to 4 characters
        if (regex.test(email)) {
            setEmailFormat(true);
        } else {
            setEmailFormat(false);
        }
    };

    /* Function to check phone format */
    const checkPhoneFormat = (phone: string) => {
        const regex = /^(\+33|0|0033)[1-9][0-9]{8}$/;
        // regex : format +33612345678 or +32612345678 or +41612345678
        if (regex.test(phone)) {
            setPhoneFormat(true);
        } else {
            setPhoneFormat(false);
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
        //checkPhoneFormat(data.get('phone') as string);
    };

    /* Function to submit form */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        /* Prevent default behavior of form */
        const form = event.currentTarget;
        event.preventDefault();
        const data = new FormData(form);
        /* Check all inputs */
        checkInput(data);
        /* Print all data in console if all states are true */
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            birthdate: data.get('birthdate'),
            email: data.get('email'),
            phone: phoneInput,
            password: data.get('password'),
        });
    };


    function handleClick(): void {
        setShowPassword(!showPassword);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Inscription
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Prénom"
                                    autoFocus
                                />
                                {/* If firstName is empty, display an error message */}
                                {!firstName && (
                                    <Alert severity="error">
                                        Le prénom est requis
                                    </Alert>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='family-name'
                                    name='lastName'
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Nom'
                                />
                                {/* If lastName is empty, display an error message */}
                                {!lastName && (
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
                                <MuiTelInput
                                    name='phone'
                                    label='Numéro de téléphone'
                                    required
                                    fullWidth
                                    id='phone'
                                    autoComplete='tel'
                                    continents={['EU']}
                                    defaultCountry='FR'
                                    value={phoneInput}
                                    onChange={setPhoneInput}
                                />
                                {/* If phone is empty, display an error message */}
                                {!phone && (
                                    <Alert severity="error">
                                        Un numéro de téléphone est requis
                                    </Alert>
                                )}
                                {/* If phone is not empty but format is not correct, display a warning message */}
                                {/*(phone && !phoneFormat) && (
                                    <Alert severity="warning">
                                        Le format du numéro de téléphone doit être 06XXXXXXXX ou +336XXXXXXXX
                                    </Alert>
                                )*/}
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
                                        Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial parmi : !@#$%^.&*
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

export default Register;