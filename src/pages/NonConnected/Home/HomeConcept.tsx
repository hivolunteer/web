import { Box, Grid } from '@mui/material';
import './Home.scss';

function HomeConcept() {
    return (
    <Box className="home-concept-container">
        <Grid container spacing={2} className="home-concept">
                <Grid item xs={6} className="home-concept-grid-container">
                    <img src="/images/home/background_dezoom.svg" alt="home-concept" className="home-concept-image1" />
                </Grid>
                <Grid item xs={6} className="home-concept-grid-container">
                    <p className="home-concept-title">
                        Donnez-vous l'occasion d'agir
                    </p>
                    <img src="/images/home/bee-moves.svg" alt="bee-moves" className="home-concept-image2" />
                    <p className="home-concept-description">
                        Mettre en relation des associations en recherche de bénévoles et des particuliers souhaitant s'engager pour des missions de façon ponctuelle, c'est notre objectif chez HiVolunteer !
                    </p>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeConcept;