import {Checkbox} from "@mui/material";
import React, {useEffect, useState} from "react";

import "./Settings.scss";

interface ColorPopupProps {
    onClose: () => void,
    onSelectColor: (color: string) => void,
    onCheck: (checked: boolean) => void,
}

const ColorPopup: React.FC<ColorPopupProps> = ({onClose, onSelectColor, onCheck}) => {
    const [checked, setChecked] = useState(false);

    const switchHandler = (event: any) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        console.log("checked", checked)
        console.log("oncheck", localStorage.getItem("color_blind"))
        onCheck(checked);
    }, [checked]);

    const colorblindOptions = ["Mode daltonien"];

    return (
        <div className="color-popup">
            <div className="color-options">
                <h3>Activer le mode daltonien</h3>
                {colorblindOptions.map((mode, index) => (
                    <Checkbox
                        key={index}
                        checked={checked}
                        onClick={() => onSelectColor(mode)}
                        onChange={switchHandler}
                    />

                ))}
            </div>
            <h5>
                {" "}
                Cette option permet de rendre HiVolunteer plus lisible aux personnes
                atteintes de troubles de vision{" "}
            </h5>
            <button onClick={onClose}>Fermer</button>
        </div>
    );
};

export default ColorPopup;
