import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Button, Box, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import config from "../../../../config";
import './LocationModal.scss'

interface Address {
    street_number: number | null;
    street_number_suffix: string | null;
    street_name: string;
    street_type: string | null;
    city: string;
    postal_code: number | null
    departement_id : number | null;
}

interface AddressDB {
    street_number: number;
    street_number_suffix: string;
    street_name: string;
    street_type: string;
    city: string;
    postal_code: number
    departement_id : number;
    id: number; 
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

    const [localisations, setLocationList] = useState<AddressDB[]>([]);

    const [shownLocation, setShownLocation] = useState<AddressDB[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/locations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: any) => {
            if (response.status === 403) {
                alert('Votre token est expiré, veuillez vous reconnecter')
                localStorage.removeItem('token');
                window.location.href = '/';
            }
            if (response.status === 200) {
                response.json().then((data: any) => {
                    setLocationList(data);
                })
            }

        })
    }, [])


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


    const parseInfo = (): AddressDB[] => {

        console.log(basicAddress);
        const filterAddresses = (property: keyof Address, basicProperty: string | number | null, infos: Address[]): Address[] => {
            if (basicProperty !== '' && basicProperty !== null && basicProperty !== undefined) {
                return infos.filter((location: Address) => String(location[property]).includes(String(basicProperty)));
            }
            return infos;
        };
    
        let infos: Address[] = localisations;
    
        infos = filterAddresses('street_number', basicAddress.street_number, infos);
        let suffix_infos: Address[] = filterAddresses('street_number_suffix', basicAddress.street_number_suffix, infos);
        let type_infos: Address[] = filterAddresses('street_type', basicAddress.street_type, infos);
        let name_infos: Address[] = filterAddresses('street_name', basicAddress.street_name, infos);
        let city_infos: Address[] = filterAddresses('city', basicAddress.city, infos);
    
        if (suffix_infos.length !== 0) infos = suffix_infos;
        if (type_infos.length !== 0) infos = type_infos;
        if (name_infos.length !== 0) infos = name_infos;
        if (city_infos.length !== 0) infos = city_infos;

        let postal_infos: Address[];

        if (basicAddress.postal_code !== null) {
            postal_infos = infos.filter((location: Address) => String(location.postal_code).includes(String(basicAddress.postal_code)));
            if (postal_infos.length !== 0) infos = postal_infos;
        }

        let localisation_infos: AddressDB[] = [];

        infos.forEach((location: Address) => {
            localisations.forEach((localisation: AddressDB) => {
                if (location.street_number === localisation.street_number && location.street_number_suffix === localisation.street_number_suffix && location.street_type === localisation.street_type && location.street_name === localisation.street_name && location.city === localisation.city && location.postal_code === localisation.postal_code) {
                    localisation_infos.push(localisation);
                }
            })
        })

        return localisation_infos;
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
                                onChange={(e) => {
                                    if (e.target.value !== '')
                                        setBasicAddress({...basicAddress, street_number: parseInt(e.target.value)})
                                    else
                                        setBasicAddress({...basicAddress, street_number: null})
                                }}
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
                        <Grid item xs={6} lg={6}>
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
                </Box>
            </DialogContent>
            <DialogTitle style={{ textAlign: "center" }}>
                Ou sélectionnez une adresse existante
            </DialogTitle>
            <DialogContent>
                 {
                    (parseInfo().length > 0) ? (
                        parseInfo().slice(0, 3).map((location: AddressDB) => (
                            <div className='location-shown' onClick={() => {
                                setBasicAddress(location);
                                setId(location.id);
                                let address = String(location.postal_code) + ' ' + location.city + ', ' + String(location.street_number) + ' ';
                                if (location.street_number_suffix)
                                    address += location.street_number_suffix + ' ';
                                address += location.street_type + ' ' + location.street_name;                               handleClose();
                                setLocationString(address);
                                setLocation(location);
                                handleClose();
                            }}>
                                <p>{location.street_number} {location.street_number_suffix} {location.street_type} {location.street_name}, {location.postal_code} {location.city}</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucune adresse ne correspond à votre recherche</p>
                    )
                }
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