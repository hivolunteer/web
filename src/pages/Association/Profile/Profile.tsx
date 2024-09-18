import * as React from "react";
import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import config from "../../../config";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { Mission } from "../../../interfaces";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditPasswordModal from "./EditPasswordModal";
import { CardActions, CardContent } from "@mui/material";
import { CardHeader } from "react-bootstrap";

type newProfile = {
  name: string;
  description: string;
  email: string;
  phone: string;
  profile_picture: string;
};

type VProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  rating: number;
  profile_picture: string;
  nb_hours: number;
  bee: number;
};

interface getMission  {
  draft: Mission[],
  active: Mission[],
  passed: Mission[],
}

interface follow {
  volunteer_id: number,
  association_id:number,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfilePage(props: any) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [bee, setBee] = useState<Float32Array>();
    const [rating, setRating] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);

    const [totalMissionPassed, setTotalMissionPassed] = useState<number>(0);
    const [totalMissionActive, setTotalMissionActive] = useState<number>(0);

    const [totalParticipation, setTotalParticipation] = useState<number>(0);
    const [listParticipant, setListParticipant] = useState<number[]>([]);
    const [participantsProfiles, setParticipantsProfiles] = useState<VProfile[]>([]);

    const [followers, setFollowers] = useState<number>(0);
    const [followersProfiles, setFollowersProfiles] = useState<VProfile[]>([]);

    const [openParticipant, setOpenParticipant] = useState(false);
    const handleOpenParticipant = () => setOpenParticipant(true);
    const handleCloseParticipant = () => setOpenParticipant(false);

    const image =
        "https://urgo.fr/wp-content/uploads/2022/03/Logo-Reforestaction.png";
        
    const navigate = useNavigate();


  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const getAllFollowers = async () => {
    await fetch(`${config.apiUrl}/follows/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
    }).then(async (response) => {
      if (response.status === 200) {
        await response.json().then(async (data) => {
          setFollowers(data.length);
          await Promise.all(data.map(async (element: follow) => {
            await fetch(`${config.apiUrl}/volunteers/profile/${element.volunteer_id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }).then((res) => {
              if (res.status === 200) {
                res.json().then((data: VProfile) => {
                  setFollowersProfiles(followersProfiles => [...followersProfiles, data])
                })
              }
              else {
                console.log("Error fetching Total Follower");
                alert("failed to fecth volunteer profile")
              }
            }).catch((error) => {
              console.log(error);
              alert("[Critical] failed to fecth volunteer profile")
            })
          }))
        })
      } else {
        console.log("Error fetching Total Follower");
        console.log(response)
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  const getTotalParticipation = async () => {
    await fetch(`${config.apiUrl}/missions/volunteer/participations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data)
          setTotalParticipation(data.participation_number);
          setListParticipant(data.participants)
          console.log("Got participants")
        })
      } else if (response.status === 400) {
        alert("this association has no missions")
      } else {
        console.log("Error fetching Total Missions");
        console.log(response)
      }
    })
  }

  const getProfileParticipants = async() => {
    console.log(listParticipant)
    let result = await Promise.all(listParticipant.map(async (element: number) => {
      await fetch(`${config.apiUrl}/volunteers/profile/${element}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data)
            setParticipantsProfiles(participantsProfiles => [...participantsProfiles, data.volunteer])
            return data.volunteer
          })
        }
        else {
          console.log("Error fetching Total Follower");
          alert("failed to fecth volunteer profile")
        }
      }).catch((error) => {
        console.log(error);
        alert("[Critical] failed to fecth volunteer profile")
      })
    }))
    //console.log(result)
  }

  const getTotalMissions = async () => {
    await fetch(`${config.apiUrl}/missions/association/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,

      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data: getMission) => {
          setTotalMissionPassed(data.passed.length);
          setTotalMissionActive(data.active.length);
          
          let justHours = 0;
          let justMinutes = 0;
          data.passed.map((mission : Mission) => {
            const startTime = new Date(mission.start_date) 
            const endTime = new Date(mission.end_date) 

            const hours = endTime.getHours() - startTime.getHours();
            const minutes = endTime.getMinutes() - startTime.getMinutes();
            justHours += hours;
            justMinutes += minutes
          })
          setHours(justHours)
          setMinutes(justMinutes)
        })
      } else {
        console.log("Error fetching Total Missions");
        console.log(response)
      }
    }).catch((error) => {
      console.log(error);
    })

  }

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
                            setBee(data.association.bee);
                            setRating(data.association.rating);
                            //setHours(data.association.nb_hours);
                            setFollowers(data.nb_followers);
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
        getTotalMissions();
        getAllFollowers();
        getTotalParticipation();
    }, []);

    useEffect(() => {
      setParticipantsProfiles([])
      getProfileParticipants()
    }, [openParticipant])


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
          flexDirection: "column",
          alignItems: "center",
          //justifyContent: "flex-start",
          //alignSelf: "self-start",
          textAlign: "center",
          padding: "10px",
        }}>
          <img src={image} alt="Logo de profil" />
          <h1>Association: {name} </h1>
          <h2 className="header-rating"> {rating} / 5 </h2>
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
              <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <h1>
                  {followers}
                </h1>
                <h4>
                  {followers ? "Volontaires vous suivent" : "Vous n'avez actuellement aucun follower"}
                </h4>
              </Card>
              <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <CardContent style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', margin: "-15px"}}>
                <h1>
                  {totalParticipation}
                </h1>
                <h4 style={{margin: "-0px"}}>
                  Participations
                </h4>
                </CardContent>
                <CardActions>
                <Button onClick={handleOpenParticipant}>Détails</Button>
                <Modal
                  open={openParticipant}
                  onClose={handleCloseParticipant}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Nom de Famille</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Heure Confirmés</TableCell>
                            <TableCell align="center">Score</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {participantsProfiles.map((row : VProfile) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.id}
                              </TableCell>
                              <TableCell align="center">{row.last_name}</TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">{row.nb_hours}</TableCell>
                              <TableCell align="center">{row.bee}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Modal>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <h2>
            Historique
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
              <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'left'}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: "-10px"}}>
                  <h1 style={{margin: "20px"}}>
                    {totalMissionPassed} 
                  </h1>
                <h4>
                  Missions passées
                </h4>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', margin: "-10px"}}>
                
                <h1 style={{margin: "20px"}}>
                  {totalMissionActive}
                  </h1>
                <h4>
                   Missions en cours
                </h4>
                </div>
                
              </Card>
              <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <h1>
                  {hours}h{minutes}
                </h1>
                <h4>
                  Missions réalisées depuis le début du compte
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
          <button className="profile-pic-btn" onClick={() => { navigate("/settings/profile_information"); }}>
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