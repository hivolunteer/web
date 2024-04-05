import { useState, Dispatch, SetStateAction } from "react"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { HexColorPicker } from "react-colorful"
import { ICategory, generateId } from "./EventCalendar"

interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    categories: ICategory[]
    setCategories: Dispatch<SetStateAction<ICategory[]>>
}

export const AddCategoryModal = ({ open, handleClose, categories, setCategories }: IProps) => {
    const [color, setColor] = useState("#4e796e")
    const [title, setTitle] = useState("")

    const onAddCategory = () => {
        setTitle("")
        setCategories([
            ...categories,
            {
                _id: generateId(),
                color,
                title,
            },
        ])
    }

    const onDeletecategory = (_id: number) => setCategories(categories.filter((category) => category._id !== _id))

    const onClose = () => handleClose()

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter une catégorie</DialogTitle>
            <DialogContent>
                <DialogContentText>Créer des catégories à rajouter à votre calendrier.</DialogContentText>
                <Box>
                    <TextField
                        name="title"
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Titre"
                        type="text"
                        fullWidth
                        sx={{ mb: 6 }}
                        required
                        variant="outlined"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        value={title}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <HexColorPicker color={color} onChange={setColor} />
                        <Box sx={{ height: 80, width: 80, borderRadius: 1 }} className="value" style={{ backgroundColor: color }}></Box>
                    </Box>
                    <Box>
                        <List sx={{ marginTop: 3 }}>
                            {categories.map((category) => (
                                <ListItem
                                    key={category.title}
                                    secondaryAction={
                                        <IconButton onClick={() => onDeletecategory(category._id)} color="error" edge="end">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <Box
                                        sx={{ height: 40, width: 40, borderRadius: 1, marginRight: 1 }}
                                        className="value"
                                        style={{ backgroundColor: category.color }}
                                    ></Box>
                                    <ListItemText primary={category.title} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ marginTop: 2 }}>
                <Button sx={{ marginRight: 2 }} variant="contained" color="error" onClick={onClose}>
                    Annuler
                </Button>
                <Button
                    onClick={() => onAddCategory()}
                    disabled={title === "" || color === ""}
                    sx={{ marginRight: 2 }}
                    variant="contained"
                    color="success"
                >
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    )
}