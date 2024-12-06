import { SetStateAction, MouseEvent, Dispatch } from "react"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography, IconButton } from "@mui/material"
import { IEventInfo } from "./EventCalendar"
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    onModifyEvent: (event: IEventInfo) => void
    onDeleteEvent: (id_event: number) => void
    currentEvent: IEventInfo
    missionList: { id: number, title: string }[]
    categories: { id: number, name: string, color: string }[]
}

const EventInfoModal = ({ open, handleClose, onModifyEvent, onDeleteEvent, currentEvent, missionList, categories }: IProps) => {
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
            <DialogTitle>{currentEvent?.title}</DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
                    {currentEvent?.description}
                </Typography>
                <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
                    Du {currentEvent?.start ? new Date(currentEvent.start).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}&nbsp;
                    au {currentEvent?.end ? new Date(currentEvent.end).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                </Typography>
                <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
                    Catégorie : {
                        currentEvent?.category === null ? "Aucune" :
                            <>
                                <Box component="span" sx={{ width: 12, height: 12, backgroundColor: categories.find(category => category.id === currentEvent?.category)?.color, display: 'inline-block', marginRight: 1 }} />
                                {categories.find(category => category.id === currentEvent?.category)?.name}
                            </>
                    }
                </Typography>
                <Typography sx={{ fontSize: 14, marginTop: 3 }} color="text.secondary" gutterBottom>
                    Mission liée : {
                        currentEvent?.id_mission === null ? "Aucune" :
                            missionList.find(mission => mission.id === currentEvent?.id_mission)?.title
                    }
                </Typography>
                <Box component="form"></Box>
            </DialogContent>
            <DialogActions>
                <Button color="info" onClick={() => onModifyEvent(currentEvent)}>
                    Modifier
                </Button>
                <Button color="error" onClick={() => onDeleteEvent(currentEvent?.id as number)}>
                    Supprimer l'événement
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventInfoModal