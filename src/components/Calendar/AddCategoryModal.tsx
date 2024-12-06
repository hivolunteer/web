import { useState, Dispatch, SetStateAction, useEffect } from "react"
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
import config from "../../config"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  categories: ICategory[]
  setCategories: Dispatch<SetStateAction<ICategory[]>>
  GetCategoriesFetch: () => void
}

export const AddCategoryModal = ({ open, handleClose, categories, setCategories, GetCategoriesFetch }: IProps) => {
  const [response, setResponse] = useState<{ error: boolean, message: string }>({ error: false, message: "" });
  const [name, setName] = useState<string>("")
  const [color, setColor] = useState<string>("")

  const AddCategoryFetch = async ({ name, color }: { name: string, color: string }) => {
    fetch(`${config.apiUrl}/calendar/category/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, color }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setResponse({ error: false, message: "La catégorie a été ajoutée avec succès" })
            GetCategoriesFetch()
          })
        } else {
          setResponse({ error: true, message: "Erreur lors de l'ajout de la catégorie" })
        }
      })
      .catch((error) => {
        console.warn(error)
      })
  };

  const onAddCategory = () => {
    AddCategoryFetch({ name, color })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse({ error: false, message: ''});
    }, 5000);
    return () => clearTimeout(timer);
  }, [response]);


  const onDeletecategory = (id: number) => {
    fetch(`${config.apiUrl}/calendar/category/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id_category: id }),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            GetCategoriesFetch()
          })
        } else {
          setResponse({ error: true, message: "Erreur lors de la suppression de la catégorie" })
        }
      })
      .catch((error) => {
        console.warn(error)
      })
  }

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
              setName(e.target.value)
            }}
            value={name}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <HexColorPicker color={color} onChange={setColor} />
            <Box sx={{ height: 80, width: 80, borderRadius: 1 }} className="value" style={{ backgroundColor: color }}></Box>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {categories.map((category) => (
                <ListItem
                  key={category.name}
                  secondaryAction={
                    <IconButton onClick={() => onDeletecategory(category.id)} color="error" edge="end">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{ height: 40, width: 40, borderRadius: 1, marginRight: 1 }}
                    className="value"
                    style={{ backgroundColor: category.color }}
                  ></Box>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Box>
          {response.message && (
            <Box sx={{ marginTop: 2 }}>
              <DialogContentText color={response.error ? "error" : "success"}>{response.message}</DialogContentText>
            </Box>
          )}
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ marginTop: 2 }}>
        <Button sx={{ marginRight: 2 }} variant="contained" color="error" onClick={onClose}>
          Annuler
        </Button>
        <Button
          onClick={() => onAddCategory()}
          disabled={name === "" || color === ""}
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