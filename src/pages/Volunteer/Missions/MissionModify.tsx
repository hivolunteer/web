/**
 * @module MissionCreation.tsx
 * @description Mission Creation Page
 * @utility This page is used to create a mission
*/

import { Alert, Autocomplete, Box, Button, Chip, Grid, Link, TextField} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import { Image } from "mui-image";
import { LocalizationProvider, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Lottie from "lottie-react";
import moment from "moment";
import "moment/locale/de";
//import './MissionCreation.scss';
import config from "../../../config";
import LocationModal from "../../Association/Missions/Modal/LocationModal";
import noImage from "../../../images/lottie/noImage.json";
import { useParams } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

interface MissionModificationData {
  missionName?: string;
  missionDescription?: string;
  missionPracticalInformation?: string;
  missionAddress?: string | null;
  missionDate?: Date;
  missionEndDate?: Date;
  missionVolunteersNumber?: number;
  missionSkills?: string;
}

interface SkillDatabase {
  id: number;
  skill_name: string;
  color_hex: string;
}

interface Address {
  name: string,
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

export default function EditMission() {
  const { missionID } = useParams<{ missionID: string }>();
  const [image, setImage] = React.useState<any>(null);
  const [form, setForm] = React.useState<MissionModificationData>({
    missionName: "",
    missionDescription: "",
    missionPracticalInformation: "",
    missionAddress: null,
    missionDate: new Date(),
    missionEndDate: new Date(),
    missionVolunteersNumber: 0,
    missionSkills: "",
  })
  const [newSkill, setNewSkill] = useState<Array<number>>([]);
  const [skillDb, setSkillDb] = useState<Array<SkillDatabase>>([]);
  const [, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<{error: boolean, message: string}>({error: false, message: ""});

  // preparation for adress modal
  const [open, setOpen] = React.useState<boolean>(false);
  const [address, setAddress] = useState<Address>({
    name: "",
    street_number: null,
    street_number_suffix: null,
    street_name: "",
    street_type: "",
    city: "",
    departement_id: null,
    postal_code: null,
  });
  const [locationStr, setLocationStr] = useState<string | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const getMissionById: (missionId: number) => Promise<void> = useCallback(async (missionId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}/missions/close/${missionId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();
      if (!data.close_mission) {
        setError(`Mission with ID ${missionId} does not exist.`);
        return;
      }
      let mission = data.close_mission;
      setLocationId(mission.location);
      fetch(`${config.apiUrl}/locations/${mission.location}`, {
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
            //setLocation(data);

            setLocationStr(String(data.street_number) + " " + data.street_type + " "
              +data.street_name+", "+
              data.city +" "+ String(data.postal_code))
            console.log(locationStr);
            setForm({
              ...form,
              missionName: mission.title,
              missionDescription: mission.description,
              missionPracticalInformation: mission.practical_information,
              missionAddress: locationStr,
              missionDate: mission.start_date,
              missionEndDate: mission.end_date,
              missionVolunteersNumber: mission.max_volunteers,
              missionSkills: undefined,
            })
            console.log(form);
            
          })
        }
      })
      // should have a model for close mission too
      
      //fetchIfVolunteerIsRegistered(); // Call fetchIfVolunteerIsRegistered here
    } catch (error) {
      console.log("error");
      console.error('Load Error:', error);
      setError(`An error occurred: ${(error as Error).message}`);
    }
  }, [form, locationStr]);

  useEffect(() => {
    if (missionID) {
      getMissionById(parseInt(missionID));
    }
  }, [missionID, getMissionById]);

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

  // handle modification of a mission
  const ModifyMission = () => {
    const token = localStorage.getItem("token");
    const body = {
      //owner_id: Math.floor(Math.random() * 600) + 1,
      max_volunteers: form?.missionVolunteersNumber,
      description: form?.missionDescription,
      practical_information: form?.missionPracticalInformation,
      location: locationId,
      start_date: form?.missionDate,
      end_date: form?.missionEndDate,
      title: form?.missionName,
      skills: newSkill,
      theme_id: undefined,
      picture: image,
    };
    fetch(`${config.apiUrl}/missions/close/update/${missionID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) {
          setResponse({ error: false, message: "La mission a bien été modifiée" });
      
          // Wait for approximately 2 seconds before redirecting
          setTimeout(() => {
              window.location.href = `/mission/${missionID}`;
          }, 2000);
      
          return response.body;
        }
      }).catch((e) => {
        console.log(e)

        setResponse({error: true, message: "Erreur lors de la modification de mission"});
        setTimeout(() => {
          window.location.href = `/mission/${missionID}`;
        }, 2000);
      })
      
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "left",
            alignContent: "left",
            height: "1vh",
            marginTop: "2em",
            marginLeft: "0.5em"
          }}
        >
          <Link href="#" onClick={() => window.history.back()} color="inherit"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowBackOutlinedIcon onClick={() => window.history.back()} color="action" style={{ cursor: 'pointer' }} />
            Retour
          </Link>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "10vh",
          }}
        >
          <h1>Modifier une mission</h1>
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
                value={form?.missionName as string}
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
                ModifyMission();
              }}
            >
              Modifier la mission
            </Button>
          </Box>
        </Box>
      </Box>
      { response.message &&
        <Alert severity={ response.error ? "error" : "success" }>
          { response.message }
        </Alert>
      }
    </LocalizationProvider>
  );
}
