import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent } from "react"
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
  Checkbox,
  Typography,
} from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { EventCreationData, ICategory } from "./EventCalendar"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  datePickerEventFormData: EventCreationData
  setDatePickerEventFormData: Dispatch<SetStateAction<EventCreationData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  categories: ICategory[]
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  categories,
}: IProps) => {
  const { title, description, start_date, end_date, allDay } = datePickerEventFormData

  const onClose = () => {
    handleClose()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }))
  }

  const handleCategoryChange = (e: React.SyntheticEvent, value: ICategory | null) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      categoryId: value?._id,
    }))
  }

  const isDisabled = () => {
    const checkend = () => {
      if (!allDay && end_date === null) {
        return true
      }
    }
    return description === "" || start_date === null || checkend();

  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un évènement</DialogTitle>
      <DialogContent>
        <DialogContentText> Pour ajouter un évènement, repmlissez les cases s'il vous plaît.</DialogContentText>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Date de début"
                value={start_date}
                format={"dd/MM/yyyy HH:mm"}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    start_date: new Date(newValue!),
                  }))
                }
                slotProps={{ textField: { variant: 'outlined' } }}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text" component={"span"}>
                Toute la journée
              </Typography>
              <Checkbox onChange={handleCheckboxChange} value={allDay} />
            </Box>

            <DateTimePicker
              label="Date de fin"
              disabled={allDay}
              format={"dd/MM/yyyy HH:mm"}
              minDate={start_date}
              minutesStep={30}
              ampm={true}
              value={allDay ? null : end_date}
              onChange={(newValue) =>
                setDatePickerEventFormData((prevState) => ({
                  ...prevState,
                  end_date: new Date(newValue!),
                }))
              }
              slotProps={{ textField: { variant: 'outlined' } }}

            //renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            onChange={handleCategoryChange}
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Catégorie" />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Annuler
        </Button>
        <Button disabled={isDisabled()} color="success" onClick={onAddEvent}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDatePickerEventModal