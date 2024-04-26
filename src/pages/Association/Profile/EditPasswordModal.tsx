import { Error } from "@mui/icons-material";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";

interface Modal {
    open: boolean,
    onClose: () => void
}

const EditPasswordModal = (props: {modalProps: Modal}) => {

    const modalProps = props.modalProps

    const [old_password, setOldPassword] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_password, setConfirmPassword] = useState<string>("");

    const [old_password_error, setOldPasswordError] = useState<boolean>(false);
    const [new_password_error, setNewPasswordError] = useState<boolean>(false);
    const [confirm_password_error, setConfirmPasswordError] = useState<boolean>(false);

    return (
        <Dialog 
            open={modalProps.open} 
            onClose={modalProps.onClose}
            fullWidth 
        >
            <DialogTitle style={{alignSelf: 'center'}}>Changer votre mot de passe</DialogTitle>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', margin: '20px 50px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <TextField
                        label="Ancien mot de passe"
                        type="password"
                        value={old_password}
                        onChange={(e) => setOldPassword(e.target.value)}
                        error={old_password_error}
                        helperText={old_password_error ? "Veuillez entrer votre ancien mot de passe" : ""}
                    />
                    {
                        old_password_error ? <Error> Votre ancien mot de passe est invalide </Error> : null
                    }
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        value={new_password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={new_password_error}
                        helperText={new_password_error ? "Veuillez entrer un nouveau mot de passe" : ""}
                    />
                    {
                        new_password_error ? <Error> Mot de passe invalide </Error> : null
                    }
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <TextField
                        label="Confirmer le mot de passe"
                        type="password"
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={confirm_password_error}
                        helperText={confirm_password_error ? "Veuillez confirmer votre mot de passe" : ""}
                    />
                    {
                        confirm_password_error ? <Error> Les mots de passe ne sont pas identiques </Error> : null
                    }
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 50px'}}>
                <Button onClick={modalProps.onClose} variant="contained" color="secondary">Annuler</Button>
                <Button onClick={() => console.log("Change password")} variant="contained">Valider</Button>
            </div>
        </Dialog>
    )
}

export default EditPasswordModal