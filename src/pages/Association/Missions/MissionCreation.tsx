import {Box, Button, Chip, Grid, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import { Image } from "mui-image";
import "moment/locale/de";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import Lottie from "lottie-react";
import noImage from "../../../images/lottie/noImage.json";
import AddressAutocomplete, {
  AddressAutocompleteValue,
} from "mui-address-autocomplete";
import { AuthenticationService } from "../../../services/authentication.service";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

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
}

const noImageComponent = () => {
  return (
    <>
      <p>Vous n'avez pas encore choisi de photo</p>
      <Lottie animationData={noImage} />
    </>
  );
};

export default function MissionCreation() {
  const [image, setImage] = React.useState<any>(null);
  const [address, setAddress] = React.useState<AddressAutocompleteValue | null>(
    {
      place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
      description: "Paris, France",
      components: {},
      structured_formatting: {
        main_text: "Paris",
        secondary_text: "France",
        main_text_matched_substrings: [],
      },
    }
  );
  const [form, setForm] = React.useState<MissionCreationData>();
  const [error, setError] = React.useState<boolean>(false);
  const [newSkill, setNewSkill] = useState(["Ukrainien"]);

  const handleDelete = (chipToDelete: string) => {
    setNewSkill(chips => chips.filter((chip) => chip !== chipToDelete));
  }

  const createNewMission = () => {
    const token = localStorage.getItem("token");
    const body = {
      owner_id: Math.floor(Math.random() * 600) + 1,
      max_volunteers: form?.missionVolunteersNumber,
      description: form?.missionDescription,
      practical_information: form?.missionPracticalInformation,
      location: "Paris",
      start_date: form?.missionDate,
      end_date: form?.missionEndDate,
      title: form?.missionName,
    };
    console.log(body);
    fetch("http://localhost:8000/missions/association/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, // localStorage.getItem("token")
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Mission créée");
          window.location.href = "/";
          return response.body;
        }
      })
      .then(
        (data) => {
          data
            ?.getReader()
            .read()
            .then(({ done, value }) => {
              if (done) {
                return;
              }
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };
  /* checking the response */
  const responseExecute = (responseStatus: number) => {
    switch (responseStatus) {
      case 200:
        alert("Connexion réussie");
        //navigate to correct page
        break;
      case 401:
        alert("Connexion échouée");
        break;
      default:
        alert("Erreur inconnue");
        break;
    }
  };

  const addSkills = (event: any) => {
    setForm({
      ...form,
      missionSkills: event.target.value,
    });
  }
  const handleKeyPress = (e: any) => {

    if (e.key === "Enter") {
      setNewSkill((prev: any): any => {
        return [...prev, form?.missionSkills]
      });
      setForm({
        ...form,
        missionSkills: "",
      })
    }
  }

  // sending data to the back
  const sendData = async (data: FormData) => {
    // convert FormData to table
    const mission = Object.fromEntries(data.entries());
    const response_status = AuthenticationService.loginAssociations(mission);
    console.log(response_status);
    responseExecute(await response_status);
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return false;
    const re = new RegExp("[0-9]+");
    setError(re.test(e.target.value.trim()));
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
          <p>Remplissez le formulaire ci-dessous pour créer une mission</p>

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

            <Button
              color="secondary"
              variant="contained"
              component="span"
              style={{ marginBottom: "10%" }}
            >
              Modifier la photo
            </Button>
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
              <AddressAutocomplete
                apiKey="AIzaSyDq1CgJltdWn8rUq5KoWX5c-PXHeOMFDO0" // add 0
                label="Adresse de la mission"
                onChange={(_, value) => {
                  setAddress(value);
                  setForm({ ...form, missionAddress: value?.description });
                }}
                value={address}
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
            <Grid item xs={12} lg={6} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
              <Stack direction="row" spacing={2}>
                {
                  newSkill.map(chip => (
                      <Chip key={chip}
                            color='primary'
                            style={{ backgroundColor: "green"}}
                            label={chip}
                            onDelete={() => handleDelete(chip)} />
                  ))
                }
              </Stack>
            </Grid>
            <Grid item xs={12} lg={6} />
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                value={form?.missionSkills}
                id="name"
                label="Compétences requises"
                onKeyPress={handleKeyPress}
                onChange={addSkills}
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
