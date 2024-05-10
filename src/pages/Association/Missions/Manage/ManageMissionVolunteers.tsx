import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Grid, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import config from "../../../../config";
import './ManageMissionVolunteers.scss'

interface Volunteer {
    id: number,
    first_name: string,
    last_name: string,
    profile_picture: string,
    status: number,
}

type VolunteerCardProps = {
    volunteer: Volunteer,
    is_premium: boolean,
    onAccept: any,
    onRefuse: any,
    MissionStatus: number,
}

function VolunteerCard(props: VolunteerCardProps) {
    const volunteer = props.volunteer;
    const is_premium = props.is_premium;
    const onAccept = props.onAccept;
    const onRefuse = props.onRefuse;
    const MissionStatus = props.MissionStatus;

    if (MissionStatus !== 1) {
        return (
            <div className="volunteer-manage-mission-volunteer-card" onClick={() => window.location.href = `/volunteer/${volunteer.id}`}>
                <div className="volunteer-manage-mission-volunteer-card-picture-container">
                    <img className="volunteer-manage-mission-volunteer-card-picture" src={volunteer.profile_picture} alt="profile_picture" />
                </div>
                <div className="volunteer-manage-mission-volunteer-card-information">
                    <p>{volunteer.first_name} {volunteer.last_name}</p>
                </div>
            </div>
        );
    }

    if (is_premium) {
        return (
            <div className="association-manage-mission-volunteer-card">
                <div className="association-manage-mission-volunteer-card-picture-container">
                    <img className="association-manage-mission-volunteer-card-picture" src={volunteer.profile_picture} alt="profile_picture" />
                </div>
                <div className="association-manage-mission-volunteer-card-information" onClick={() => window.location.href = `/volunteer/${volunteer.id}`}>
                    <p>{volunteer.first_name} {volunteer.last_name}</p>
                </div>
                <div className="association-manage-mission-volunteer-card-action">
                    <IconButton onClick={() => onAccept(volunteer.id)}>
                        <CheckIcon color="success" />
                    </IconButton>
                    <IconButton onClick={() => onRefuse(volunteer.id)}>
                        <CloseIcon color="error" />
                    </IconButton>
                </div>
            </div>
        );
    }

    return (
        <div className="association-manage-mission-volunteer-card">
            <div className="association-manage-mission-volunteer-card-picture-container">
                <img className="association-manage-mission-volunteer-card-picture" src={volunteer.profile_picture} alt="profile_picture" />
            </div>
            <div className="association-manage-mission-volunteer-card-information" onClick={() => window.location.href = `/volunteer/${volunteer.id}`}>
                <p>{volunteer.first_name} {volunteer.last_name}</p>
            </div>
        </div>
    );
}

type ManageMissionVolunteersProps = {
    mission_id: string | undefined,
    MissionStatus: number,
}

function ManageMissionVolunteers(props: ManageMissionVolunteersProps) {
    const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([]);
    const [response, setResponse] = useState<{ error: boolean, message: string }>({ error: false, message: "" });
    const mission_id = props.mission_id;
    const MissionStatus = props.MissionStatus;

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/${mission_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListVolunteers(data)
                })
            }
        })
    }, [mission_id]);

    function acceptVolunteer(id: number) {
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/accept`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setResponse({ error: false, message: "Le bénévole a bien été accepté" });
                // on ListVolunteers, change the volunteer status
                setListVolunteers(ListVolunteers.map(volunteer => volunteer.id === id ? { ...volunteer, status: 1 } : volunteer));
            } else {
                setResponse({ error: true, message: "Une erreur est survenue lors de l'acceptation du bénévole" });
            }
        })
    }
    
    function refuseVolunteer(id: number) {
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/refuse`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setResponse({ error: false, message: "Le bénévole a bien été refusé" });
                // on ListVolunteers, remove the volunteer
                setListVolunteers(ListVolunteers.filter(volunteer => volunteer.id !== id));
            } else {
                setResponse({ error: true, message: "Une erreur est survenue lors du refus du bénévole" });                
            }
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setResponse({ error: false, message: "" });
        }, 5000);
        return () => clearTimeout(timer);
    }, [response]);

    return (
        <div className='association-manage-mission-volunteers-container'>
            <Accordion className="association-manage-mission-accordion" defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    Gestion des participants
                </AccordionSummary>
                <AccordionDetails>
                    { MissionStatus !== 1 ?
                        ListVolunteers.length === 0 ?
                            <p>Aucun participant</p>
                            :
                            ListVolunteers.map((volunteer) => {
                                return (
                                    <VolunteerCard volunteer={volunteer} is_premium={false} onAccept={acceptVolunteer} onRefuse={refuseVolunteer} MissionStatus={MissionStatus} />
                                )
                            })
                        :
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <h2>Participants en attente</h2>
                                    <div className="association-manage-mission-volunteers-list-container">
                                        { ListVolunteers.length === 0 ?
                                            <p>Aucun participant en attente</p>
                                            :
                                            ListVolunteers.map((volunteer) => {
                                                if (volunteer.status === 0) {
                                                    return (
                                                        <VolunteerCard volunteer={volunteer} is_premium={true} onAccept={acceptVolunteer} onRefuse={refuseVolunteer} MissionStatus={MissionStatus} />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <h2>Participants acceptés</h2>
                                    <div className="association-manage-mission-volunteers-list-container">
                                        { ListVolunteers.length === 0 ?
                                            <p>Aucun participant accepté</p>
                                            :
                                            ListVolunteers.map((volunteer) => {
                                                if (volunteer.status === 1) {
                                                    return (
                                                        <VolunteerCard volunteer={volunteer} is_premium={false} onAccept={acceptVolunteer} onRefuse={refuseVolunteer} MissionStatus={MissionStatus} />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                    }
                </AccordionDetails>
            </Accordion>
            {
                response.message !== "" &&
                <Alert severity={response.error ? "error" : "success"}>{response.message}</Alert>
            }
        </div>
    );
}

export default ManageMissionVolunteers;