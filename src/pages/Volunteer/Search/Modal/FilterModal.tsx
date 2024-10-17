import { Dialog, DialogTitle, TextField, Button, Autocomplete, Checkbox, Chip } from "@mui/material";
import { useEffect, useState } from "react";

import { Modal, Skill } from "../Interfaces"; 
import { DatePicker, TimePicker} from "@mui/x-date-pickers";
import config from "../../../../config";
import React from "react";
import useWindowSize from "../../../../functions/useWindowSize";


const FilterModal = (props: {modalProps: Modal}) => {

    const modalProps = props.modalProps;

    const [preferences, setPreferences] = useState<boolean[]>([false, false]);
    const [noskills, setNoskills] = useState<boolean>(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [searchSkills, setSearchSkills] = useState<Number[]>([]);
    const [dates, setDates] = useState<Array<Date | null>>([null, null]);
    const [allowMinors, setAllowMinors] = useState<boolean>(false)
    const [duration, setDuration] = useState<Date | null>(null)


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
        setNoskills(false);
        setAllowMinors(false);
    }
    

    // valider Modal

    function transformDurationMinutes(duration: Date) : number {
        let date = new Date(duration);
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    }

    function checkDefaultValue() {
        if (preferences[0] !== false || preferences[1] !== false)
            return false;
        if (searchSkills.length !== 0)
            return false;
        if (dates[0] !== null || dates[1] !== null)
            return false;
        if (noskills)
            return false;
        if (allowMinors)
            return false
        if (duration !== null)
            return false;
        return true
    }

    const ValidateSearch = async (search: boolean) => {
        const token = localStorage.getItem("token");
        let minutes = (duration === null) ? null : transformDurationMinutes(duration as Date); 
        let body = {
            friendList: preferences[1],
            themeList: [],
            associationList: preferences[0],
            skillsList: searchSkills,
            noskills: noskills,
            dateList: dates,
            allow_minors: allowMinors,
            duration: minutes
        }
        if (checkDefaultValue())
            search = false
        fetch(`${config.apiUrl}/search/missions`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token, // localStorage.getItem("token")
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    modalProps.setFilteredMissions(data)
                    modalProps.setSearchMission(search)
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
        const query = urlParams.get("query");
        if (query) {
            modalProps.setSearch(query);
        }
        setValuesToDefault();
        setPreferences([missionsassociationfollowed ? true : false, friendsmission ? true : false]);
        ValidateSearch(true);
    };

  return (
    <div className="FilterModal">
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='lg'
        PaperProps={{
            sx: {
                overflowY: 'hidden',
                overflowX: 'hidden',
                height: 'auto',
                width: (modalProps.width > 768) ? '50%' : '100%',
            }
        }}
        >
            <div style={{margin: "10px"}}>
                {/* Second Category : Préférences de la mission */}
                <div style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: "100%"}}>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                            <h3 style={{marginLeft:"3%"}}> Préférences </h3>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Checkbox
                                        checked={preferences[0]}
                                        onChange={() => setPreferences([!preferences[0], preferences[1]])}
                                    />
                                    <p style={{flex: 1}}> Missions des associations suivies </p>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Checkbox
                                        checked={preferences[1]}
                                        onChange={() => setPreferences([preferences[0], !preferences[1]])}
                                    />
                                    <p style={{flex: 1}}> Amis présents dans la mission </p>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Checkbox
                                        checked={allowMinors}
                                        onChange={() => setAllowMinors(!allowMinors)}
                                    />
                                    <p style={{flex: 1}}> Mineurs autorisés dans la mission </p>
                                </div> 
                            </div>
                        </div>
                        <div style={{flex: 1}}>
                            <h3> Compétences </h3>
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
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Checkbox
                                    checked={noskills}
                                    onChange={() => setNoskills(!noskills)}
                                />
                                <p style={{flex: 1}}> Missions sans compétences seuleument </p>
                            </div>                   
                        </div>
                    </div>
                </div>
                {/* Third Category : Dates du début et de la fin de la mission */}
                <div style={{display: 'flex', flexDirection: 'column', width:"100%"}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{width: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center',  margin: "0 2.5%"}}>
                            <h3> Dates du début et de la fin de la mission </h3>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                                <DatePicker
                                    label="Début"
                                    onChange={(newDate) => setDates([newDate, dates[1]])}
                                    views={['year', 'month', 'day']}
                                    defaultValue={null}
                                    sx={{width: "50%"}}
                                />
                                <div style={{width: '4%'}} />
                                <DatePicker
                                    label="Fin"
                                    onChange={(newDate) => setDates([dates[0], newDate])}
                                    views={['year', 'month', 'day']}
                                    value={dates[1]}
                                    defaultValue={null}
                                    sx={{width: "50%"}}
                                />
                            </div>
                        </div>
                        <div style={{width: '95%', textAlign: 'center'}}>
                            <h3> Séléctionner la durée maximale de la mission </h3>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <TimePicker
                                    label="Durée"
                                    value={duration}
                                    onChange={(newValue) => setDuration(newValue)}
                                    views={['hours', 'minutes']}
                                    sx={{
                                        width: '35%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className='modal-bottom'>
                    <Button 
                        onClick={() => { setValuesToDefault(); ValidateSearch(false); }}
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
                            ValidateSearch(true)
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
                </div>
                </div>
            </Dialog>
        </div>
  );
};

export default FilterModal;