import { Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Button, Box, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import config from "../../../../config";
import { Referent } from "../Interface/Referent";
import ReferentCard from "../Card/ReferentCard";

interface ReferentModalProps {
    open: boolean;
    handleClose: () => void;
    referentListSelected: Referent[];
    setReferentListSelected: (referentListSelected: Referent[]) => void;
}

function ReferentModal(props: ReferentModalProps) {
    
    let {handleClose, open, referentListSelected, setReferentListSelected} = props;
    const [referentList, setReferentList] = useState<Referent[]>([]);

    const [referentFind, setReferentFind] = useState<string>("");

    function selectReferent(referent: Referent) {
        if (referentListSelected.includes(referent)) {
            return;
        } else {
            setReferentListSelected([...referentListSelected, referent])
        }
    }

    function removeReferent(referent: Referent) {
        setReferentListSelected(referentListSelected.filter((referent_element) => referent_element !== referent))
    }

    useEffect(() => {
        fetch(`${config.apiUrl}/referent/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => response.json())
        .then(data => {
            let referents : Array<Referent> = []
            data.forEach((data_element: any) => {
                console.log(data_element)
                referents.push({
                    id: data_element.id,
                    complete_name: data_element.first_name + " " + data_element.last_name,
                    email: data_element.email,
                    profile_picture: data_element.profile_picture
                })
            })
            setReferentList(referents)
        })
    }, []);


    return (
        <div className="LocationModal">
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <DialogTitle>
                <IconButton
                    aria-label="close"
                    style={{ position: "absolute", right: 8, top: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
                <DialogTitle style={{ textAlign: "center" }}>
                    Sélection du ou des référents de la mission
                </DialogTitle>
                <DialogContent style={{padding: '20px'}}>
                    <TextField
                        label="Rechercher un référent"
                        variant="outlined"
                        fullWidth
                        value={referentFind}
                        onChange={(event) => setReferentFind(event.target.value)}
                />
                </DialogContent>
                <DialogContent style={{padding: '20px'}}>
                    {
                        referentList.map((referent: Referent) => {
                            if(referent.complete_name.toLowerCase().includes(referentFind.toLowerCase())) {
                                return (
                                    <ReferentCard
                                        referent={referent}
                                        selectReferent={selectReferent}
                                        removeReferent={removeReferent}
                                        selected={referentListSelected.includes(referent)}
                                    />
                                )
                            }
                        })
                    }
                </DialogContent>
                <DialogContent style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                    >
                        Valider
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ReferentModal;