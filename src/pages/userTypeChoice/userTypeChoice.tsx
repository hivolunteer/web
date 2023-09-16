import React from "react";
import Button from '@mui/material/Button';
import "./userTypeChoice.scss";
import Box from "@mui/material/Box";
import titleLogo from "../../Images/titleLogo.png";
import { useNavigate } from "react-router-dom";

const UserTypeChoice = () => {
    const navigation = useNavigate();

    const [checked, setChecked] = React.useState(true);
    let isVolunteer: boolean = false;

    const goToPage = () => {
        let to_go: string = (isVolunteer) ? "/volunteers" : "/associations"
        to_go += (subType === "Inscription") ? "/register" : "/login";
        navigation(to_go);
    };

    const [subType, setSubType] = React.useState("Inscription");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="title">Qui êtes vous ?</h1>
            </div>
            <Box sx={{ display: "flex" }}>
                <Box className="mask-box">
                    <Box
                      className="mask"
                      style={{
                        transform: `translateX(${subType === "Inscription" ? 0 : "200px"})`
                      }}
                    />
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: subType === "Inscription" ? "#ffffff" : "#5316AE" }}
                      onClick={() => setSubType("Inscription")}
                      onChange={() => handleChange}
                    >
                      Inscription
                    </Button>
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: subType === "Connexion" ? "#ffffff" : "#5316AE" }}
                      onClick={() => setSubType("Connexion")}
                      onChange={() => handleChange}
                      value="checked"
                    >
                      Connexion
                    </Button>
                </Box>
            </Box>
            <div className="row">
                <div className="col-12">
                    <Button 
                        variant="contained" 
                        className="btn btn-lg enterprise" 
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
                        className="btn volunteer btn-lg" 
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
