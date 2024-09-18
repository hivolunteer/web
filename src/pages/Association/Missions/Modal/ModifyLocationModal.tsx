import { TextField, Button, Grid, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../../../../config";
import { AddressDB } from "./LocationModal"; // Ensure AddressDB type is available here

const ModifyAddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLocation } = location.state; // get the selectedLocation from state

  const [modifiedLocation, setModifiedLocation] = useState<AddressDB>(selectedLocation);

  const handleSave = () => {
    console.log(modifiedLocation);
    fetch(`${config.apiUrl}/locations/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(modifiedLocation),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Adresse mise à jour avec succès");
          navigate(-1); // Go back to the previous page
        } else {
          alert("Erreur lors de la mise à jour de l'adresse");
        }
      })
      .catch((error) => {
        alert("Une erreur s'est produite, veuillez réessayer plus tard.");
      });
  };

  return (
    <div className="ModifyAddressPage">
      <h2>Modifier l'adresse</h2>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <TextField
              id="location_name"
              label="Nom de l'adresse"
              fullWidth
              variant="outlined"
              value={modifiedLocation.name}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="street_number"
              label="Numéro"
              fullWidth
              variant="outlined"
              type="number"
              value={modifiedLocation.street_number}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, street_number: parseInt(e.target.value) })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="street_suffix"
              label="Suffix"
              fullWidth
              variant="outlined"
              value={modifiedLocation.street_number_suffix}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, street_number_suffix: e.target.value })}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="street_type"
              label="Type"
              fullWidth
              variant="outlined"
              value={modifiedLocation.street_type}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, street_type: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="street_name"
              label="Nom de la rue"
              fullWidth
              variant="outlined"
              value={modifiedLocation.street_name}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, street_name: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="postal_code"
              label="Code Postal"
              fullWidth
              variant="outlined"
              type="number"
              value={modifiedLocation.postal_code}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, postal_code: parseInt(e.target.value) })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="city"
              label="Ville"
              fullWidth
              variant="outlined"
              value={modifiedLocation.city}
              onChange={(e) => setModifiedLocation({ ...modifiedLocation, city: e.target.value })}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Annuler
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ModifyAddressPage;
