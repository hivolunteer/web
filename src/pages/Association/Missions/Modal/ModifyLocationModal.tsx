import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Button, Box, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import config from "../../../../config";
import './LocationModal.scss'

interface Address {
    name: string;
    street_number: number | null;
    street_number_suffix: string | null;
    street_name: string;
    street_type: string | null;
    city: string;
    postal_code: number | null;
    departement_id: number | null;
}

interface AddressDB {
    name: string;
    street_number: number;
    street_number_suffix: string;
    street_name: string;
    street_type: string;
    city: string;
    postal_code: number
    departement_id: number;
    id: number; 
}

interface ModifyLocationModalProps {
    open: boolean;
    handleClose: (e?: any) => void;
    location: Address;
    setLocation: (address: Address) => void;
    setLocationString: (address: string) => void;
    setId: (id: number) => void;
}

const ModifyLocationModal = ({
  open,
  handleClose,
  location,
  setLocation,
  setLocationString,
  setId,
}: ModifyLocationModalProps) => {

    const [basicAddress, setBasicAddress] = useState<Address>(location);

    const street_suffix = ['BIS', 'TER', 'QUATER']
    const street_type = ['Rue', 'Av.', 'Bd.', 'Pl.', 'Imp.', 'Allée', 'Ch.', 'Quai', 'Cours']

    useEffect(() => {
        if (location) {
            setBasicAddress(location);
        }
    }, [location]);

    const resetFields = () => {
        setBasicAddress({
            name: '',
            street_number: null,
            street_number_suffix: null,
            street_name: '',
            street_type: null,
            city: '',
            postal_code: null,
            departement_id: null
        })
    }

    const modifyData = (e: React.FormEvent) => {
        e.preventDefault();  // Prevents any default form submission behavior
        if (basicAddress.street_number && basicAddress.street_name && basicAddress.street_type && basicAddress.city && basicAddress.postal_code && basicAddress.name) {
            basicAddress.departement_id = Number(basicAddress.postal_code.toString().slice(0, 2));
            fetch(`${config.apiUrl}/locations/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(basicAddress)
            }).then((response: any) => {
                if (response.status === 400) {
                    alert('Veuillez remplir tous les champs');
                } else if (response.status === 403) {
                    alert('Votre token est expiré, veuillez vous reconnecter');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else if (response.status === 404) {
                    alert('Un champ est incorrect. Merci de vérifier vos informations');
                } else if (response.status === 500) {
                    alert('Une erreur est survenue, veuillez réessayer plus tard');
                } else if (response.status === 200) {
                    response.json().then((data: any) => {
                        setLocation(basicAddress);
                        let address = basicAddress.name + ' ' + String(basicAddress.postal_code) + ' ' + basicAddress.city + ', ' + String(basicAddress.street_number) + ' ';
                        if (basicAddress.street_number_suffix) address += basicAddress.street_number_suffix + ' ';
                        address += basicAddress.street_type + ' ' + basicAddress.street_name;
                        setLocationString(address);
                        setId(data.id);
                        handleClose();
                    });
                }
            });
        } else {
            alert('Veuillez remplir tous les champs');
        }
    };

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
                Modifier l'adresse
            </DialogTitle>
                <DialogContent>
                    <Box style={{ padding: 6 }}>
                        <Grid container spacing={4} style={{ marginBottom: 12 }}>
                        <Grid item xs={2} lg={2}>
                                <TextField
                                    id="location_name"
                                    label="Nom de l'adresse"
                                    fullWidth
                                    variant="outlined"
                                    type="string"
                                    onChange={(e) => 
                                        {
                                            setBasicAddress({...basicAddress, name: e.target.value})
                                        }
                                    }
                                    inputProps={{ min: 0, step: 1 }}
                                    value={basicAddress.name}
                                />
                            </Grid>
                            <Grid item xs={2} lg={2}>
                                <TextField
                                    id="street_number"
                                    label="Numéro"
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    onChange={(e) => {
                                        if (e.target.value !== '')
                                            setBasicAddress({...basicAddress, street_number: parseInt(e.target.value)})
                                        else
                                            setBasicAddress({...basicAddress, street_number: null})
                                    }}
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
                                    onChange={(e, value) => 
                                        {
                                            setBasicAddress({...basicAddress, street_number_suffix: value})
                                        }
                                    }
                                    value={basicAddress.street_number_suffix}
                                />
                            </Grid>
                            <Grid item xs={2} lg={2}>
                                <Autocomplete id="street_type"
                                    fullWidth
                                    options={street_type}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                    onChange={(e, value) => 
                                        {
                                            setBasicAddress({...basicAddress, street_type: value})
                                        }
                                    }
                                    value={basicAddress.street_type}
                                />
                            </Grid>
                            <Grid item xs={4} lg={4}>
                                <TextField
                                    id="street_name"
                                    label="Nom de la rue"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => 
                                        {
                                            setBasicAddress({...basicAddress, street_name: e.target.value})
                                        }
                                    }
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
                                    onChange={(e) => 
                                        {
                                            setBasicAddress({...basicAddress, postal_code: parseInt(e.target.value)})
                                        }
                                    }
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
                                    onChange={(e) => 
                                        {
                                            setBasicAddress({...basicAddress, city: e.target.value})
                                        }
                                    }
                                    value={basicAddress.city}
                                />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={resetFields} >
                            Réinitialiser
                        </Button>
                    </Box>
                </DialogContent>
                <DialogContent style={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={modifyData}>
                        Modifier
                    </Button>
                </DialogContent>
          </Dialog>
        </div>
    );
};

export default ModifyLocationModal;
