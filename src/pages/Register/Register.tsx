import React, { useState } from 'react';
import { Alert, Box, Button, Container, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import './Register.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme();

function Register() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [completed, setCompleted] = React.useState(true);

    {/* State complete for all inputs*/}
    const [complete, setComplete] = useState({
        firstName: true,
        lastName: true,
        birthdate: true,
        phone: true,
        email: true,
        password: true,
    });

    {/* Handle change for all inputs */ }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setComplete({ ...complete, [name]: value });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        {/* Check if all fields are completed */}
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setCompleted(false);
        }
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            birthdate: data.get('birthdate'),
            email: data.get('email'),
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
                                {!completed && (
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
                                {!completed && (
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
                                {!completed && (
                                    <Alert severity="error">
                                        Une date de naissance est requise pour vérifier votre majorité
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
                                />
                                {!completed && (
                                    <Alert severity="error">
                                        Un numéro de téléphone est requis
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
                                {!completed && (
                                    <Alert severity="error">
                                        L'adresse email est requise
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
                                {!completed && (
                                    <Alert severity="error">
                                        Un mot de passe est requis
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
                            Sign Up
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