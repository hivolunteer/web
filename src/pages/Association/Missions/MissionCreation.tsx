/**
 * @module MissionCreation.tsx
 * @description Mission Creation Page
 * @utility This page is used to create a mission
*/

import {Autocomplete, Box, Button, Chip, Grid, TextField, FormControlLabel, Checkbox} from "@mui/material";
import React, {useEffect, useState} from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Lottie from "lottie-react";
import moment from "moment";
import "moment/locale/de";
import './MissionCreation.scss';
import config from "../../../config";
import LocationModal from "./Modal/LocationModal";
import noImage from "../../../images/lottie/noImage.json";
import { Referent } from "./Interface/Referent";
import ReferentModal from "./Modal/ReferentModal";
import MissionPanel from "../../Volunteer/Search/Panels/MissionPanel";

interface MissionCreationData {
  missionName?: string;
  missionDescription?: string;
  missionPracticalInformation?: string;
  missionAddress?: string;
  missionDate?: Date;
  missionEndDate?: Date;
  missionVolunteersNumber?: number;
  missionReferent?: string;
  missionSkills?: string;
  missionAcceptMinors?: boolean;
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

export default function MissionCreation() {
  const [image, setImage] = React.useState<any>(null);
  const [form, setForm] = React.useState<MissionCreationData>();
  const [newSkill, setNewSkill] = useState<Array<number>>([]);
  const [skillDb, setSkillDb] = useState<Array<SkillDatabase>>([]);

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

  const [missionDateRanges, setMissionDateRanges] = useState<
    { start: Date | null; end: Date | null }[]
  >([{ start: null, end: null }]);

  interface AcceptMinorRadioProps {
    checked: boolean;
    onChange: (value: boolean) => void;
  }

  const handleAddDateRange = () => {
    setMissionDateRanges([...missionDateRanges, { start: null, end: null }]);
  };

  const handleRemoveDateRange = (index: number) => {
    const updatedDateRanges = [...missionDateRanges];
    updatedDateRanges.splice(index, 1);
    setMissionDateRanges(updatedDateRanges);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openReferent, setOpenReferent] = React.useState<boolean>(false);
  const [referentListSelected, setReferentListSelected] = useState<Array<Referent>>([]);

  const handleCloseReferent = () => {
    setOpenReferent(false);
  }
  function InputFileUpload({ onFileChange }: { onFileChange: (file: File) => void }) {
    const [preview, setPreview] = useState<string | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        onFileChange(file);
        setPreview(URL.createObjectURL(file)); // Set the image preview
      }
    };
  
    return (
      <label htmlFor="upload-photo">
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "contain" }} />
        ) : (
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
        )}
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    );
  }  

  const handleImageChange = (file: File) => {
    setImage(file);
  };
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

  // handle creation of new mission
  const createNewMission = () => {
    let referents = referentListSelected.map((referent) => referent.id);
    const token = localStorage.getItem("token");
    let startDates: Date[] = [];
    let endDates: Date[] = [];

    missionDateRanges
    .map((mission: {start: Date | null; end: Date | null}) => {
      if ((mission.start === null) || (mission.end === null)) {
        alert("Pas de dates entrées")
      }
      if (mission.start) startDates.push(mission.start)
      if (mission.end) endDates.push(mission.end)
    })
     
    const body = {
      max_volunteers: form?.missionVolunteersNumber,
      description: form?.missionDescription,
      practical_information: form?.missionPracticalInformation,
      location: locationId,
      start_dates: startDates,
      end_dates: endDates,
      title: form?.missionName,
      skills: newSkill,
      referents: referents,
      accept_minors: form?.missionAcceptMinors,
    };
    console.log(body);
    fetch(`${config.apiUrl}/missions/association/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data)
          const formData = new FormData();
          if (image) {
            formData.append("file", image);
          }
          data.association_missions.forEach((id: number) => {
            fetch(`${config.apiUrl}/uploads/${localStorage.getItem('role')}/mission/${id}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: formData
            }).then(
              (response) => {
                if (response.status === 201) {
                  console.log("Image uploaded");
                  window.location.href = "/";
                }
              }
            )
            .catch(
              (error) => {
                console.error("Error while uploading image");
              }  )
          });
        
        });
      }
    })
    .catch(
      (error) => {
        console.error("Error while creating mission");
      }
    )
  };

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
          <h1>Créer une mission</h1>
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
          {!image ? (
            noImageComponent()
          ) : (
            <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: "20%", height: "20%", objectFit: "contain", marginBottom: "2%" }} />
          )}
          <InputFileUpload onFileChange={handleImageChange} />
        </Box>
        <Box component="form">
          <Grid container spacing={3} className="wrapper" style={{ display: "flex", justifyContent: "center" }}>
            <LocationModal
                open={open}
                handleClose={handleClose}
                location={address}
                setLocation={setAddress}
                setLocationString={setLocationStr}
                setId={setLocationId}
            />
            <Grid item xs={8} lg={8} display="flex" justifyContent="center">
              <TextField
                name="missionName"
                required
                fullWidth
                id="missionName"
                label="Nom de la mission"
                rows={1}
                value={form?.missionName}
                onChange={(missionName) => {
                  setForm({ ...form, missionName: missionName.target.value });
                }}
              />
            </Grid>
            <Grid item xs={8} lg={8}>
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
            <Grid item xs={8} lg={8} style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                style={{ width: "100%" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                {(locationStr !== null) ? locationStr : "Ajouter une adresse"}
              </Button>
            </Grid>
            <Grid item xs={8} lg={8}>
              <TextField
                name="missionDescription"
                required
                multiline={true}
                fullWidth
                id="missionDescription"
                label="Description de la mission"
                rows={4}
                value={form?.missionDescription}
                onChange={(missionDescription) => {
                  setForm({
                    ...form,
                    missionDescription: missionDescription.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={8} lg={8}>
              <TextField
                name="missionPracticalInformation"
                required
                multiline={true}
                fullWidth
                rows={4}
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
            <Grid item xs={8} lg={8}>
              <Button
              variant="outlined"
                style={{
                  width: "100%"
                }}
                onClick={() => {
                  setOpenReferent(true);
                }}
              >
                {(referentListSelected.length !== 0) ? referentListSelected.map((referent) => referent.complete_name).join(", ") : "Ajouter un référent"}
              </Button>
              <ReferentModal
                open={openReferent}
                handleClose={handleCloseReferent}
                referentListSelected={referentListSelected}
                setReferentListSelected={setReferentListSelected}
              />
            </Grid>
            <Grid item xs={8} lg={8}>
              {missionDateRanges.map((dateRange, index) => (
                <Box key={index} display={"flex"} marginBottom={"10px"} alignItems="center">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <DateTimePicker
                        label="Date et heure de début de la mission"
                        format="DD/MM/YYYY HH:mm"
                        defaultValue={moment.utc().local()}
                        value={dateRange.start ? moment(dateRange.start) : null}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={(date) => {
                          if (date) {
                            const updatedDateRanges = [...missionDateRanges];
                            updatedDateRanges[index].start = date.toDate();
                            if (index === updatedDateRanges.length - 1) {
                              setForm({
                                ...form,
                                missionEndDate: date.toDate(),
                              });
                            }
                            setMissionDateRanges(updatedDateRanges);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DateTimePicker
                        label="Date et heure de fin de la mission"
                        format="DD/MM/YYYY HH:mm"
                        defaultValue={moment.utc().local()}
                        value={dateRange.end ? moment(dateRange.end) : null}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={(date) => {
                          if (date) {
                            const updatedDateRanges = [...missionDateRanges];
                            updatedDateRanges[index].end = date.toDate();
                            if (index === updatedDateRanges.length - 1) {
                              setForm({
                                ...form,
                                missionEndDate: date.toDate(),
                              });
                            }
                            setMissionDateRanges(updatedDateRanges);
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  onClick={handleAddDateRange}
                  variant="outlined"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Ajouter une nouvelle plage horaire
                </Button>
                {missionDateRanges.length > 1 && (
                  <Button
                    variant="outlined"
                    style={{marginLeft: "10px"}}
                    color="error"
                    onClick={() => handleRemoveDateRange(missionDateRanges.length - 1)}
                  >
                    Supprimer
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={8} lg={8}>
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
            <Grid item xs={8} lg={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <FormControlLabel
                control={<Checkbox checked={form?.missionAcceptMinors} onChange={(e) => setForm({ ...form, missionAcceptMinors: e.target.checked })} />}
                label="Accepter les personnes mineures"
              />
            </Grid>
          </Grid>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              margin: "40px",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              component="span"
              onClick={() => {
                createNewMission();
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
