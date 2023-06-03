import {Box, Button, Grid, Link, TextField} from "@mui/material";
import React from "react";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/de';
import {DateTimePicker} from "@mui/x-date-pickers";
import moment from "moment";
import logo from '../../Images/logo192.png';

export default function MissionCreation() {
    return (
        <div>
            <div style={{display: 'flex',  justifyContent:'center', alignContent:'center', height: '10vh'}}>
                <h1>Créer une mission</h1>
                    <p>Remplissez le formulaire ci-dessous pour créer une mission</p>
                </div>
            <Box component='form'>
                <Grid container
                      spacing={2}
                      direction="column"
                      //justifyContent="center"
                      alignContent="center"
                >
                    <Grid item xs={12} lg={4}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            label='Nom de la mission'
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            label='Description de la mission'
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            label='Adresse de la mission'
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
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            label='Durée de la mission'
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <TextField
                            autoComplete='name'
                            name='name'
                            required
                            fullWidth
                            id='name'
                            label='Nombre de bénévoles'
                        />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}