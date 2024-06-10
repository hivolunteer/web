import {Button, Dialog, DialogContent, DialogTitle, List} from "@mui/material";
import HoverRating from "../../../components/rating";
import React from "react";
import config from "../../../config";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    mission: any;
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, selectedValue, open, mission} = props;
    const [rating, setRating] = React.useState(2);
    const [comment, setComment] = React.useState('');
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleInfoChange = (newValue: number) => {
        setRating(newValue);
    }
    // post rating to backend
    const postRating = () => {
        const token = localStorage.getItem('token')
        const body = {
            stars: rating,
            comment: comment
        };
        fetch(`${config.apiUrl}/missions/volunteer/rate/${mission.id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => {
                console.log(response)
                if (response.status === 201) {
                    response.json().then((data) => {
                            window.location.reload();
                        }
                    )
                }
            },
            (error) => {
                alert('Erreur lors de la notation de la mission')
                console.log(error)
            }
        );
    };
    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg"
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                    },
                }}>
            <DialogTitle style={{
                margin: "auto 7.5%",
            }}>Noter la mission</DialogTitle>
            <DialogContent style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '80%',
                margin: 'auto 10%'
            }}>
                <p>
                    Comment s'est déroulée la mission ?
                </p>
                <div style={{display: 'flex', justifyContent: "center"}}>
                    <HoverRating
                        onInfoChange={handleInfoChange} />
                </div>
                <p>
                    Avez-vous des remarques à faire ?
                </p>
                <List sx={{pt: 0}}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{
                        width: '90%',
                        height: '100px',
                        borderRadius: '0.3rem',
                        border: '1px solid #96d0df',
                        alignItems: 'center'
                    }}
                />
                </List>
            </DialogContent>
            <DialogContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '80%', margin: 'auto 10%'}}>
                <Button
                    variant="contained"
                    title={''}
                    style={{color: 'white', maxWidth: '100px'}}
                    onClick={() => {
                        handleClose()
                    }}
                >
                    Annuler
                </Button>
                <div style={{width: '10%'}}/>
                <Button
                    variant="contained"
                    title={''}
                    style={{color: 'white', maxWidth: '100px'}}
                    onClick={() => {
                        postRating()
                        handleClose()
                    }}
                >
                    Valider
                </Button>
            </DialogContent>
        </Dialog>
    );
}

