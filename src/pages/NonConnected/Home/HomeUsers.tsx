import React from "react";
import "./Home.scss";
import { Box, Grid } from "@mui/material";

function HomeUsers() {
  return (
    <Box className="home-user-container">
        <Grid container spacing={2} className="home-user">
            <Grid item xs={6} className="home-user-grid-container">
                <p className="home-user-subtitle">
                    Vous êtes un particulier ?
                </p>
                <div className="home-user-list">
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/volunteer-1.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Fais de nouvelles rencontres
                        </p>
                    </div>
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/volunteer-2.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Participe à la vie associative de ton quartier
                        </p>
                    </div>
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/volunteer-3.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Engage-toi dans des missions qui te tiennent à coeur
                        </p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} className="home-user-grid-container">
                <p className="home-user-subtitle">
                    Vous êtes une association ?
                </p>
                <div className="home-user-list">
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/association-1.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Faites-vous connaître plus facilement
                        </p>
                    </div>
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/association-2.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Gérez tous vos évènements au même endroit
                        </p>
                    </div>
                    <div className="home-user-list-item">
                        <img src="/images/home/icon/association-3.svg" alt="user" />
                        <p className="home-user-list-item-text">
                            Proposé plus de missions grâce à notre plateforme
                        </p>
                    </div>
                </div>
            </Grid>
        </Grid>
        <div className="home-user-divider">
            <img src="/images/home/hive-cropped.svg" alt="home-user"/>
        </div>
    </Box>
  );
}

export default HomeUsers;