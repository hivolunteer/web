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
    onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
    categories: ICategory[]
}

const AddEventModal = ({open, handleClose, eventFormData, setEventFormData, onAddEvent, categories}: IProps) => {
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
            categoryId: value?._id,
        }))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter un évènémént</DialogTitle>
            <DialogContent>
                <DialogContentText>Pour ajouter un événement, veuillez remplir les informations
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
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Catégorie"/>}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Annuler
                </Button>
                <Button disabled={description === ""} color="success" onClick={onAddEvent}>
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEventModal