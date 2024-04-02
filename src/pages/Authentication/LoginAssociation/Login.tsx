import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthenticationService } from '../../../services/authentication.service';
import './Login.scss';
import titleLogo from "../../../images/logo/primary_logo.png";
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';

function LoginAssociation() {
    /***
     * Define all states
    ***/
    /* State for password visibility */
    const [showPassword, setShowPassword] = React.useState(false);
    /* Set mail format state */
    const [emailFormat, setEmailFormat] = useState(true);
    /* State complete for all inputs*/
    const [name, setName] = useState(true);
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

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

    /* Function to check Inputs */
    const checkInput = (data: FormData) => {
        /* Check if all inputs are complete */
        checkComplete(data);
        /* Check email format */
        checkEmailFormat(data.get('email') as string);
    };

    /* Function to execute response */
    const responseExecute = (response_status: number) => {
        switch (response_status) {
            case 200:
                alert('Connexion réussie');
                localStorage.setItem('role', 'association')
                navigate('/');
                window.location.reload();
                break;
            case 401:
                alert('Connexion échouée');
                break;
            default:
                alert('Erreur inconnue');
                break;
        }
    };

    /* Function to send data and print user token receive */
    const sendData = async (data: FormData) => {
        // convert FormData to table
        const user = Object.fromEntries(data.entries());

        /* If all inputs are complete, send data */
        if (user['name'] && user['email'] && user['password']) {
            /* If user is major, password is strong enough, email format is correct and phone format is correct, send data */
            if (checkEmailFormat(user['email'] as string)) {
                // call LoginAssociation service
                const response_status = AuthenticationService.loginAssociations(user);
                console.log(response_status)
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
                        Connexion Association
                    </Typography>
                    <Box
                         component="form"
                         noValidate
                         onSubmit={handleSubmit}
                         sx={{ mt: 3 }}
                        >
                        <Grid container spacing={2} justifyContent="center" flexDirection="column">
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete='name'
                                    name='name'
                                    required
                                    fullWidth
                                    id='name'
                                    label='Nom association'
                                    autoFocus
                                    sx={{ alignItems: "center" }}
                                    InputProps={{
                                        style: { color: "#2D2A32",
                                                 boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                                                 borderRadius: "10px"
                                               }
                                    }}
                                />
                                {/* If name is empty, display an error message */}
                                {!name && (
                                    <Alert severity="error">
                                        Le nom de l'association est requis
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
                        </Grid>
                        </Grid>
                        <div style={{ marginTop: "10px", justifyContent: "flex-end", display: "flex" }}> 
                            <a className="forgot-password"
                                onClick={() => {setOpen(true);
                            }}>
                                Mot de passe oublié ?
                            </a>
                            <ForgotPasswordModal modalProps={{open: open, handleClose: () => setOpen(false), route: "/associations/"}} />
                        </div>
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
                            Connexion
                        </Button>
                        <Grid container justifyContent='flex-end' sx={{ mb: 4 }}>
                            <Grid item>
                                <Link href='/associations/register' variant='body2'>
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

export default LoginAssociation;