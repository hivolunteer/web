import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ChangePassword() {
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
                `${config.apiUrl}/volunteers/update_password`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: localStorage.getItem("id"),
                        old_password: oldPassword,
                        new_password: newPassword,
                    }),
                }
            );
            if (!response.ok) {
                setAlert(true);
                setError("Le mot de passe actuel est incorrect");
                throw new Error("Le mot de passe actuel est incorrect");
            }
            // Password changed successfully
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            handleClose();
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
export default ChangePassword;