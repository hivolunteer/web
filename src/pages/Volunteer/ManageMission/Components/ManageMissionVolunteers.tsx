import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader } from '@mui/material'
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
      {(volunteer.profile_picture === null || volunteer.profile_picture === "") ?
        <div className="volunteer-manage-mission-volunteer-card-picture-container">
          <img className="volunteer-manage-mission-volunteer-card-picture" src="https://www.w3schools.com/howto/img_avatar.png" alt="profile_picture" />
        </div>
        :
        <div className="volunteer-manage-mission-volunteer-card-picture-container">
          <img className="volunteer-manage-mission-volunteer-card-picture" src={volunteer.profile_picture} alt="profile_picture" />
        </div>
      }
      <div className="volunteer-manage-mission-volunteer-card-information">
        <p>{volunteer.first_name} {volunteer.last_name}</p>
      </div>
    </div>
  );
}

type ManageMissionVolunteersProps = {
  mission_id: string | undefined,
  MissionEndDate: Date,
}

function ManageMissionVolunteers(props: ManageMissionVolunteersProps) {
  const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([]);

  const mission_id = props.mission_id;
  const MissionEndDate = props.MissionEndDate;

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
    <Card className="volunteer-manage-mission-accordion" sx={{ marginTop: '1em' }}>
      <CardHeader
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        Gestion des participants
      </CardHeader>
      <CardContent>
        {ListVolunteers.length === 0 ?
          <p>Aucun participant pour le moment</p>
          :
          <div className="volunteer-manage-mission-volunteers-list-container">
            {ListVolunteers.map((volunteer) => (
              <VolunteerCard volunteer={volunteer} />
            ))}
          </div>
        }
      </CardContent>
    </Card>
  )
}

export default ManageMissionVolunteers