import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent, useEffect } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Autocomplete, Box, Checkbox, Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { EventCreationData, ICategory, IEventInfo } from "./EventCalendar";
import CloseIcon from '@mui/icons-material/Close';
import moment from "moment";

interface IProps {
    open: boolean;
    handleClose: Dispatch<SetStateAction<void>>;
    datePickerEventFormData: EventCreationData;
    setDatePickerEventFormData: Dispatch<SetStateAction<EventCreationData>>;
    onEditEvent: (e: MouseEvent<HTMLButtonElement>) => void;
    currentEvent: IEventInfo | null;
    categories: ICategory[];
    missionsList: { id: number, title: string }[];
}

const ModifyDatePickerEventModal = ({ open, handleClose, datePickerEventFormData, setDatePickerEventFormData, onEditEvent, currentEvent, categories, missionsList
}: IProps) => {
    useEffect(() => {
        if (currentEvent) {
            setDatePickerEventFormData({
                title: currentEvent.title,
                description: currentEvent.description,
                start_date: currentEvent.start,
                end_date: currentEvent.end,
                allDay: currentEvent.allDay || false, // Add default value for allDay property
                category: currentEvent.category,
                id_mission: currentEvent.id_mission,
            });
        }
    }, [currentEvent, setDatePickerEventFormData]);

    const { title, description, start_date, end_date, allDay, category } = datePickerEventFormData;

    const onClose = () => {
        handleClose();
    };


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(e.target);
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(name, value);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            allDay: event.target.checked,
        }));
    };

    const handleCategoryChange = (e: React.SyntheticEvent, value: ICategory | null) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            category: value?.id,
        }));
    };

    const handleMissionChange: (e: React.SyntheticEvent, value: { id: number, title: string } | null) => void = (e, value) => {
        setDatePickerEventFormData((prevState) => ({
            ...prevState,
            id_mission: value?.id,
        }));
    };

    const isDisabled = () => {
        const checkend = () => {
            if (!allDay && end_date === null) {
                return true;
            }
            if (title === currentEvent?.title && description === currentEvent?.description && start_date === currentEvent?.start && end_date === currentEvent?.end && category === currentEvent?.category) {
                return true;
            }
        };
        return description === "" || start_date === null || checkend();
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogTitle>Modifier un événement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour modifier un événement, remplissez les cases s'il vous plaît.
          </DialogContentText>
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
                  onChange={(newValue) =>
                    setDatePickerEventFormData((prevState) => ({
                      ...prevState,
                      start_date: new Date(newValue!),
                    }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>

              <Box>
                <Typography variant="caption" color="text" component={"span"}>
                  Toute la journée
                </Typography>
                <Checkbox onChange={handleCheckboxChange} checked={allDay} />
              </Box>

              <DateTimePicker
                label="Date de fin"
                disabled={allDay}
                format={"dd/MM/yyyy HH:mm"}
                minDate={start_date}
                ampm={false}
                value={allDay ? null : end_date}
                onChange={(newValue) =>
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    end_date: new Date(newValue!),
                  }))
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
            <Autocomplete
              onChange={handleCategoryChange}
              disablePortal
              id="combo-box-demo"
              options={categories}
              sx={{ marginTop: 4 }}
              value={categories.find((cat) => cat.id === category)}
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
              value={missionsList.find((mission) => mission.id === currentEvent?.id_mission)}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Mission" />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Annuler
          </Button>
          <Button color="success" onClick={onEditEvent}>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default ModifyDatePickerEventModal;
