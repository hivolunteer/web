import { useState } from "react";
import "./Settings.scss";
import { Button, Divider, Checkbox, Modal, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import ConfirmationModal from "../../../components/ConfirmationModal";
import {Alert} from "@mui/material";
import { useEffect } from "react";


function Settings() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [color_blind, setColorBlind] = useState(
        localStorage.getItem("color_blind") === "true"
    );
    const colorblindOptions = ["Mode daltonien"];
    const [openModal, setOpenModal] = useState(false);
    const history = useNavigate();

    const handleClick = () => {
        history("/settings/modify_password");
    };

    const handleClickProfile = () => {
        history("/settings/profile_information");
    }

    const switchHandler = (event: any) => {
        setColorBlind(event.target.checked);
    };

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    function handleClickColorBlind() {
        let className = "";
        if (!color_blind) {
            className = "body-home";
            localStorage.setItem("color_blind", "false");
        } else {
            className = "body-home-color-blind";
            localStorage.setItem("color_blind", "true");
        }
        return className;
    }

    const handleOpenModal = () => {
      setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [openConfirmationModal, setopenConfirmationModal] = useState(false);
    const [alertContent, setAlertContent] = useState<{ error: boolean, message: string, id: number }>({ error: false, message: "", id: 0 });
  const deleteAccount = () => {
    let url = `${config.apiUrl}/volunteers/delete`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAlertContent({ error: false, message: 'Compte supprimé avec succès', id: 0 })
          // Redirect to the login page
          localStorage.clear();
          window.location.reload();
          window.location.href = '/';
        } else {
          console.log('Error deleting account');
          setAlertContent({ error: true, message: 'Erreur lors de la suppression du compte', id: 0 })
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertContent({ error: true, message: 'Erreur serveur, veuillez réessayer plus tard', id: 0 })
      });
  }
  const handleCloseConfirmationModal = () => {
    setopenConfirmationModal(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertContent({ error: false, message: '', id: 0 });
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertContent]);

    return (
        <>
        {alertContent.message &&
        <div className="blocked-user-alert">
          <Alert severity={alertContent.error ? "error" : "success"}
          >
            {alertContent.message}
          </Alert>
        </div>
      }
        
        <div className={handleClickColorBlind()}>
            <h1> Réglages </h1>
            <button className={"color-blind-button"} onClick = {() => history("/settings/referents")}>
                Référents
            </button>
            <button className={"color-blind-button"} onClick={openPopup}>
                Mode daltonien
            </button>
            {popupVisible && (
                <div className="color-popup">
                    <div className="color-options">
                        <h3>Activer le mode daltonien</h3>
                        {colorblindOptions.map((mode, index) => (
                            <Checkbox
                                key={index}
                                checked={color_blind}
                                onClick={() => mode}
                                onChange={switchHandler}
                            />
                        ))}
                    </div>
                    <h5>
                        {" "}
                        Cette option permet de rendre HiVolunteer plus lisible aux personnes
                        atteintes de troubles de vision{" "}
                    </h5>
                    <button onClick={closePopup}>Fermer</button>
                </div>
            )}
            {color_blind ? (
                <div className={`selected-color`}>Mode daltonien activé!</div>
            ) : null}
            <button className={"color-blind-button"} onClick={handleClickProfile}>
                Informations du profil
            </button>
            <button className={"color-blind-button"} onClick={handleClick}>
                Changer le mot de passe
            </button>
            <div className="profile-btn-div">
            <Button variant="contained" color="error" onClick={handleOpenModal}>Supprimer le compte</Button>
            <div>
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 2,
                            borderRadius: '10px',
                        }}>
                        <Typography variant="h6" component="h2" color="#2D2A32" marginBottom={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            Supprimer le compte
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className='association-referent-modal-description'>
                            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                            </p>
                        </Typography>
                        <Divider />
                        <div className='association-referent-modal-buttons'>
                            <Button onClick={handleCloseModal} variant="outlined">Annuler</Button>
                            <Button onClick={deleteAccount} variant="contained" color="error">Supprimer</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
      {
          openConfirmationModal && 
          <ConfirmationModal
            handleClose={handleCloseConfirmationModal}
            title="Suppression de compte"
            description="Voulez-vous supprimer votre compte ? Cette action est irréversible."
            yes_choice="Oui"
            no_choice="Non"
            yes_function={deleteAccount}
          />
        }
      </div>
            <Divider orientation="vertical" variant="middle" flexItem />
        </div>
        </>
    );
}

export default Settings;