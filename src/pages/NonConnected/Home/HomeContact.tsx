import React from "react";
import './Home.scss';
import { Box, Grid } from '@mui/material';

function HomeContact() {
    return (
        <Box className="home-contact-container">
            <Grid container spacing={2} className="home-contact">
                <Grid item xs={6} className="home-contact-grid-container">
                    <p className="home-contact-title">
                        Contact
                    </p>
                    <p className="home-contact-description">
                        Pour toute question ou demande d'information, n'hésitez pas à nous contacter par mail à l'adresse suivante :
                    </p>
                    <p className="home-contact-email">
                        hivolunter@outlook.fr
                    </p>
                </Grid>
                <Grid item xs={6} className="home-contact-grid-container">
                    <img src="/images/home/contact.svg" alt="contact" className="home-contact-image" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeContact;