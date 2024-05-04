import { Dialog, DialogTitle, TextField, Button, Autocomplete, Checkbox, Chip } from "@mui/material";
import { useEffect, useState } from "react";

import { Modal, Skill } from "./Interfaces"; 
import { DatePicker} from "@mui/x-date-pickers";
import config from "../../../config";


const FilterModal = (props: {modalProps: Modal}) => {

    const modalProps = props.modalProps;

    const [preferences, setPreferences] = useState<boolean[]>([false, false]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [searchSkills, setSearchSkills] = useState<Number[]>([]);
    const [dates, setDates] = useState<Array<Date | null>>([null, null]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${config.apiUrl}/skills`, {
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

    const setValuesToDefault = () => {
        setPreferences([false, false]);
        setSearchSkills([]);
        setDates([null, null]);
    }
    

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
        fetch(`${config.apiUrl}/search/missions`, {
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

    /***** QUERY PARAMS FROM HOME PAGE *****/
    window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const friendsmission = urlParams.get("friendsmission");
        const missionsassociationfollowed = urlParams.get("missionsassociationfollowed");
        setPreferences([missionsassociationfollowed ? true : false, friendsmission ? true : false]);
    };

  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                maxWidth: '60%',
                minHeight: '45vh',
                maxHeight: '65vh',
                overflowY: 'hidden',
                overflowX: 'hidden',
            }
        }}
        >
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
                                <p style={{flex: 1}}> Missions des associations suivies </p>
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
                                style={{width: '80%'}}
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
                            //placeholder="Compétences"
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
                        <div style={{width: '4%'}} />
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
                    onClick={() => { setValuesToDefault(); modalProps.handleClose(); }}
                    variant='contained'
                    sx={{
                        background: 'rgba(45, 42, 50, 0.50)',
                        color: '#FFFEFF',
                        textTransform: 'none',
                        borderRadius: '10px',
                        padding: '1rem 3rem',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        fontWeight: 'bold',
                        "&:hover": {
                            background: 'rgba(45, 42, 50, 0.60)',
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
                        background: 'rgba(103, 161, 145)',
                        color: '#FFFEFF',
                        textTransform: 'none',
                        borderRadius: '10px',
                        padding: '1rem 3rem',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        fontWeight: 'bold',
                        "&:hover": {
                            background: 'rgba(88, 138, 124)',
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

export default FilterModal;