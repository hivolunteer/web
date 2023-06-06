import {Box, Button, Grid, Link, TextField} from "@mui/material";
import React from "react";
import {Image} from 'mui-image'
import 'moment/locale/de';
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import moment from "moment";
import Lottie from "lottie-react";
import noImage from "../../Images/lottie/noImage.json";
import AddressAutocomplete, {AddressAutocompleteValue} from 'mui-address-autocomplete';
import {AuthenticationService} from "../../services/authentication.service";

interface MissionCreation {
    missionName: string;
    missionDescription: string;
    missionPracticalInformation: string;
    missionAddress: AddressAutocompleteValue;
    missionDate: Date;
    missionEndDate: Date;
    missionVolunteersNumber: number;
    missionReferent: string;
    missionSkills: string;
}

const noImageComponent = () => {
    return <><p>Vous n'avez pas encore choisi de photo</p><Lottie animationData={noImage}/></>;
}

const isNumberKey = (evt: KeyboardEvent | any) => {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

}

export default function MissionCreation() {
    const [image, setImage] = React.useState<any>(null);
    const [value, setValue] = React.useState<AddressAutocompleteValue | null>({
        place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
        description: "Paris, France",
        components: {},
        structured_formatting: {
            main_text: "Paris",
            secondary_text: "France",
            main_text_matched_substrings: []
        }
    });
    const [form, setForm] = React.useState<MissionCreation>();
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

    /* checking the response */
    const responseExecute = (responseStatus: number) => {
        switch (responseStatus) {
            case 200:
                alert('Connexion réussie');
                //navigate to correct page
                break;
            case 401:
                alert('Connexion échouée');
                break;
            default:
                alert('Erreur inconnue');
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
    const re = new RegExp('[0-9]+');
    setError(re.test(e.target.value.trim()));
}
    return (
        <Box>
            <Box style={{display: 'flex', justifyContent: 'center', alignContent: 'center', height: '10vh'}}>
                <h1>Créer une mission</h1>
            </Box>
            <Box sx={{
                flexDirection: 'column',
                '& > p': {
                    marginBottom: '10'
                }
            }}
                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10'}}>
                <p>Remplissez le formulaire ci-dessous pour créer une mission</p>


                {!image ? noImageComponent() : <Image src={image} height="20%" width="20%" fit="contain" showLoading={true} shiftDuration={100} errorIcon={true} style={{marginBottom: '10%'}}/>}
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
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

                    <Button color="secondary" variant="contained" component="span" style={{marginBottom: '10%'}}>
                        Modifier la photo
                    </Button>
                </label>
            </Box>

            <Box component='form'>
                <Grid container
                      spacing={2}
                      direction="column"
                    //justifyContent="center"
                      alignContent="center"
                >
                    <Grid item xs={12} lg={8}>
                        <TextField
                            name='missionName'
                            required
                            fullWidth
                            id='missionName'
                            label='Nom de la mission'
                            value={form?.missionName}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            name='missionDescription'
                            required
                            multiline={true}
                            fullWidth
                            id='missionDescription'
                            label='Description de la mission'
                            value={form?.missionDescription}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            name='missionPracticalInformation'
                            required
                            multiline={true}
                            fullWidth
                            id='missionPracticalInformation'
                            label='Informations pratiques'
                            value={form?.missionPracticalInformation}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <AddressAutocomplete
                            apiKey="AIzaSyDq1CgJltdWn8rUq5KoWX5c-PXHeOMFDO" // add 0
                            label="Adresse de la mission"
                            onChange={(_, value) => {
                                setValue(value);
                            }}
                            value={value}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <DateTimePicker
                            label="Date de début"
                            format="DD/MM/YYYY HH:mm"
                            value={moment.utc().local()}
                            onChange={(date) => {
                                console.log(date);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TimePicker
                            label='Fin de la mission'
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            type={'number'}
                            required
                            fullWidth
                            id='name'
                            inputMode={'numeric'}
                            label='Nombre de bénévoles'
                            value={form?.missionVolunteersNumber}
                            onChange={handleValueChange}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            multiline={true}
                            fullWidth
                            id='name'
                            label='Coordonnées de referent de la mission'
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            multiline={true}
                            fullWidth
                            id='name'
                            label='Compétences requises'
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Button color="primary" variant="contained" component="span" style={{marginBottom: '10%', alignContent: 'center'}}>
                            Créer la mission
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}