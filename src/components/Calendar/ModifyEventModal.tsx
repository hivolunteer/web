import {ChangeEvent, Dispatch, MouseEvent, SetStateAction} from "react"
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material"
import {EventFormData, ICategory} from "./EventCalendar"

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onEditEvent: (e: MouseEvent<HTMLButtonElement>, event: EventFormData) => void
   // event: EventFormData | null
    categories: ICategory[]
}

const ModifyEventModal = ({open, handleClose, eventFormData, setEventFormData, onEditEvent, categories}: IProps) => {
    const {title, description} = eventFormData

    const onClose = () => handleClose()

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEventFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const handleCategoryChange = (e: React.SyntheticEvent, value: ICategory | null) => {
        setEventFormData((prevState) => ({
            ...prevState,
            categoryId: value?.id,
        }))
    }

    const handleEditEvent = (e: MouseEvent<HTMLButtonElement>) => {
        onEditEvent(e, eventFormData)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Modifier un événement</DialogTitle>
            <DialogContent>
                <DialogContentText>Pour modifier un événement, veuillez mettre à jour les informations
                    ci-dessous.</DialogContentText>
                <Box component="form">
                    <TextField
                        name="title"
                        value={title}
                        margin="dense"
                        id="title"
                        label="Titre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                    />
                    <TextField
                        name="description"
                        value={description}
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={onChange}
                    />

                    <Autocomplete
                        onChange={handleCategoryChange}
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        sx={{marginTop: 4}}
                        value={categories.find(c => c.id === eventFormData.categoryId)}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Catégorie"/>}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Annuler
                </Button>
                <Button disabled={description === ""} color="success" onClick={handleEditEvent}>
                    Modifier
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModifyEventModal
