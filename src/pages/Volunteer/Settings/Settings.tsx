import React, { useState } from "react";
import "./Settings.scss";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ModifyPassword";
//import { SideBar } from "../../../components/Sidebar";

function Settings() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [color_blind, setColorBlind] = useState(
    localStorage.getItem("color_blind") === "true"
  );
  const colorblindOptions = ["Mode daltonien"];
  const history = useNavigate();

  const handleClick = () => {
    history("/settings/modify_password");
  };
  const switchHandler = (event: any) => {
    setColorBlind(event.target.checked);
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  function handleClickColorBlind() {
    let className = "";
    if (!color_blind) {
      className = "body-home";
      localStorage.setItem("color_blind", "false");
    } else {
      className = "body-home-color-blind";
      localStorage.setItem("color_blind", "true");
    }
    return className;
  }

  return (
    <div className={handleClickColorBlind()}>
      <h1> Réglages </h1>
      <button className={"color-blind-button"} onClick={openPopup}>
        Mode daltonien
      </button>
      {popupVisible && (
        <div className="color-popup">
          <div className="color-options">
            <h3>Activer le mode daltonien</h3>
            {colorblindOptions.map((mode, index) => (
              <Checkbox
                key={index}
                checked={color_blind}
                onClick={() => mode}
                onChange={switchHandler}
              />
            ))}
          </div>
          <h5>
            {" "}
            Cette option permet de rendre HiVolunteer plus lisible aux personnes
            atteintes de troubles de vision{" "}
          </h5>
          <button onClick={closePopup}>Fermer</button>
        </div>
      )}
      {color_blind ? (
        <div className={`selected-color`}>Mode daltonien activé!</div>
      ) : null}
      <h2>Changer le mot de passe</h2>
      <button className={"color-blind-button"} onClick={handleClick}>
        Changer le mot de passe
      </button>
    </div>
  );
}

export default Settings;
