import React from "react";
import Button from '@mui/material/Button';
import "./UserTypeChoice.scss";
import Box from "@mui/material/Box";
import titleLogo from "../../images/titleLogo.png";
import { useNavigate } from "react-router-dom";
import Switch from '../../components/Switch'

const UserTypeChoice = () => {
    const navigation = useNavigate();

    const [checked, setChecked] = React.useState(true);
    let isVolunteer: boolean = false;

    const goToPage = () => {
        let to_go: string = (isVolunteer) ? "/volunteers" : "/associations"
        to_go += (subType === "Connection") ? "/login" : "/register";
        navigation(to_go);
    };

    const [subType, setSubType] = React.useState("Connection");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="title">Qui êtes vous ?</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div style={{width: '30%'}}>
                    <Switch
                        option1="Inscription"
                        option2="Connection"
                        subType={subType}
                        setSubType={setSubType}
                    />
                </div>
            </div>
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
