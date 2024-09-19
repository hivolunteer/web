import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { time } from "console";

function ModifyPassword() {
    const history = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [alert, setAlert] = useState(false);

    const handleClose = () => history("/settings");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "oldPassword") {
            setOldPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    function Mymsg(msg: string,duration: number | undefined)
    {
     var alt = document.createElement("div");
         alt.setAttribute("style","position:absolute;top:50%;left:50%;background-color:blue;");
         alt.innerHTML = msg;
         setTimeout(function(){
         if (alt.parentNode) {
             alt.parentNode.removeChild(alt);
         }
         },duration);
         document.body.appendChild(alt);
    }

    const fetchCompanyData = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/companies/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.company.id; // Assuming 'id' is part of the response
            } else {
                console.error("Failed to fetch company data");
            }
        } catch (error) {
            console.error("Error fetching company data", error);
        }
    };

    const [companyId, setCompanyId] = useState<string | null>(null);
    console.log(companyId)

    useEffect(() => {
        fetchCompanyData().then((id) => {
            if (id) {
                console.log("id", id)
                setCompanyId(id);
            }
        });
    }, []);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            setAlert(true);
            setError("Les mots de passe ne correspondent pas");
            return;
        } else if (
            !newPassword.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!$@%])[A-Za-z\d.!$@%]{8,}$/
            )
        ) {
            setAlert(true);
            setError(
                "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre, un chiffre et un caractère special (.!$@%)."
            );
            return;
        } else if (oldPassword === newPassword) {
            setAlert(true);
            setError("Le nouveau mot de passe doit être différent de l'ancien");
            return;
        }
        try {
            const response = await fetch(
                `${config.apiUrl}/companies/edit_password`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: companyId,
                        password: oldPassword,
                        new_password: newPassword,
                    }),
                }
            );
            if (!response.ok) {
                setAlert(true);
                setError("Le mot de passe actuel est incorrect");
                throw new Error("Le mot de passe actuel est incorrect");
            } else if (response.status === 201) {
                // Password changed successfully
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                Mymsg("Mot de passe modifié avec succès", 4000);
                handleClose();
            }
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <IconButton
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Changer le mot de passe
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Votre mot de passe doit contenir au moins 8 caractères et inclure au
                        moins une lettre, un chiffre et un caractère special (.!$@%).
                    </Typography>
                    <Box />

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            marginTop: "20px",
                            gap: "10px",
                        }}
                    >
                        <div>
                            <TextField
                                fullWidth
                                label="Ancien Mot de Passe"
                                variant="outlined"
                                id="oldPassword"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={handleChange}
                                margin="normal"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div>
                            <TextField
                                fullWidth
                                label="Nouveau Mot de Passe"
                                variant="outlined"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={handleChange}
                                margin="normal"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                label="Confirmer Mot de Passe"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </div>
                        {alert && (
                            <Alert
                                onClose={() => {
                                    setAlert(false);
                                }}
                                severity="error"
                            >
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        )}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}
                        >
                            <Button variant="contained" type="submit">
                                Changer le mot de passe
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
export default ModifyPassword;