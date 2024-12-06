import { Box, Button, Dialog, DialogContent, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import config from "../../../config";

function CreateTeamModal({open, close}: {open: boolean, close: () => void}) {
    const [teamName, setTeamName] = useState<string>("")
    const [description, setDescription] = useState<string>("")


    const createTeam = async () => {
        if (teamName === "" || description == "") {
            alert("Veuillez remplir tous les champs.")
            return
        }
        const response = await fetch(`${config.apiUrl}/teams/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                name: teamName,
                description: description,
                affiliation_token: "null",
                team_members_id: []
            })
        })
        if (response.status === 201) {
            alert(`L'équipe ${teamName} a été créé`)
            close();
            window.location.reload();
        }
    }

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="lg" sx={{ width: '80%', height: '80%', margin: 'auto', minHeight: '50%'}}>
            <DialogContent>
                <Typography variant="h6">
                    Créer une Equipe
                </Typography>
            </DialogContent>
            <Box sx={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
                <TextField
                    id="teamName"
                    label="Nom de l'équipe"
                    variant="outlined"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    sx={{margin: '10px'}}
                />
                <TextField
                    id="description"
                    label="Description de l'équipe"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{margin: '10px'}}
                />
            </Box>
            <Box style={{justifyContent: 'center', margin: '10px', display: 'flex'}}>
                <Button
                    variant="contained"
                    onClick={createTeam}
                    className="generate-token-button"
                >
                    Créer une Equipe
                </Button>
            </Box>
            <Box
                sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
                }}
            >
                <Typography variant="body2" color="primary" sx={{ marginRight: '4px', fontWeight: 'bold' }}>
                </Typography>
                <IconButton onClick={close}>
                    <MdClose style={{ color: 'red', width: '20px', height: '20px'}} />
                </IconButton>
            </Box>
        </Dialog>
    )
}

export default CreateTeamModal;