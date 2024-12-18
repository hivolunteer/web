import * as React from "react";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import config from "../../../config";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { Mission } from "../../../interfaces";

import Button from '@mui/material/Button';

import EditPasswordModal from "./EditPasswordModal";
import CardWidgetsRevenueReport from "./statsComponent";
import EmployeeRanking from "./cardStats";

const submark = require("../../../images/logo/submark.png")

// type newProfile = {
//   name: string;
//   description: string;
//   email: string;
//   phone: string;
//   profile_picture: string | null | undefined
// };

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

interface getMission {
  draft: Mission[],
  active: Mission[],
  passed: Mission[],
}

interface follow {
  volunteer_id: number,
  association_id: number,
}

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ProfilePage(props: any) {

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>();
  const [, setBee] = useState<Float32Array>();
  const [rating, setRating] = useState<number>(0);
  const [, setHours] = useState<number>(0);
  const [, setMinutes] = useState<number>(0);

  const [, setTotalMissionPassed] = useState<number>(0);
  const [, setTotalMissionActive] = useState<number>(0);

  const [totalParticipation, setTotalParticipation] = useState<number>(0);
  const [listParticipant, setListParticipant] = useState<number[]>([]);
  const [, setParticipantsProfiles] = useState<VProfile[]>([]);

  const [followers, setFollowers] = useState<number>(0);
  const [, setFollowersProfiles] = useState<VProfile[]>([]);

  //const [openParticipant, setOpenParticipant] = useState<boolean>(false);
  // const handleOpenParticipant = () => setOpenParticipant(true);
  // const handleCloseParticipant = () => setOpenParticipant(false);

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

  const getProfileParticipants = useCallback(async () => {
    await Promise.all(listParticipant.map(async (element: number) => {
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
  }, [listParticipant])

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
          data.passed.map((mission: Mission) => {
            const startTime = new Date(mission.start_date)
            const endTime = new Date(mission.end_date)

            let days = endTime.getDay() - startTime.getDay();
            let hours = (endTime.getHours() + 24 * days) - startTime.getHours();
            let minutes = Math.abs(endTime.getMinutes() - startTime.getMinutes());
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
  }, [setParticipantsProfiles, getProfileParticipants])


  // function validateEmail(email: string): boolean {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       const dataUrl = reader.result as string;
  //       setProfilePicture(dataUrl);
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       fetch(`${config.apiUrl}volunteers/profile/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: formData,
  //       })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             alert("Profile picture updated successfully");
  //           } else {
  //             console.log("Error updating profile picture");
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  //   }
  // };



  // const updateProfile = () => {
  //   if (!validateEmail(email)) {
  //     console.error("Invalid email");
  //     return;
  //   }
  //   let profile: newProfile = {
  //     name: name,
  //     email: email,
  //     phone: phone,
  //     profile_picture: (profilePicture == null) ? null : profilePicture,
  //     description: ""
  //   };
  //   fetch(`${config.apiUrl}/volunteers/update`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(profile),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
        <img src={(profilePicture !== null) ? profilePicture : submark} alt="Logo de profil" style={{ width: "auto", height: "200px" }} />
        <h1>{name} </h1>
        <h2 className="header-rating"> {rating} / 5 </h2>
      </div>

      <div className="profile-asso-container-div">

        <h2>
          Bénévoles
        </h2>
        <EmployeeRanking nb_followers={followers} nb_participation={totalParticipation} />
        <Grid container alignItems="stretch" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: "space-between",
        }}>
          <Grid item style={{
            display: 'flex',
            marginBottom: "30px",
          }}>
            {/* <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius : '1rem'}}>
                <h1>
                  {followers}
                </h1>
                <h4>
                  {followers ? "Bénévoles vous suivent" : "Vous n'avez actuellement aucun follower"}
                </h4>
              </Card>
              <Card className={"card-component"} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius : '1rem'}}>
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
              </Card> */}
          </Grid>
        </Grid>
        <h2>
          Historique
        </h2>
        {/*<Grid container alignItems="stretch" style={{
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
                  Temps réalisé en missions
                </h4>
              </Card>
            </Grid>
          </Grid>*/}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CardWidgetsRevenueReport />
        </div>
        <h2>
          Description de l'association
        </h2>
        <p style={{ textAlign: 'center' }}>
          {description === null || description === undefined || description === "" ? "Aucune description n'est disponible pour cette association" : description}
        </p>
        <h2>
          Contact
        </h2>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "50px",
          padding: "10px",
        }}>
          <label>E-mail:</label>
          <a href="mailto:">
            {email}
          </a>
          <label>Numéro de téléphone:</label>
          <a href="tel:">
            {phone}
          </a>
        </div>
      </div>
      <div className="profile-btn-div">
        <Button sx={{ marginInlineEnd: '5rem' }} variant="contained" color="primary" onClick={() => { navigate("/settings/profile_information"); }}>
          Mettre à jour le profile
        </Button>
        {/* <button className="delete-account-btn" onClick={deleteAccount}>
                  Supprimer le compte
              </button> */}
        <Button variant="contained" color="secondary" onClick={() => setOpenDialog(true)} style={{ backgroundColor: "#FFD700" }}>
          Modifier le mot de passe
        </Button>
        <EditPasswordModal modalProps={{ open: openDialog, onClose: closeDialog }} />
      </div>
    </>
  );
}