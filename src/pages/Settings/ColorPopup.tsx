import {Switch, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import "./Settings.scss";

interface ColorPopupProps {
    onClose: () => void,
    onSelectColor: (color: string) => void,
    onCheck: (checked: boolean) => void,
}

const ColorPopup: React.FC<ColorPopupProps> = ({onClose, onSelectColor, onCheck}) => {
    const [checked, setChecked] = useState(true);

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
            <h3>Activer le mode daltonien</h3>
            <h5>
                {" "}
                Cette option permet de rendre HiVolunteer plus lisible aux personnes
                atteintes de troubles de vision{" "}
            </h5>
                <Typography
                    style={{fontSize: "100%"}}
                >
                </Typography>
            <div className="color-options">
                Activer
                {colorblindOptions.map((mode, index) => (
                    <Switch
                        key={index}
                        checked={checked}
                        onClick={() => onSelectColor(mode)}
                        onChange={switchHandler}
                    />
                ))}
                Désactiver
            </div>
            <button onClick={onClose}>Fermer</button>
        </div>
    );
};

export default ColorPopup;
