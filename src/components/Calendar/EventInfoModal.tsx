import { SetStateAction, MouseEvent, Dispatch } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography, IconButton } from "@mui/material"
import { IEventInfo } from "./EventCalendar"
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    onModifyEvent: (event: IEventInfo) => void
    onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void
    currentEvent: IEventInfo
}

const EventInfoModal = ({ open, handleClose, onModifyEvent, onDeleteEvent, currentEvent }: IProps) => {
    const onClose = () => {
        handleClose()
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
            </Box>
            <DialogTitle>Les informations sur l'évènement</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography sx={{ fontSize: 16, marginTop: 3 }} color="text.primary" gutterBottom>
                        Titre: {currentEvent?.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
                        Description : {currentEvent?.description}
                    </Typography>
                </DialogContentText>
                <Box component="form"></Box>
            </DialogContent>
            <DialogActions>
                <Button color="info" onClick={() => onModifyEvent(currentEvent)}>
                    Modifier
                </Button>
                <Button color="error" onClick={onDeleteEvent}>
                    Supprimer l'évènement
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventInfoModal