import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Button, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import config from "../../../../config";

interface Address {
    street_number: number | null;
    street_number_suffix: string | null;
    street_name: string;
    street_type: string | null;
    city: string;
    postal_code: number | null
    departement_id : number | null;
}
  
  interface LocationModalProps {
    open: boolean;
    handleClose: () => void;
    location: Address;
    setLocation: (address: Address) => void;
    setLocationString: (address: string) => void;
    setId: (id: number) => void;
}
  

const LocationModal = ({
  open,
  handleClose,
  location,
  setLocation,
  setLocationString,
  setId
}: LocationModalProps) => {

    const [basicAddress, setBasicAddress] = useState<Address>(location);

    const street_suffix = [
        'BIS', 'TER', 'QUATER'
    ]

    const street_type = [
        'Rue', 'Av.', 'Bd.', 'Pl.', 'Imp.', 'Allée', 'Ch.', 'Quai', 'Cours'
    ]


    const sendData = () => {
        if (basicAddress.street_number && basicAddress.street_name && basicAddress.street_type && basicAddress.city && basicAddress.postal_code) {
            basicAddress.departement_id = Number(basicAddress.postal_code.toString().slice(0, 2));
            fetch(`${config.apiUrl}/locations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(basicAddress)
            }).then((response: any) => {
                if (response.status === 400)
                    alert('Veuillez remplir tous les champs')
                if (response.status === 403) {
                    alert('Votre token est expiré, veuillez vous reconnecter')
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }
                if (response.status === 404)
                    alert('Un champ est incorrect. Merci de vérifier vos informations')
                if (response.status === 500)
                    alert('Une erreur est survenue, veuillez réessayer plus tard')
                if (response.status === 201) {
                    response.json().then((data: any) => {
                        setLocation(basicAddress);
                        let address = String(basicAddress.postal_code) + ' ' + basicAddress.city + ', ' + String(basicAddress.street_number) + ' ';
                        if (basicAddress.street_number_suffix)
                            address += basicAddress.street_number_suffix + ' ';
                        address += basicAddress.street_type + ' ' + basicAddress.street_name;
                        setLocationString(address);
                        setId(data.id);
                        handleClose();
                    })
                }
            })
        } else {
            alert('Veuillez remplir tous les champs')
        }
    }

  return (
    <div className="LocationModal">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <IconButton
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogTitle style={{ textAlign: "center" }}>
            Sélection de l'adresse
        </DialogTitle>
            <DialogContent>
                <Box style={{ padding: 6 }}>
                    <Grid container spacing={4} style={{ marginBottom: 12 }}>
                        <Grid item xs={2} lg={2}>
                            <TextField
                                id="street_number"
                                label="Numéro"
                                fullWidth
                                variant="outlined"
                                type="number"
                                onChange={(e) => setBasicAddress({...basicAddress, street_number: parseInt(e.target.value)})}
                                inputProps={{ min: 0, step: 1 }}
                                value={basicAddress.street_number}
                            />
                        </Grid>
                        <Grid item xs={2} lg={2}>
                            <Autocomplete
                                id="street_suffix"
                                fullWidth
                                options={street_suffix}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Suffix" variant="outlined" />}
                                onChange={(e, value) => setBasicAddress({...basicAddress, street_number_suffix: value})}
                                value={basicAddress.street_number_suffix}
                            />
                        </Grid>
                        <Grid item xs={2} lg={2}>
                            <Autocomplete id="street_type"
                                fullWidth
                                options={street_type}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                onChange={(e, value) => setBasicAddress({...basicAddress, street_type: value})}
                                value={basicAddress.street_type}
                            />
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <TextField
                                id="street_name"
                                label="Nom de la rue"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setBasicAddress({...basicAddress, street_name: e.target.value})}
                                value={basicAddress.street_name}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} style={{ marginBottom: 12, alignItems: 'center', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={3} lg={3}>
                            <TextField
                                id="postal_code"
                                label="Code Postal"
                                fullWidth
                                variant="outlined"
                                type="number"
                                onChange={(e) => setBasicAddress({...basicAddress, postal_code: parseInt(e.target.value)})}
                                inputProps={{ min: 0, step: 1 }}
                                value={basicAddress.postal_code}
                            />
                        </Grid>
                        <Grid item xs={3} lg={3}>
                            <TextField
                                id="city"
                                label="Ville"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setBasicAddress({...basicAddress, city: e.target.value})}
                                value={basicAddress.city}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogContent style={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => sendData()}>
                    Valider
                </Button>
            </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationModal;