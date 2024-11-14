import { Dialog, Button, Checkbox, Rating } from "@mui/material";
import React, { useState } from "react";

import { ModalAsso } from "../Interfaces"; 
import config from "../../../../config";


const FilterModal = (props: {modalProps: ModalAsso}) => {

    const modalProps = props.modalProps;

    const [preferences, setPreferences] = useState<boolean[]>([false, false]);

    const [value, setValue] = React.useState<number | null>(null);

    // valider Modal

    function isDefaultValue() : boolean {
        if (preferences[0] || preferences[1])
            return false
        if (value !== null)
            return false
        return true;
    }

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
            if (response.status === 200) {
                response.json().then((data) => {
                    modalProps.setFilteredAssociations(data)
                    modalProps.setSearchAssociation(!isDefaultValue())
                    modalProps.handleClose()
                })
            }
        })
    }

    const setValuesToDefault = () => {
        setPreferences([false, false]);
        modalProps.setSearchAssociation(false)
        setValue(1);
    }

  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                overflowY: 'hidden',
                overflowX: 'hidden',
                height: 'auto',
                width: (modalProps.width > 768) ? '40%' : '70%',
            }
        }}
        >
            {/* Second Category : Préférences de la mission */}
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%'}}>
                    <div style={{flex: 1, marginLeft: "3%"}}>
                        <h3> Préférences </h3>
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
            </div>
            {/* Third Category : Dates du début et de la fin de la mission */}
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginLeft: "3%"}}>
                <div style={{flex: 1}}>
                    <h3 > Note Minimale </h3>
                </div>

                    <div style={{display: 'flex', alignItems: 'center', flex: 2}}>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className='modal-bottom'>
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
            </div>
        </Dialog>
    </div>
  );
};

export default FilterModal;