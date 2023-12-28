import { useState } from "react";
import "./Settings.scss";
import Button from "@mui/material/Button";
import ColorPopup from "./ColorPopup";

function Settings() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleColorSelection = (color: string) => {
    setColorBlind(true);
    setSelectedColor(color);
    setColorBlind(true);
    closePopup();
  };
  const [color_blind, setColorBlind] = useState(
    localStorage.getItem("color_blind") === "true"
  );

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
      <button onClick={openPopup}>Mode daltonien</button>
      {popupVisible && (
        <>
          <ColorPopup
            onClose={closePopup}
            onSelectColor={handleColorSelection}
          />
          <Button onClick={() => setColorBlind(!color_blind)}>
            Color Blind
          </Button>
        </>
      )}
      {selectedColor && (
        <div className={`selected-color ${selectedColor.toLowerCase()}`}>
          {selectedColor} activé!
        </div>
      )}
    </div>
  );
}

export default Settings;
