import React, { useState } from 'react';
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {Alert, AlertTitle, Button, InputAdornment, TextField, Typography} from "@mui/material";
import { Link } from 'react-router-dom';
import config from "../../../config";


interface ProfileInformationModalProps {
    initialName: string;
    initialEmail: string;
    onSave: (name: string, email: string) => void;
}

function ProfileInformationModal() {
    const history = useNavigate();
    const onSave = (name: string, email: string, phone: string, profilePicture: string) => {
        console.log("Email:", email);
    }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);

    const handleClose = () => history("/settings");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfilePicture(event.target.value);
    };

    const handleSaveClick = () => {
        onSave(name, email, phone, profilePicture);
        setShowModal(false);
    };

    const handleCloseClick = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Check if new password matches confirm password

        try {
            const response = await fetch(
                `${config.apiUrl}/associations/update`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: localStorage.getItem("id"),
                        name: name,
                        email: email,
                        phone: phone,
                        profile_picture: profilePicture,
                    }),
                }
            );
            if (!response.ok) {
                setAlert(true)
                setError("Une information est manquante")
            }
            setName("");
            setEmail("");
            setPhone("");
            setProfilePicture("");
            handleClose();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <Link to={'/associations'}>
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-modal-title">Profile Information</h2>
                    <p id="modal-modal-description">Changer les informations du profil</p>
                    <IconButton
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            marginTop: "20px",
                            gap: "10px",
                        }}
                    >
                        <div style={{marginTop: "20px"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                Prénom
                            </Typography>
                            <TextField
                                fullWidth
                                label="Prénom"
                                variant="outlined"
                                id="initialFirstName"
                                name="initialFirstName"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                margin="normal"
                            />
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                Adresse e-mail
                            </Typography>
                            <TextField
                                fullWidth
                                label="Adresse mail"
                                variant="outlined"
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                margin="normal"
                            />
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                Numéro de téléphone
                            </Typography>
                            <TextField
                                fullWidth
                                label="Numero de telephone"
                                variant="outlined"
                                id="phone"
                                name="phone"
                                type="number"
                                value={phone}
                                onChange={handlePhoneChange}
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
                                Sauvegarder les changements
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
        </Link>
);
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export default ProfileInformationModal;