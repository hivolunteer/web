import React, { useState } from "react";
import "./Settings.scss";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import config from "../../../config";
//import { SideBar } from "../../../components/Sidebar";

function Settings() {
    const history = useNavigate();

    const handleClick = () => {
        history("/settings/modify_password");
    };

    return (
        <div>
            <h1> Réglages </h1>
            <button className={"color-blind-button"} onClick={handleClick}>
                Changer le mot de passe
            </button>
            <div className="profile-btn-div">
      </div>
            <Divider orientation="vertical" variant="middle" flexItem />
        </div>
    );
}

export default Settings;