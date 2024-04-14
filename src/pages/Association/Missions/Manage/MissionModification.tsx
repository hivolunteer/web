/**
 * @module MissionModification.tsx
 * @description Mission Modification Page
 * @utility This page is used to modify a mission
*/

import {Autocomplete, Box, Button, Chip, Grid, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import { Image } from "mui-image";
import { LocalizationProvider, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Lottie from "lottie-react";
import moment from "moment";
import "moment/locale/de";
import './MissionModification.scss';
import config from "../../../../config";
import LocationModal from "../Modal/LocationModal";
import noImage from "../../../../images/lottie/noImage.json";
import { Mission, Location, Volunteer } from "./Interfaces";

interface MissionModificationData {
  missionName?: string;
  missionDescription?: string;
  missionPracticalInformation?: string;
  missionAddress?: string;
  missionDate?: Date;
  missionEndDate?: Date;
  missionVolunteersNumber?: number;
  missionReferent?: string;
  missionSkills?: string;
}

interface SkillDatabase {
  id: number;
  skill_name: string;
  color_hex: string;
}

interface Address {
  street_number: number | null
  street_number_suffix: string | null,
  street_name: string,
  street_type: string | null,
  city: string,
  postal_code: number | null,
  departement_id: number | null
}

const noImageComponent = () => {
  return (
    <>
      {/* <p>Vous n'avez pas encore choisi de photo</p> */}
      <Lottie animationData={noImage} />
    </>
  );
};

export default function MissionModification() {
  const [image, setImage] = React.useState<any>(null);
  const [form, setForm] = React.useState<MissionModificationData>();
  const [newSkill, setNewSkill] = useState<Array<number>>([]);
  const [skillDb, setSkillDb] = useState<Array<SkillDatabase>>([]);

  const [mission, setMission] = useState<Mission>()
  const [location, setLocation] = useState<Location>()
  const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([])

  // get id from url
  const url = window.location.href;
  // get mission if from url which is "/:id/edit" and i want to get the id
  const mission_id = url.split("/").slice(-2, -1)[0];
  console.log(mission_id)

  // preparation for adress modal
  const [open, setOpen] = React.useState<boolean>(false);
  const [address, setAddress] = useState<Address>({
    street_number: null,
    street_number_suffix: null,
    street_name: "",
    street_type: "",
    city: "",
    departement_id: null,
    postal_code: null,
  });
  const [locationStr, setLocationStr] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect to get mission from database
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${config.apiUrl}/missions/association/${mission_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
            console.log("DATA", data.association_mission);
            setMission(data.association_mission);
            console.log("MISSION" + mission)
            fetch(`${config.apiUrl}/locations/${data.association_mission?.location}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log("RESPONSE", response);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        setLocation(data);
                    })
                }
            })
            if (data.association_mission?.status === 1) {
                fetch(`${config.apiUrl}/missions/volunteer/${mission_id}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setListVolunteers(data)
                            console.log("VOLUNTEERS", data);
                        })
                    }
                })
            }
        })
        setForm({
          missionName: mission?.title,
          missionDescription: mission?.description,
          missionPracticalInformation: mission?.practical_information,
          missionDate: moment.utc(mission?.start_date).local().toDate(),
          missionEndDate: moment.utc(mission?.end_date).local().toDate(),
          missionReferent: mission?.referent,
        
          /* missionAddress: location?.id,
          missionVolunteersNumber: mission?.volunteers_number,
          missionSkills: mission?.skills, */
        });
      } else {
        window.location.href = "/";
      }
    })
  }, []);

  // useEffect to get skills from database

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${config.apiUrl}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setSkillDb(data);
        });
      }
    })
  }, []);

  // handle Modification of new mission
  const updateMission = async () => {
    const token = localStorage.getItem("token");
    let body = {
      missionName: form?.missionName,
      missionDescription: form?.missionDescription,
      missionPracticalInformation: form?.missionPracticalInformation,
      missionAddress: address,
      missionDate: form?.missionDate,
      missionEndDate: form?.missionEndDate,
      missionVolunteersNumber: form?.missionVolunteersNumber,
      missionReferent: form?.missionReferent,
      missionSkills: newSkill,
    };
    fetch(`${config.apiUrl}/missions/association/update/${mission_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "10vh",
          }}
        >
          <h1>Modifier la mission</h1>
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            "& > p": {
              marginBottom: "10",
            },
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10",
          }}
        >
          {/* <p>Remplissez le formulaire ci-dessous pour créer une mission</p> */}

          {!image ? (
            noImageComponent()
          ) : (
            <Image
              src={image}
              height="20%"
              width="20%"
              fit="contain"
              showLoading={true}
              shiftDuration={100}
              errorIcon={true}
              style={{ marginBottom: "10%" }}
            />
          )}
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  let reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setImage(reader.result);
                  };
                  reader.onerror = () => {
                    console.log(reader.error);
                  };
                }
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Modifier la photo
            </div>
          </label>
        </Box>

        <Box component="form">
          <Grid container spacing={3}  >
            <Grid item xs={6} lg={6}>
              <TextField
                name="missionName"
                required
                fullWidth
                id="missionName"
                label="Nom de la mission"
                value={form?.missionName}
                onChange={(missionName) => {
                  setForm({ ...form, missionName: missionName.target.value });
                }}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField
                name="missionDescription"
                required
                multiline={true}
                fullWidth
                id="missionDescription"
                label="Description de la mission"
                value={form?.missionDescription}
                onChange={(missionDescription) => {
                  setForm({
                    ...form,
                    missionDescription: missionDescription.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField
                name="missionPracticalInformation"
                required
                multiline={true}
                fullWidth
                id="missionPracticalInformation"
                label="Informations pratiques"
                value={form?.missionPracticalInformation}
                onChange={(missionPracticalInformation) => {
                  setForm({
                    ...form,
                    missionPracticalInformation:
                      missionPracticalInformation.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6} lg={6}>
              <p
                style={{
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                {(locationStr !== null) ? locationStr : "Ajouter une adresse"}
              </p>
              <LocationModal
                  open={open}
                  handleClose={handleClose}
                  location={address}
                  setLocation={setAddress}
                  setLocationString={setLocationStr}
                  setId={setLocationId}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <DateTimePicker
                label="Date de début"
                format="DD/MM/YYYY HH:mm"
                defaultValue={moment.utc().local()}
                onChange={(date) => {
                  setForm({
                    ...form,
                    missionDate: moment(date).utc().local().toDate(),
                  });
                }}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <TimePicker
                  label="Fin de la mission"
                  format="HH:mm"
                  defaultValue={moment.utc().local()}
                  onChange={(date) => {
                    setForm({
                      ...form,
                      missionEndDate: moment(date).utc().local().toDate(),
                    });
                  }}
                />
            </Grid>
            <Grid item xs={6} lg={6}>
              <TextField
                autoComplete="name"
                name="missionVolunteersNumber"
                type={"number"}
                required
                fullWidth
                id="name"
                inputMode={"numeric"}
                label="Nombre de bénévoles"
                inputProps={{min: 1}}
                value={form?.missionVolunteersNumber}
                onChange={(missionVolunteersNumber) => {
                  setForm({
                    ...form,
                    missionVolunteersNumber: Number(
                      missionVolunteersNumber.target.value
                    ),
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                multiline={true}
                fullWidth
                id="name"
                label="Coordonnées de referent de la mission"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Autocomplete
                multiple
                id="skills"
                options={skillDb}
                getOptionLabel={(option) => option.skill_name}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Compétences"
                    placeholder="Compétences"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.skill_name}
                      {...getTagProps({ index })}
                      style={{ backgroundColor: option.color_hex, border: "none" }}
                    />
                  ))
                }
                // when skill is added
                onChange={(event, value) => {
                  setNewSkill(value.map((skill) => skill.id));
                }}
              />
            </Grid>
          </Grid>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "1%",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={() => {
                updateMission();
              }}
            >
              Créer la mission
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
