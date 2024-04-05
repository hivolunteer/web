import { SetStateAction, MouseEvent, Dispatch } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography } from "@mui/material"
import { IEventInfo } from "./EventCalendar"

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void
    currentEvent: IEventInfo | null
}

const EventInfoModal = ({ open, handleClose, onDeleteEvent, currentEvent }: IProps) => {
    const onClose = () => {
        handleClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Event Info</DialogTitle>
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
                <Button color="error" onClick={onClose}>
                    Annuler
                </Button>
                <Button color="warning" onClick={onClose}>
                    Modifier
                </Button>
                <Button color="info" onClick={onDeleteEvent}>
                    Delete Event
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventInfoModal