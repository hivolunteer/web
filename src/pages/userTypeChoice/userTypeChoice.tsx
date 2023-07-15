import React from "react";
import Button from '@mui/material/Button';
import "./userTypeChoice.scss";
import {Link} from "react-router-dom";
import Switch from "@mui/material/Switch";
import {Grid} from "@mui/material";
import titleLogo from "../../Images/titleLogo.png";
import { useNavigate } from "react-router-dom";

const UserTypeChoice = () => {
    const navigation = useNavigate();

    const [checked, setChecked] = React.useState(true);
    let isVolunteer: boolean = false;

    const goToPage = () => {
        let to_go: string = (checked) ? "/login" : "/register";
        to_go += (isVolunteer) ? "/volunteer" : "/association";
        navigation(to_go);
    } 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="title">Qui êtes vous ?</h1>
            </div>

            <div className="row">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Inscription</Grid>
                    <Grid item>
                        <Switch
                            checked={checked} // relevant state for your case
                            onChange={handleChange} // relevant method to handle your change
                            value="checked" // some value you need
                        />
                    </Grid>
                    <Grid item>Connexion</Grid>
                </Grid>
            </div>
            <div className="row">
                <div className="col-12">
                    <Button 
                        variant="contained" 
                        className="btn btn-lg entreprise" 
                        onClick={() => {
                            isVolunteer = true;
                            goToPage()
                        }}
                    >
                        Entreprise
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <img className="titleLogo" src={titleLogo} alt=""/>
                </div>
                <div className="col-6">
                    <Button 
                        variant="contained" 
                        className="btn association btn-lg" 
                        onClick={() => {
                            isVolunteer = false;
                            goToPage()
                        }}
                    >
                        Association
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Button 
                        variant="contained" 
                        className="btn benevole btn-lg" 
                        onClick={() => {
                            isVolunteer = true;
                            goToPage()
                        }}
                    >
                        Bénévole
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserTypeChoice;
