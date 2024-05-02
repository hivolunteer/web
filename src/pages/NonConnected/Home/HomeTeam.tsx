import React from "react";
import { Box, Grid } from '@mui/material';
import './Home.scss';

const teamMembers: { id: number, name: string, image: string }[] = [
    { id: 1, name: "Bill On", image: "bill_on" },
    { id: 2, name: "Louis-Henri Mc Allister", image: "louishenri_mcallister" },
    { id: 3, name: "Petro Floresku", image: "petro_floresku" },
    { id: 4, name: "Pierre Tran", image: "pierre_tran" },
    { id: 5, name: "Thibault Castillon", image: "thibault_castillon" },
    { id: 6, name: "Yuliia Maiorova", image: "yuliia_maiorova" }
];

function TeamMember(props: { id: number }) {
    const teamMember: { id: number, name: string, image: string } | undefined = teamMembers.find(member => member.id === props.id);
    return (
        <Grid item xs={4} className="home-team-grid-container">
            <div className="team-member">
                <img src={`/images/home/team/${teamMember?.image}.svg`} alt="team-member" />
                <p>
                    {teamMember?.name}
                </p>
            </div>
        </Grid>
    );
}

function HomeTeam() {
    return (
    <Box className="home-team-container">
        <p className="home-team-title">
            Notre équipe
        </p>
        <Grid container spacing={2} className="home-team">
                <TeamMember id={1} />
                <TeamMember id={2} />
                <TeamMember id={3} />
                <TeamMember id={4} />
                <TeamMember id={5} />
                <TeamMember id={6} />
        </Grid>
    </Box>
    );
};

export default HomeTeam;