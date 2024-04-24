import { Dialog, DialogTitle, TextField, Button, Autocomplete, Checkbox, Chip } from "@mui/material";
import { useEffect, useState } from "react";

import config from "../../../config";

interface modalProps {
    open: boolean,
    handleClose: () => void

}
const EditPasswordModal = (props: {modalProps: modalProps}) => {

    const modalProps = props.modalProps;

    useEffect(() => {
    }, []);


  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                maxWidth: '60%',
                minHeight: '20vh',
                maxHeight: '65vh',
                overflowY: 'hidden',
                overflowX: 'hidden',
            }
        }}
        >
            {/* Second Category : Préférences de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <div style={{width: '90%', margin: '0 2.5%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '25vh'}}>
                    <TextField
                        id="outlined-basic"
                        label="Mot de passe actuel"
                        variant="outlined"
                        sx={{width: '45%', margin: '2% 2.5%'}}
                    />
                </div>
                <div style={{width: '90%', margin: '0 2.5%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '25vh'}}>
                    <TextField
                        id= "password1"
                        label="Nouveau mot de passe"
                        variant="outlined"
                        type="password"
                        sx={{width: '45%', margin: '2% 2.5%'}}
                    />
                    <TextField
                        id= "password2"
                        label="Confirmer le nouveau mot de passe"
                        variant="outlined"
                        type="password"
                        sx={{width: '45%', margin: '2% 2.5%'}}
                    />
                </div>
            </DialogTitle>
            <DialogTitle sx={{ m: 0, p: 2 }} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button 
                    variant='contained'
                    sx={{
                        background: 'rgba(45, 42, 50, 0.50)',
                        color: '#FFFEFF',
                        textTransform: 'none',
                        borderRadius: '10px',
                        padding: '1rem 3rem',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        fontWeight: 'bold',
                        "&:hover": {
                            background: 'rgba(45, 42, 50, 0.60)',
                        }
                    }}
                >
                    Annuler 
                </Button>
                <Button
                    sx={{
                        margin: '0 5%',
                        background: 'rgba(103, 161, 145)',
                        color: '#FFFEFF',
                        textTransform: 'none',
                        borderRadius: '10px',
                        padding: '1rem 3rem',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        fontWeight: 'bold',
                        "&:hover": {
                            background: 'rgba(88, 138, 124)',
                        }
                    }}
                >
                    Valider
                </Button>
            </DialogTitle>
            {/* Footer */}
        </Dialog>
    </div>
  );
};

export default EditPasswordModal;