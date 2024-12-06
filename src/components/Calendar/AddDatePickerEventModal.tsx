import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent, useEffect, useState } from "react"
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
import config from "../../config"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  datePickerEventFormData: EventCreationData
  setDatePickerEventFormData: Dispatch<SetStateAction<EventCreationData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  categories: ICategory[],
  missionsList: { id: number, title: string }[]
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  categories,
  missionsList
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
      category: value?.id,
    }))
  }

  const handleMissionChange = (e: React.SyntheticEvent, value: { id: number, title: string } | null) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      id_mission: value?.id,
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
      <DialogTitle>Ajouter un événement</DialogTitle>
      <DialogContent>
        <DialogContentText> Pour ajouter un événement, repmlissez les cases s'il vous plaît.</DialogContentText>
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
                ampm={false}
                format={"dd/MM/yyyy HH:mm"}
                slotProps={{ textField: { fullWidth: true } }}
                onChange={(newValue) =>
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    start_date: new Date(newValue!),
                  }))
                }
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
              ampm={false}
              value={allDay ? null : end_date}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(newValue) =>
                setDatePickerEventFormData((prevState) => ({
                  ...prevState,
                  end_date: new Date(newValue!),
                }))
              }

            //renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            onChange={handleCategoryChange}
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.name}
            renderInput={
              (params) => (
                <TextField
                  {...params}
                  label="Catégorie"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          backgroundColor: params.inputProps.value ? categories.find(category => category.name === params.inputProps.value)?.color : 'transparent',
                          marginRight: 1,
                        }}
                      />
                    ),
                  }}
                />
              )
            }
          />
          <Autocomplete
            onChange={handleMissionChange}
            disablePortal
            id="combo-box-demo"
            options={missionsList}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Mission" />}
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