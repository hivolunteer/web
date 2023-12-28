import React, { useState } from "react";
import "./Settings.scss";
import { Button } from "react-bootstrap";

interface ColorPopupProps {
  onClose: () => void;
  onSelectColor: (color: string) => void;
}

const ColorPopup: React.FC<ColorPopupProps> = ({ onClose, onSelectColor }) => {
  const colorOptions = ["Mode daltonien"];

  return (
    <div className="color-popup">
      <h3>Activer le mode daltonien</h3>
      <h5>
        {" "}
        Cette option permet de rendre HiVolunteer plus lisible aux personnes
        atteintes de troubles de vision{" "}
      </h5>
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <Button
            key={index}
            className={`color-option ${color.toLowerCase()}`}
            onClick={() => onSelectColor(color)}
          >
            {color}
          </Button>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ColorPopup;
