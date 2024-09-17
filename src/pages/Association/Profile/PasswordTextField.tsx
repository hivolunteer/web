import { TextField, InputAdornment, IconButton } from "@mui/material"
import { useState } from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function PasswordTextField({ password, setPassword, label }: { password: string, setPassword: any, label: any }) {

    const [password_eye, setPasswordEye] = useState<boolean>(false)
    const [visibility, setVisibility] = useState<boolean>(false)

    function changePassword (e: any) {
        setPassword(e.target.value)
        e.target.value ? setVisibility(true) : setVisibility(false)
    }

    return (
        <TextField
            required
            id="text-field-password"
            type={password_eye ? "text" : "password"}
            placeholder={label}
            variant="outlined"
            onChange={changePassword}
            fullWidth
            value={password}
            InputProps={visibility ? {
                endAdornment: (
                    <InputAdornment position="start">
                        {
                            password ? (
                                <IconButton onClick={() => setPasswordEye(!password_eye)}>
                                    <VisibilityOffOutlinedIcon />        
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => setPasswordEye(!password_eye)}>
                                    <VisibilityOutlinedIcon />       
                                </IconButton>
                            )
                        }
                    </InputAdornment>
                )
            } : {}}
        />
    )
}

export default PasswordTextField