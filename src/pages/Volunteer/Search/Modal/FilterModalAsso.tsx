import { Dialog, DialogTitle, Button, Checkbox, Rating } from "@mui/material";
import React, { useState } from "react";

import { ModalAsso } from "../Interfaces"; 
import config from "../../../../config";


const FilterModal = (props: {modalProps: ModalAsso}) => {

    const modalProps = props.modalProps;

    const [preferences, setPreferences] = useState<boolean[]>([false, false]);

    const [value, setValue] = React.useState<number | null>(1);

    // valider Modal

    const ValidateSearch = async () => {
        const token = localStorage.getItem("token");
        let body = {
            themeList: [],
            friendList: preferences[1],
            followList: preferences[0],
            note: value
        }
        fetch(`${config.apiUrl}/search/associations`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token, // localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log("DATA" + data)
                    console.log("friends" + preferences[1], "follows" + preferences[0], "note" + value)
                    modalProps.setFilteredAssociations(data)
                    modalProps.handleClose()
                })
            }
        })
    }

    const setValuesToDefault = () => {
        setPreferences([false, false]);
        setValue(1);
        window.location.reload();
    }

  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                maxWidth: '60%',
                minHeight: '40vh',
                maxHeight: '65vh',
                overflowY: 'hidden',
                overflowX: 'hidden',
            }
        }}
        >
            {/* Second Category : Préférences de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <div style={{width: '90%', margin: '0 2.5%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '25vh'}}>
                    <div style={{flex: 1}}>
                        <h3> PRÉFÉRENCES </h3>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-2% -1%'}}>
                                <Checkbox
                                    checked={preferences[0]}
                                    onChange={() => setPreferences([!preferences[0], preferences[1]])}
                                />
                                <p style={{flex: 1}}> Associations suivies </p>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0% -1%'}}>
                                <Checkbox
                                    checked={preferences[1]}
                                    onChange={() => setPreferences([preferences[0], !preferences[1]])}
                                />
                                <p style={{flex: 1}}> Associations suivies par vos amis </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTitle>
            {/* Third Category : Dates du début et de la fin de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <div style={{width: '90%', margin: '0 2.5%', maxHeight: '25vh'}}>
                    <h3> NOTE MINIMALE </h3>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    </div>
                </div>
            </DialogTitle>
            {/* Footer */}
            <DialogTitle sx={{ m: 0, p: 2 }} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button 
                    onClick={() => { setValuesToDefault(); modalProps.handleClose(); }}
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
                    onClick={() => {
                        ValidateSearch()
                    }}
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
        </Dialog>
    </div>
  );
};

export default FilterModal;