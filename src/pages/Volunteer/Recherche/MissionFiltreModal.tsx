import { Dialog, DialogTitle, TextField, Button, Autocomplete, Checkbox, Chip, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { Modal, Mission, Skill } from "./Interface"; 
import { DatePicker} from "@mui/x-date-pickers";


const FiltreModal = (props: {modalProps: Modal}) => {

    const modalProps = props.modalProps;

    const [preferences, setPreferences] = useState<boolean[]>([false, false]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [searchSkills, setSearchSkills] = useState<Number[]>([]);
    const [dates, setDates] = useState<Array<Date | null>>([null, null]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8000/skills", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // localStorage.getItem("token")
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setSkills(data);
            });
          }
        })
    }, []);
    

    // valider Modal

    const ValidateSearch = async () => {
        const token = localStorage.getItem("token");
        let body = {
            friendList: preferences[1],
            themeList: [],
            associationList: preferences[0],
            skillsList: searchSkills,
            dateList: dates
        }
        fetch('http://localhost:8000/search/missions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token, // localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.json().then((data) => {
                    modalProps.setFilteredMissions(data)
                    modalProps.handleClose()
                })
            }
        })
    }

  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                maxWidth: '100%',
                minHeight: '80%',
                maxHeight: '100%',
                overflowY: 'hidden',
                overflowX: 'hidden',
            }
        }}
        >
            {/* First Category : Domaine de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '25vh'}}>
                <div style={{width: '90%', margin: '0 2.5%'}}>
                    <h3>DOMAINE DE LA MISSION</h3>
                </div>
            </DialogTitle>
            {/* Second Category : Préférences de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <div style={{width: '90%', margin: '0 2.5%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '25vh'}}>
                    <div style={{flex: 1}}>
                        <h3> PRÉFÉRENCES </h3>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-2% -2%'}}>
                                <Checkbox
                                    checked={preferences[0]}
                                    onChange={() => setPreferences([!preferences[0], preferences[1]])}
                                />
                                <p style={{flex: 1}}> Associations Suivies </p>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-2% -2%'}}>
                                <Checkbox
                                    checked={preferences[1]}
                                    onChange={() => setPreferences([preferences[0], !preferences[1]])}
                                />
                                <p style={{flex: 1}}> Amis présents dans la mission </p>
                            </div>
                        </div>
                    </div>
                    <div style={{flex: 1}}>
                        <h3> COMPÉTENCES </h3>
                        <Autocomplete
                            multiple
                            id="skills"
                            options={skills}
                            getOptionLabel={(option) => option.skill_name}
                            filterSelectedOptions
                            value={skills.filter((skill) => searchSkills.includes(skill.id))}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compétences"
                                placeholder="Compétences"
                            />
                            )}
                            renderTags={(value, getTagProps) =>
                            value
                            .map((option, index) => (
                                <Chip
                                variant="outlined"
                                label={option.skill_name}
                                {...getTagProps({ index })}
                                style={{ backgroundColor: option.color_hex, border: "none" }}
                                />
                            ))
                            }
                            // when skill is added
                            onChange={(event, value) => {
                                setSearchSkills(value.map((skill) => skill.id));
                            }}
                            placeholder="Compétences"
                        />
                    </div>
                </div>
            </DialogTitle>
            {/* Third Category : Dates du début et de la fin de la mission */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <div style={{width: '90%', margin: '0 2.5%', maxHeight: '25vh'}}>
                    <h3> DATES DU DÉBUT ET DE LA FIN DE LA MISSION </h3>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <DatePicker
                            label="Début"
                            onChange={(newDate) => setDates([newDate, dates[1]])}
                            views={['year', 'month', 'day']}
                            defaultValue={null}
                        />
                        <div style={{width: '2%'}} />
                        <p> - </p>
                        <div style={{width: '2%'}} />
                        <DatePicker
                            label="Fin"
                            onChange={(newDate) => setDates([dates[0], newDate])}
                            views={['year', 'month', 'day']}
                            value={dates[1]}
                            defaultValue={null}
                        />
                    </div>
                </div>
            </DialogTitle>
            {/* Footer */}
            <DialogTitle sx={{ m: 0, p: 2 }} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button 
                    onClick={modalProps.handleClose}
                    variant='contained'
                    sx={{
                        backgroundColor: '#2D2A32',
                        color: '#FFF',
                        opacity: 0.5,
                        textTransform: 'none',
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: '#2D2A32',
                            color: '#FFF',
                        }
                    }}
                >
                    Annuler 
                </Button>
                <Button
                    onClick={() => {
                        ValidateSearch()
                    }}
                    sx={{
                        margin: '0 5%',
                        backgroundColor: '#67A191',
                        color: '#FFF',
                        textTransform: 'none',
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: '#67A191',
                            color: '#FFF',
                        }
                    }}
                >
                    Valider
                </Button>
            </DialogTitle>
        </Dialog>
    </div>
  );
};

export default FiltreModal;