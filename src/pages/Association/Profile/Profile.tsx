import * as React from "react";
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import config from "../../../config";
import "./Profile.scss";

import EditPasswordModal from "./EditPasswordModal";

type newProfile = {
  name: string;
  description: string;
  email: string;
  phone: string;
  profile_picture: string;
};

export default function ProfilePage(props: any) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const image =
        "https://urgo.fr/wp-content/uploads/2022/03/Logo-Reforestaction.png";



  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

    useEffect(() => {
        const getProfile = async () => {
            await fetch(`${config.apiUrl}/associations/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                          setProfilePicture(data.association.profile_picture);
                            setName(data.association.name);
                            setDescription(data.association.description);
                            setEmail(data.association.email);
                            setPhone(data.association.phone);
                            setProfilePicture(data.association.profile_picture);
                        });
                    } else {
                        console.log("Error fetching profile");
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getProfile();
    }, []);


  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /* function validatePhone(phone: string): boolean {
    const re = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return re.test(phone);
  } */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setProfilePicture(dataUrl);
        const formData = new FormData();
        formData.append("file", file);
        fetch(`${config.apiUrl}volunteers/profile/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert("Profile picture updated successfully");
            } else {
              console.log("Error updating profile picture");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    }
  };

  const updateProfile = () => {
    if (!validateEmail(email)) {
      console.error("Invalid email");
      return;
    }
    // if (!validatePhone(phone)) {
    //   console.error('Invalid phone number');
    //   return;
    // }
    console.log(name, email, phone, profilePicture);
    let profile: newProfile = {
      name: name,
      email: email,
      phone: phone,
      profile_picture: profilePicture,
      description: ""
    };

    fetch(`${config.apiUrl}/volunteers/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "self-start",
                textAlign: "center",
                padding: "20px",
            }}>
                <img src={image} alt="Logo de profil"/>
                <h1>Association: {name}</h1>
            </div>
            <div className="profile-asso-container-div">

          <h2>
            Bénévoles
          </h2>
          <Grid container alignItems="stretch" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: "space-between",
          }}>
            <Grid item style={{
              display: 'flex',
              marginBottom: "30px",
            }}>
              <Card className={"card-component"}>
                <h4>
                  0 bénévoles actuels
                </h4>
                <h4>
                  Vous n'avez actuellement aucun bénévole
                </h4>
              </Card>
              <Card className={"card-component"}>
                <h4>
                  0 bénévoles en attente de confirmation
                </h4>
                <h4>
                  Vous n'avez actuellement aucun bénévole en attente de confirmation
                </h4>
              </Card>
            </Grid>
          </Grid>
          <h2>
            Description de l'association
          </h2>
          <h4 style={{
            padding: "20px",
            textAlign: "center",
          }}>
            {description === null || description === undefined || description === "" ? "Aucune description n'est disponible pour cette association" : description}
          </h4>
          <h2>
            Contact
          </h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            textAlign: "center",
            padding: "20px",
          }}>
           <label>E-mail:</label>
            <h4>
              {email}
            </h4>
            <label>Numéro de téléphone:</label>
            <h4>
              {phone}
            </h4>
          </div>
        </div><div className="profile-row">
        </div><div className="profile-btn-div">
          <button className="profile-pic-btn" onClick={updateProfile}>
            Mettre à jour le profile
          </button>
          {/* <button className="delete-account-btn" onClick={deleteAccount}>
                  Supprimer le compte
              </button> */}
          <button className="profile-pic-btn edit" onClick={() => setOpenDialog(true)} style={{ backgroundColor: "#FFD700" }}>
            Modifier le mot de passe
          </button>
          <EditPasswordModal modalProps={{ open: openDialog, onClose: closeDialog }} />
        </div>
        </>
  );
}