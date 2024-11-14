/**
 * @module MissionModification.tsx
 * @description Mission Modification Page
 * @utility This page is used to modify a mission
*/

import { Autocomplete, Box, Button, Chip, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Lottie from "lottie-react";
import moment from "moment";
import "moment/locale/de";
import './MissionModification.scss';
import config from "../../../../config";
import LocationModal from "../Modal/LocationModal";
import noImage from "../../../../images/lottie/noImage.json";
import { useParams } from "react-router-dom";
import CompanyModal from "../Modal/CompanyModal";

interface MissionModificationData {
  missionName?: string;
  missionDescription?: string;
  missionPracticalInformation?: string;
  missionAddress?: string;
  missionPicture?: string;
  missionDate?: Date;
  missionEndDate?: Date;
  missionVolunteersNumber?: number;
  missionSkills?: string;
  missionAcceptMinors?: boolean;
}

interface SkillDatabase {
  id: number;
  skill_name: string;
  skill_id: number;
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

export default function MissionModification() {
  const [image, setImage] = React.useState<any>(null);
  const [form, setForm] = React.useState<MissionModificationData>();
  const [selectedSkills, setSelectedSkills] = useState<Array<SkillDatabase>>([]);
  const [skillDb, setSkillDb] = useState<Array<SkillDatabase>>([]);

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
  const [locationStr, setLocationStr] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const mission_id = useParams()['id']

  const [companyModal, setCompanyModal] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<{ id: number, name: string, profile_picture: string} | null>(null)

  const handleCloseCompanyModal = () => {
    setCompanyModal(false);
  };

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
    setForm(
      {
        ...form,
        missionPicture: URL.createObjectURL(file),
      }
    )
    setImage(file);
  };

  // useEffect to get skills from database
  function fetchSkills(presets: SkillDatabase[]) {
    fetch(`${config.apiUrl}/missions/skills/${mission_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ associationmission: true })
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          if (data && data.length > 0) {
            const skills: number[] = data.map((skill: any) => skill.skill_id);
            const selectedSkills: SkillDatabase[] = presets.filter((skill: SkillDatabase) => {
              return isPresent(skill.id, skills)
            })

            setSelectedSkills(selectedSkills);
          }
        });
      }
    })
  }

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
        response.json().then((data: SkillDatabase[]) => {
          setSkillDb(data);
          fetchSkills(data);
        });
      }
    })
  }, [fetchSkills]);

  function isPresent(presetId: number, skills: number[]): boolean {
    return skills.includes(presetId)
  }

  useEffect(() => {
    // Get mission info
    const token = localStorage.getItem("token");

    fetch(`${config.apiUrl}/missions/association/${mission_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setForm({
            missionName: data.association_mission.title,
            missionDescription: data.association_mission.description,
            missionPracticalInformation: data.association_mission.practical_information,
            missionVolunteersNumber: data.association_mission.max_volunteers,
            missionAcceptMinors: data.association_mission.accept_minors,
            missionPicture: data.association_mission.picture,
            missionDate: data.association_mission.start_date,
            missionEndDate: data.association_mission.end_date,
          });
          fetch(`${config.apiUrl}/locations/${data.association_mission?.location}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setLocationId(data.id);
                setAddress(
                  {
                    name: data.name,
                    street_number: data.street_number,
                    street_number_suffix: data.street_number_suffix,
                    street_name: data.street_name,
                    street_type: data.street_type,
                    city: data.city,
                    departement_id: data.departement_id,
                    postal_code: data.postal_code,
                  }
                );
                setLocationStr(`${data.street_number || ''} ${data.street_number_suffix || ''} ${data.street_name || ''} ${data.street_type || ''}, ${data.postal_code || ''} ${data.city || ''}`);
              })
            }
          })

        })
          .catch(
            (error) => {
              console.error("Error while fetching mission data");
            }
          )
      }
    })
  }, [mission_id]);

  // handle modification of the mission
  const modifyMission = () => {
    const token = localStorage.getItem("token");

    const body = {
      max_volunteers: form?.missionVolunteersNumber,
      description: form?.missionDescription,
      practical_information: form?.missionPracticalInformation,
      location: locationId,
      start_date: form?.missionDate,
      end_date: form?.missionEndDate,
      title: form?.missionName,
      skills: selectedSkills,
      accept_minors: form?.missionAcceptMinors,
      company_id: (selectedCompany !== null) ? selectedCompany.id : null
    };
    fetch(`${config.apiUrl}/missions/association/update/${mission_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          const formData = new FormData();
          if (image) {
            formData.append("file", image);
          }
          window.location.href = "/"
          /* if (data && data.association_missions) {
            data.association_missions.forEach((mission: any) => {
              const missionId = mission.id
              fetch(`${config.apiUrl}/uploads/${localStorage.getItem('role')}/mission/${missionId}`, {
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
            window.location.href = "/"
          } else {
            console.error("No association missions found in the data");
          } */
        });
      }
    })
      .catch(
        (error) => {
          console.error("Error while modifying mission");
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
          <h1>Modifier la mission</h1>
        </Box>
        <Box sx={{ flexDirection: "column", "& > p": { marginBottom: "10" } }} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10" }}>
          {form?.missionPicture && (
            <img src={form?.missionPicture} alt="Preview" style={{ width: "20%", height: "20%", objectFit: "contain", marginBottom: "2%" }} />
          )}
          {form?.missionPicture === null && noImageComponent()}
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
                inputProps={{ min: 1 }}
                label={!form?.missionVolunteersNumber ? "Nombre de bénévoles" : null}
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
                rows={4}
                value={form?.missionDescription}
                label={!form?.missionDescription ? "Description de la mission" : null}
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
                value={form?.missionPracticalInformation}
                label={!form?.missionPracticalInformation ? "Nom de la mission" : null}
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
              <Box display={"flex"} marginBottom={"10px"} alignItems="center">
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Date et heure de début de la mission"
                      format="DD/MM/YYYY HH:mm"
                      value={form?.missionDate ? moment(form.missionDate) : null}
                      slotProps={{ textField: { fullWidth: true } }}
                      onChange={(date) => {
                        if (date) {
                          setForm({
                            ...form,
                            missionDate: date.toDate(),
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Date et heure de fin de la mission"
                      format="DD/MM/YYYY HH:mm"
                      value={form?.missionEndDate ? moment(form.missionEndDate) : null}
                      slotProps={{ textField: { fullWidth: true } }}
                      onChange={(date) => {
                        if (date) {
                          setForm({
                            ...form,
                            missionEndDate: date.toDate(),
                          });
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={8} lg={8}>
              <Autocomplete
                multiple
                value={selectedSkills}
                onChange={(event, newValue) => {
                  setSelectedSkills(newValue);
                }}
                id="skills"
                options={skillDb}
                getOptionLabel={(option) => option.skill_name}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Compétences"
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
              />
            </Grid>
            <Grid item xs={8} lg={8} sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.missionAcceptMinors || false}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        missionAcceptMinors: event.target.checked,
                      });
                    }
                    }
                  />
                }
                label="Accepter les personnes mineures"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              {
                (selectedCompany === null) && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCompanyModal(true);
                    }}
                  >
                    Ajouter une entreprise affiliée
                  </Button>
                ) 
              }
              {
                (selectedCompany !== null) && (
                  <Box>
                  <Button
                      variant="outlined"
                        style={{
                          width: "100%"
                        }}
                        onClick={() => {
                          setCompanyModal(true);
                        }}
                  >
                    {selectedCompany.name}
                  </Button>
                  </Box>
                )
              }
              <CompanyModal
                selectCompany={setSelectedCompany}
                companyModal={companyModal}
                closeCompanyModal={handleCloseCompanyModal}
              />
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
                modifyMission();
              }}
            >
              Modifier la mission
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}