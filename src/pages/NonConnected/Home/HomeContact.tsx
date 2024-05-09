import React from "react";
import './Home.scss';
import { Box, Grid } from '@mui/material';

function HomeContact() {
    return (
        <Box className="home-contact-container">
            <Grid container spacing={2} className="home-contact">
                <Grid item xs={6} className="home-contact-grid-container">
                    <h2 className="home-contact-header">Contact</h2>
                    <div className="home-contact-list-item">
                        <img src="/images/home/icon/contact-mail.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            <a href="mailto:hivolunteer@outlook.fr">
                                hivolunteer@outlook.fr
                            </a>
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeContact;