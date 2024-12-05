import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {Alert, AlertTitle, Button, TextField, Typography} from "@mui/material";
import config from "../../../config";

function ProfileInformationModal() {
    const history = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [showModal] = useState(true);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false);

    const handleClose = () => {
        setAlert(false);
        history("/settings");
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        return phoneRegex.test(phone);
    };
    
    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setProfilePicture(fileUrl);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            await fetch(`${config.apiUrl}/volunteers/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setFirstName(data.volunteer.first_name);
                            setLastName(data.volunteer.last_name);
                            setEmail(data.volunteer.email);
                            setPhone(data.volunteer.phone);
                            setProfilePicture(data.volunteer.profile_picture);
                        });
                    } else {
                        setError("Failed to fetch profile details.");
                        setAlert(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getProfile();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let validationError = "";
        if (!firstName.trim() || !lastName.trim()) {
            validationError = "Prénom et Nom sont obligatoires.";
        } else if (!validateEmail(email)) {
            validationError = "L'adresse e-mail n'est pas valide.";
        } else if (!validatePhoneNumber(phone)) {
            validationError = "Le numéro de téléphone n'est pas valide.";
        }

        if (validationError) {
            setError(validationError);
            setAlert(true);
            return;
        }
        try {
            const response = await fetch(
                `${config.apiUrl}/volunteers/update`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: localStorage.getItem("id"),
                        first_name: firstName,
                        last_name: lastName,
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
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setProfilePicture("");
            setAlert(false);
            handleClose();
        } catch (error) {
            setError((error as Error).message);
            setAlert(true);
        }
    };

    return (
        <div>
            <Modal
                open={showModal}
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
                    <h2 id="modal-modal-title">Informations de profil</h2>
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
                            maxHeight: "500px",
                            overflow: "auto",
                        }}
                    >
                        <div>
                            <Typography style={{ fontWeight: "bold" }}>
                                Photo de profil
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                style={{ marginBottom: "10px" }}
                            />
                            {profilePicture && (
                                <img
                                    src={profilePicture}
                                    alt="Profile Preview"
                                    style={{ maxWidth: "100px", marginTop: "10px" }}
                                />
                            )}
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                Prénom
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="initialFirstName"
                                name="initialFirstName"
                                type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                margin="normal"
                            />
                        </div>
                        <div style={{marginTop: "20px"}}>
                            <Typography style={{
                                fontWeight: "bold"
                            }}>
                                Nom
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                id="initialLastName"
                                name="initialLastName"
                                type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
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
                                variant="outlined"
                                id="phone"
                                name="phone"
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                margin="normal"
                            />
                        </div>
                        {alert && (
                            <Alert
                            severity="error"
                            sx={{
                              backgroundColor: "#f8d7da",
                              color: "#721c24",
                              border: "1px solid #f5c6cb",
                              borderRadius: "4px",
                              mt: 2,
                            }}
                          >
                            <AlertTitle style={{ fontWeight: "bold" }}>Erreur</AlertTitle>
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
)};

export default ProfileInformationModal;