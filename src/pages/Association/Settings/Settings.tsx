import React from "react";
import "./Settings.scss";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
//import { SideBar } from "../../../components/Sidebar";

function Settings() {
    const history = useNavigate();
    const handleClickProfile = () => {
        history("/settings/profile_information");
    }

    return (
        <div>
            <h1> Réglages </h1>
            <button className={"color-blind-button"} onClick={handleClickProfile}>
                Informations du profil
            </button>
            <Divider orientation="vertical" variant="middle" flexItem />
        </div>
    );
}

export default Settings;