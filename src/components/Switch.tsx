import {useEffect, useState} from 'react';

import "./Switch.scss";

import { Box, Button } from '@mui/material';

interface CustomSwitchProps {
    option1: string;
    option2: string;
    subType: string;
    setSubType: (subType: string) => void;
}

export default function CustomSwitch(props: CustomSwitchProps) {

    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return(
        <Box className="mask-box">
            <Box
                className="mask"
                style={{
                    transform: `translateX(${props.subType === props.option1 ? 0 : "200px"})`
                }}
            />
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: props.subType === props.option1 ? "#FFFFFF": "#5316AE" }}
                      onClick={() => props.setSubType(props.option1)}
                      onChange={() => handleChange}
                    >
                      {props.option1}
                    </Button>
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: props.subType === props.option2 ? "#FFFFFF": "#5316AE" }}
                      onClick={() => props.setSubType(props.option2)}
                      onChange={() => handleChange}
                      value="checked"
                    >
                      {props.option2}
                    </Button>
        </Box>
    )
}