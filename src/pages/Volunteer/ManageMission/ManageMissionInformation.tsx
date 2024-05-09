import { useEffect, useState } from "react";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import config from "../../../config";
import './ManageMissionInformation.scss';

interface Mission {
  id: number,
  max_volunteers: number,
  description: string,
  practical_information: string,
  start_date: Date,
  end_date: Date,
  location: number,
  title: string,
  status: number,
  theme_id: number,
  picture: string,
}

interface Location {
  id: number,
  street_number: string,
  street_name: string,
  street_number_suffix: string,
  street_type: string,
  departement_id: number,
  city: number,
  postal_code: string,
}

function TextDisplayer(props: any) {
  const element = props.element;

  if (element === null || element === undefined) {
      return (
        <div className="manage-mission-information-container">
          <p className="manage-mission-information-container-text">Non défini</p>
        </div>
      );
  } else {
      return (
        <div className="manage-mission-information-container">
          { element }
        </div>
      );
  }
}

function ManageMissionInformation(props: any) {
  const [mission, setMission] = useState<Mission>();
  const [location, setLocation] = useState<Location>();

  const mission_id = props.mission_id;
  const onPublish = props.onPublish;
  const setMissionStatus = props.setMissionStatus;

  function formatDate(date: string) {
    if (date === '')
        return ''
    let day = date.split('T')[0].split('-')[2]
    let month = date.split('T')[0].split('-')[1]
    let year = date.split('T')[0].split('-')[0]
    let hour = date.split('T')[1].split(':')[0]
    let minutes = date.split('T')[1].split(':')[1]
    return `${day}/${month}/${year} à ${hour}:${minutes}`
  }

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/close/${mission_id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                setMission(data.close_mission);
                setMissionStatus(data.close_mission?.status);
                fetch(`${config.apiUrl}/locations/${data.close_mission?.location}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setLocation(data);
                        })
                    }
                })
                if (data.association_mission?.status === 1) {
                  onPublish();
                }
            }) 
        } else {
            window.location.href = "/";
        }
    })
}, [])


  function publishMission() {
    fetch(`${config.apiUrl}/missions/close/upload/${mission_id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 201) {
            window.location.href = `/manage/${mission_id}`;
        } else {
            console.log("ERROR");
            alert("Une erreur est survenue lors de la publication de la mission");
        }
    })
  }

  function acceptVolunteer(id: number) {
    fetch(`${config.apiUrl}/missions/close/${mission_id}/${id}/accept`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 201) {
            alert("Le volontaire a été accepté");
            window.location.href = `/manage/${mission_id}`;
        } else {
            console.log("ERROR");
            alert("Une erreur est survenue lors de l'acceptation du volontaire");
        }
    })
  }

  function refuseVolunteer(id: number) {
    fetch(`${config.apiUrl}/missions/close/${mission_id}/${id}/refuse`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response) => {
        if (response.status === 201) {
            alert("Le volontaire a été refusé");
            window.location.href = `/manage/${mission_id}`;
        } else {
            console.log("ERROR");
            alert("Une erreur est survenue lors du refus du volontaire");
        }
    })
  }


    return (
      <div>
        <div className="manage-mission-information-header-container" style={{backgroundImage: `url(${mission?.picture})`}}>
          {/* <div className="association-logo">
            <img src="https://th.bing.com/th/id/R.a159530285fe4c5b20f40dc89741304e?rik=3L6mcWO3XWPxxA&pid=ImgRaw&r=0.png" alt="logo" className='association-logo-mission'/>
          </div> */}
          <div className="manage-mission-information-header-container-title">
            <h1> { mission?.title } </h1>
          </div>
        </div>
        <Accordion className="volunteer-manage-mission-accordion" defaultExpanded={true}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
          >
              Informations de la mission
          </AccordionSummary>
          <AccordionDetails>
              <Grid container spacing={3}>
                  <Grid xs={6}>
                      <h4> Date de la mission </h4>
                      <div className="manage-mission-information-container">
                      Du {formatDate(mission?.start_date?.toString() ?? '')} au {formatDate(mission?.end_date?.toString() ?? '')}
                      </div>
                      <h4> Lieu </h4>
                      <div className="manage-mission-information-container">
                      {location?.street_number} {location?.street_number_suffix} {location?.street_type} {location?.street_name}, {location?.postal_code} {location?.city}
                      </div>
                      <h4> Nombre de volontaires </h4>
                      <TextDisplayer element={mission?.max_volunteers} />
                      <h4> Thème </h4>
                      <TextDisplayer element={mission?.theme_id} />
                      <h4> Status </h4>
                      <p className={mission?.status === 1 ? "manage-mission-information-status-published" : mission?.status === 2 ? "manage-mission-information-status-canceled" : mission?.status === 3 ? "manage-mission-information-status-passed" : "manage-mission-information-status-draft"}>
                        { mission?.status === 1 ? "En ligne" : mission?.status === 2 ? "Annulée" : mission?.status === 3 ? "Passée" : "Brouillon" }
                      </p>

                  </Grid>
                  <Grid xs={6}>
                      <h4> Description de la mission </h4>
                      <TextDisplayer element={mission?.description} />
                      <h4> Informations pratiques </h4>
                      <TextDisplayer element={mission?.practical_information} />
                  </Grid>
              </Grid>
          </AccordionDetails>
          <AccordionActions>
              <Button size="small" color="warning" onClick={() => window.location.href = `/close/missions/${mission?.id}/edit`}>Modifier</Button>
              <Button size="small" color="info" onClick={() => window.location.href = `/close/missions/${mission?.id}`}>Visualiser</Button>
          </AccordionActions>
      </Accordion>
    </div>
  );
}

export default ManageMissionInformation;