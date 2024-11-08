import React, { useEffect, useState } from 'react';
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, Button, TextField, Typography } from "@mui/material";
import config from "../../../config";

function ProfileInformationModal() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [siren, setSiren] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [showModal,] = useState(true);
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

  useEffect(() => {
    const getProfile = async () => {
      await fetch(`${config.apiUrl}/companies/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              localStorage.setItem("id", data?.company?.id);
              setName(data?.company?.name);
              setEmail(data?.company?.email);
              setPhone(data?.company?.phone);
              setProfilePicture(data?.company?.profile_picture);
              setSiren(data?.company?.siren);
            });
          } else {
            console.log(response);
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

    try {
      const response = await fetch(
        `${config.apiUrl}/companies/edit`,
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
            <CloseIcon />
          </IconButton>
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <div>
              <Typography style={{
                fontWeight: "bold"
              }}>
                Photo de profil
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                id="profilePicture"
                name="profilePicture"
                type="text"
                value={profilePicture}
                onChange={handleProfilePictureChange}
                margin="normal"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
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
                value={name}
                onChange={handleNameChange}
                margin="normal"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
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
            <div style={{ marginTop: "20px" }}>
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
            <div style={{ marginTop: "20px" }}>
              <Typography style={{
                fontWeight: "bold"
              }}>
                SIREN
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                id="siren"
                name="siren"
                type="text"
                value={siren}
                disabled
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
  );
}
export default ProfileInformationModal;