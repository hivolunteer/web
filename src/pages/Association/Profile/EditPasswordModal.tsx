import { Error } from "@mui/icons-material";
import { Dialog, DialogTitle, Button, Alert } from "@mui/material";
import { useState } from "react";
import PasswordTextField from "./PasswordTextField";
import config from "../../../config";
import checkStrengthPassword from "../../../functions/checkStrengthPassword";

interface Modal {
    open: boolean,
    onClose: () => void
}

const EditPasswordModal = (props: {modalProps: Modal}) => {

    const modalProps = props.modalProps

    const [old_password, setOldPassword] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_password, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    async function submitNewPasssword() {
        try {
            if (new_password !== confirm_password) {
                setError("Les mots de passe ne correspondent pas")
                return
            }

            if (checkStrengthPassword(new_password) === false) {
                setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial")
                return
            }

            let body = {
                new_password: new_password,
            }

            fetch(`${config.apiUrl}/associations/update_password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.status === 200) {
                    <Alert severity="success">Mot de passe modifié avec succès</Alert>
                    // timeout
                    const timeoutId = setTimeout(() => {
                        modalProps.onClose()
                        clearTimeout(timeoutId)
                    }, 2000)
                } else {
                    response.json().then(data => {
                        if (data === "Password must be different from the previous one")
                            setError('Le nouveau mot de passe doit être différent de l\'ancien')
                        else
                            setError("Erreur lors de la modification du mot de passe")
                    })
                }
            })
            .catch(err => {
                console.log(err)
                setError("Erreur lors de la modification du mot de passe")
            })
        } catch (error) {
            console.log(error)
            setError("Erreur lors de la modification du mot de passe")
        }
    }

    return (
        <Dialog 
            open={modalProps.open} 
            onClose={modalProps.onClose}
            fullWidth 
        >
            <DialogTitle style={{alignSelf: 'center', fontWeight: 'bold', fontSize: '1.5em'}}>Changer votre mot de passe</DialogTitle>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', margin: '20px 50px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <PasswordTextField password={old_password} setPassword={setOldPassword} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <PasswordTextField password={new_password} setPassword={setNewPassword} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <PasswordTextField password={confirm_password} setPassword={setConfirmPassword} />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 50px'}}>
                {
                    error ? (
                        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', color: 'red'}}>
                            <Error />
                            <p>{error}</p>
                        </div>
                    ) : null
                }
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 50px'}}>
                <Button onClick={modalProps.onClose} variant="contained" color="secondary">Annuler</Button>
                <Button onClick={submitNewPasssword} variant="contained">Valider</Button>
            </div>
        </Dialog>
    )
}

export default EditPasswordModal