import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Box } from "@mui/material";
import './UserTypeChoice.scss';
import titleLogo from "../../images/logo/primary_logo.png";

const UserTypeChoice = () => {
    const navigation = useNavigate();

    let isVolunteer: boolean = false;



    const [subType, setSubType] = React.useState("none");

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
      
    const handleButtonClick = (option: string) => {
      setSelectedOption(option);
        if (option === 'option2') {
            isVolunteer = true;
        }
    };

    const goToPage = (subType: string) => {
      let to_go = "";
      setSubType(subType);
      if (selectedOption === 'option1') {
        to_go = "/associations";
      } else if (selectedOption === 'option2') {
        to_go = "/volunteers";
      } else {
        return;
      }
      to_go += (subType === "Connexion") ? "/login" : "/register";
      navigation(to_go);
    };

    return (
        <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        height: '90%',
        backgroundColor: '#DFDFDF',
        alignItems: 'center',
        margin: '5%'
      }}
      >
        <div className="center-form">
          <form className="choice-form">
            <div className="row">
                <div className="col-12">
                    <img className="titleLogo" src={titleLogo} alt=""/>
                </div>
            </div>
            <h1 className="title">Vous êtes ?</h1>
            <div className="radio-button-group">
              <Button
                className={`radio-button ${selectedOption === 'option1' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('option1')}
                sx={{ color: "#2D2A32", marginBottom: "30px", borderRadius: "10px", backgroundColor: "#FFFEFF" }}
              >
                ASSOCIATION
              </Button>
              <Button
                className={`radio-button ${selectedOption === 'option2' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('option2')}
                sx={{ color: "#2D2A32", marginBottom: "30px", borderRadius: "10px", backgroundColor: "#FFFEFF"}}
              >
                BÉNÉVOLE
              </Button>
              <Button
                className={`radio-button ${selectedOption === 'option3' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('option3')}
                sx={{ color: "#2D2A32", marginBottom: "30px", borderRadius: "10px", backgroundColor: "#FFFEFF" }}
              >
                ENTREPRISE
              </Button>
            </div>
            <Box className="buttons-box">
            <Button
                className="choice-btn"
                variant="text"
                onClick={() => goToPage("Connexion")}
                sx={{ color: "#FFFEFF", backgroundColor: "#67A191", borderRadius: "10px" }}
              >
                Connexion
              </Button>
              <Button
                className="choice-btn"
                variant="text"
                onClick={() => goToPage("Inscription")}
                sx={{ color: "#67A191", backgroundColor: "#FFFEFF", borderRadius: "10px" }}
              >
                Inscription
              </Button>
            </Box>
          </form>
        </div>
      </div>
    );
};

export default UserTypeChoice;
