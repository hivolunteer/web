import {Button, Dialog, TextField} from '@mui/material';
import './ForgotPasswordModal.scss';
import { useState } from 'react';
import config from '../../../config';
const titleLogo = require('../../../images/logo/primary_logo.png');

interface ForgotModal {
    open: boolean;
    handleClose: () => void;
    route: string;
}

const ForgotPasswordModal = (props: {modalProps: ForgotModal}) => {
    const modalProps = props.modalProps;

    const [email, setEmail] = useState<string>("");

    const sendEmail = () => {
        fetch(`${config.apiUrl}/companies/reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        }).then((data) => {
            const resetLink = data.resetLink;
            const subject = 'Réinitialiser votre mot de passe';
            const body = `Bonjour,<br><br>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a><br><br>Cordialement, HiVolunteer`;
            sendEmailToUser(email, subject, body);
            modalProps.handleClose();
        }).catch((error) => {
            console.log(error);
        })
    }

    const sendEmailToUser = (to: string, subject: string, body: string) => {
    
        }

    return (
        <Dialog open={modalProps.open} onClose={modalProps.handleClose}
            fullWidth maxWidth='xl'
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                margin: 'auto  20%',
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
        >
            <div className="modal_title">
                <p>Mot de passe oublié</p>
            </div>
            <div className="modal_body">
                <p>Veuillez saisir votre adresse e-mail ci-dessous et nous vous enverrons par e-mail les instructions pour le réinitialiser.</p>
            </div>
            <div className="modal_email">
                <TextField
                    fullWidth
                    name="password"
                    required
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps=
                    {{
                        style: { 
                            color: "#2D2A32",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px"
                        }
                    }}
                />
            </div>
            <div className="modal_button">
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6,
                        mb: 3,
                        color: "#FFFEFF",
                        backgroundColor: "#67A191",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                }}
                onClick={() => sendEmail()}
                >
                    Réinitialiser le mot de passe
                </Button>
            </div>
            <div className="modal_footer">
                <p>Vous vous souvenez de votre mot de passe ? <a onClick={() => modalProps.handleClose()} style={{textDecoration: 'underline', cursor: 'pointer'}}>Se connecter</a></p>
            </div>
        </Dialog>
    )
}

export default ForgotPasswordModal;