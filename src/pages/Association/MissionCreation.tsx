import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { Image } from "mui-image";
import "moment/locale/de";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import Lottie from "lottie-react";
import noImage from "../../Images/lottie/noImage.json";
import AddressAutocomplete, {
  AddressAutocompleteValue,
} from "mui-address-autocomplete";
import { AuthenticationService } from "../../services/authentication.service";
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

const isNumberKey = (evt: KeyboardEvent | any) => {
  const charCode = evt.which ? evt.which : evt.keyCode;
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
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

  /* checking volunteer number */
  const checkVolunteerNb = (volunteerNb: string) => {
    const regex = /^[0-9]+$/;
    // check if volunteerNb is a number
    if (regex.test(volunteerNb)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const createNewMission = () => {
    const token = localStorage.getItem("token");
    const body = {
      owner_id: Math.floor(Math.random() * 600) + 1,
      max_volunteers: form?.missionVolunteersNumber,
      description: form?.missionDescription,
      practical_information: form?.missionPracticalInformation,
      location: "Paris",
      start_date: "2023-06-11 17:15:40.602 UTC",
      end_date: "2023-06-11 17:15:40.602 UTC",
      title: form?.missionName,
    };
    console.log(body);
    fetch("http://localhost:8000/missions/association/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
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
          <Grid container spacing={2} direction="column" alignContent="center">
            <Grid item xs={12} lg={8}>
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
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={4}>
              <TimePicker label="Fin de la mission" />
            </Grid>
            <Grid item xs={12} lg={4}>
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
            <Grid item xs={12} lg={6}>
              <TextField
                autoComplete="name"
                name="name"
                multiline={true}
                fullWidth
                id="name"
                label="Compétences requises"
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
