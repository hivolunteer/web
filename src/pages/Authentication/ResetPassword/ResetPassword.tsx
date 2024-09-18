import { Box, Grid, TextField, Button, Alert } from "@mui/material";
import './ResetPassword.scss';
import { useEffect, useState } from "react";
import config from "../../../config";
import { useNavigate } from "react-router-dom";

const titleLogo = require("../../../images/logo/primary_logo.png");


function ResetPassword() {

    const [strength, setStrength] = useState<boolean>(true);
    const [identical, setIdentical] = useState<boolean>(true);

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [type, setType] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search)
        setToken(queryParameters.get('token') as string);
        let type = window.location.pathname.split('/')[1];
        setType(type);
    }, []);
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
    }

    function validateForm() {
        if ((!checkStrength(password)) || (password !== confirmPassword)) {
            setIdentical(false);
            return;
        }
        let route = `${config.apiUrl}/${type}/update_password`;
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                new_password: password
            })
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                alert("Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter")
                setTimeout(() => navigate('companies/login'), 3000);            }
        }).catch((error) => {
            console.log(error);
        })
        return;
    }

    return (
        <div className="center-form">
            <div className="choice-form">
                <div className="row">
                    <div className="col-12">
                        <img className="titleLogo" src={titleLogo} alt=""/>
                    </div>
                </div>
                <div className="row" style={{justifyContent: "center"}}>
                    <div className="col-12" >
                        <p className="title">Choisir un nouveau mot de passe</p>
                    </div>
                <div className="reset_row alert">
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Nouveau mot de passe"
                        variant="outlined"
                        type="password"
                        sx={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px",
                        }}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                    />
                    {(password && !strength) && (
                        <Alert severity="warning">
                            Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial parmi : !@:_#$%.^&*
                        </Alert>
                    )}
                </div>
                <div className="reset_row second alert">
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Confirmer le mot de passe"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); }}
                        sx={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px",
                        }}
                    />
                    {(!identical) && (
                        <Alert severity="warning">
                            Les mots de passe ne sont pas identiques
                        </Alert>
                    )}
                </div>
                <div className="reset_row button" style={{justifyContent: "center"}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 6,
                                mb: 3,
                                width: "70%",
                                alignContent: "center",
                                color: "#FFFEFF",
                                backgroundColor: "#67A191",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                        }}
                        onClick={() => validateForm()}
                    >
                        Réinitialiser le mot de passe
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;