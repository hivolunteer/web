import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import config from "../../../../config";
import './ManageMissionVolunteers.scss'

interface Volunteer {
    id: number,
    first_name: string,
    last_name: string,
    profile_picture: string,
}

type VolunteerCardProps = {
    volunteer: Volunteer,
}

function VolunteerCard(props: VolunteerCardProps) {
    const volunteer = props.volunteer;

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

type ManageMissionVolunteersProps = {
    mission_id: string | undefined,
}

function ManageMissionVolunteers(props: ManageMissionVolunteersProps) {
    const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([]);

    const mission_id = props.mission_id;

  useEffect(() => {
        fetch(`${config.apiUrl}/missions/close/volunteers/${mission_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListVolunteers(data.volunteers);
                })
            }
        })
    }, [mission_id]); 

  return (
    <Accordion className="volunteer-manage-mission-accordion" defaultExpanded={true}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            Gestion des participants
        </AccordionSummary>
        <AccordionDetails>
            {ListVolunteers.length === 0 ?
                <p>Aucun participant pour le moment</p>
                :  
                <div className="volunteer-manage-mission-volunteers-list-container">
                    {ListVolunteers.map((volunteer) => (
                        <VolunteerCard volunteer={volunteer} />
                    ))}
                </div>
            }
        </AccordionDetails>
    </Accordion>
  )
}

export default ManageMissionVolunteers