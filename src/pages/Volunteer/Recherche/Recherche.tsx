import "./Recherche.scss";

import {useState, useEffect, ReactNode} from 'react';

import { Box, Button, InputAdornment, Switch, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CustomSwitch from "../../../components/Switch";
import MissionCard from "./MissionCard";
import FiltreModal from "./MissionFiltreModal";
// import .Scss file

import { Association, AssociationModal, Mission, MissionModal } from "./Interface";

function Recherche(props: any) {


        // gestion de la recherche
        const [search, setSearch] = useState<string>('');
        const [subType, setSubType] = useState<string>('Missions');

        // gestion du modal Missions & missions
        const [missionList, setMissionList] = useState<Mission[] | []>([]); 
        const [missionOpen, setMissionOpen] = useState<boolean>(false); // modal state
        const [filteredMissions, setFilteredMissions] = useState<Mission[] | []>([]); // missions filtered by the modal

        const handleClose = () => { // close the modal
            setMissionOpen(false);
        };

        let modalPropsMission : MissionModal = { // modal props
            open: missionOpen,
            setOpen: setMissionOpen,
            filteredMissions: filteredMissions,
            setFilteredMissions: setFilteredMissions,
            handleClose: handleClose
        }

        // gestion du modal Associations & associations
        const [associationList, setAssociationList] = useState<Association[] | []>([]);
        const [associationOpen, setAssociationOpen] = useState<boolean>(false); // modal state
        const [filteredAssociations, setFilteredAssociations] = useState<Association[] | []>([]); // associations filtered by the modal

        const handleCloseAssociation = () => { // close the modal
            setAssociationOpen(false);
        };

        let modalPropsAssociation : AssociationModal = { // modal props
            open: associationOpen,
            setOpen: setAssociationOpen,
            filteredAssociations: filteredAssociations,
            setFilteredAssociations: setFilteredAssociations,
            handleClose: handleCloseAssociation
        }

        // fetch missions

        useEffect(() => {
            fetch('http://localhost:8000/missions/association', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        let mission_list : Mission[] = [];
                        data.map((mission: any) => {
                            mission_list.push({id: mission.id, title: mission.title})
                        })
                        setMissionList(mission_list)
                    })
                }
            })
        }, [])

        const handleSearch = (e: any) => {
            setSearch(e.target.value);
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="search-bar-container">
                    <TextField
                        id="search-bar"
                        style={{flex: 4}}
                        label="Recherche par titre de l’association ou de la mission"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                    }}
                    variant="outlined"
                    sx={{
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '10px',
                    }}
                    value={search}
                    onChange={handleSearch}
                    />
                    <div style={{width: '2%'}} />
                    <TextField id="outlined-basic" label="Ville, Pays" variant="outlined" onChange={() => {}} className="search-country"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <PlaceOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '10px',
                    }}
                    />
                </div>
                <div className="filter-container">
                    <Button 
                        variant="contained"
                        onClick={() => {setMissionOpen(true)}}
                        sx={{
                            backgroundColor: '#FFCF56',
                            color: '#1F0812',
                            textTransform: 'none',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            fontWeight: 'bold',
                            ":hover": {
                                backgroundColor: '#FFCF56',
                                color: '#1F0812'
                            }
                        }}
                    > 
                        Afficher les filtres
                    </Button>
                    <FiltreModal 
                        modalProps={modalPropsMission}
                    />
                </div>
                <div className="switch-container">
                    <CustomSwitch
                        option1="Missions"
                        option2="Associations"
                        subType={subType}
                        setSubType={setSubType}
                    />
                </div>
                {
                    (subType === 'Missions') ? (
                        <div className="missions-container">
                            {
                                missionList
                                .filter((mission: Mission) =>
                                (filteredMissions.length === 0 || filteredMissions.some((filteredMission: Mission) => mission.id === filteredMission.id)) &&
                                mission.title.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((mission: Mission) => (
                                <div className="mission-card" key={mission.id}>
                                    <MissionCard mission_id={mission.id} />
                                </div>
                                ))
                            }
                    </div>
                    ) : (
                        <div/>
                    )
                }
            </div>
        )
}

export default Recherche;