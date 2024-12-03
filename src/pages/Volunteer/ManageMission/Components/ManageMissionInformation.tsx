import { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import config from "../../../../config";
import moment from "moment-timezone";
import './ManageMissionInformation.scss';
import getTheme from "../../../../functions/getTheme";

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

function TextDisplayer({ element }: { element: string | number | undefined }) {
  if (element === null || element === undefined) {
    return (
      <div className="manage-mission-information-container">
        <p className="manage-mission-information-container-text">Non défini</p>
      </div>
    );
  } else if (typeof element === 'number') {
    return (
      <div className="manage-mission-information-container">
        <p className="manage-mission-information-container-text">{element}</p>
      </div>
    );
  } else {
    // Format the text to display it correctly in many lines
    const text = (element as string).split('\n').map((item: string, key: number) => {
      return <span key={key}>{item}<br /></span>
    });
    return (
      <div className="manage-mission-information-container">
        {text}
      </div>
    );
  }
}

type ManageMissionInformationProps = {
  mission_id: string | undefined,
  setMissionStatus: any,
  MissionStatus: number,
  setMissionEndDate: any,
  MissionEndDate: Date,
  isAssociation: boolean,
  setIsCompanyApproved: (isCompanyApproved: boolean) => void,
  setIsCompanyMission: (isCompanyMission: boolean) => void,
}

function ManageMissionInformation(props: ManageMissionInformationProps) {
  const [mission, setMission] = useState<Mission>();
  const [location, setLocation] = useState<Location>();
  const [missionPicture, setMissionPicture] = useState<string>("");
  const [, setTheme] = useState<string>('');

  const mission_id = props.mission_id;
  const SetMissionStatus = props.setMissionStatus;
  const SetMissionEndDate = props.setMissionEndDate;
  const isAssociation = props.isAssociation;

  function formatDate(date: string) {
    if (date === '') return '';
    const parisDate = moment.tz(date, 'Europe/Paris');
    return `${parisDate.format('DD/MM/YYYY')} à ${parisDate.format('HH:mm')}`;
}

  useEffect(() => {
    fetch(`${config.apiUrl}/missions/${isAssociation ? 'association' : 'close'}/${mission_id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const mission = (isAssociation ? data.association_mission : data.close_mission)
          setMission(mission);

          getTheme(localStorage.getItem('token') as string, mission.theme_id).then((theme) => {
            setTheme(theme);
          });

          props.setIsCompanyApproved(isAssociation ? data.association_mission.approved_company : data.close_mission.is_approved_company);
          props.setIsCompanyMission(isAssociation ? ((data.association_mission.company_id !== null) ? true : false) : data.close_mission.is_company);
          SetMissionStatus(mission.status);
          SetMissionEndDate(mission.end_date);
          setMissionPicture(mission.picture);
          fetch(`${config.apiUrl}/locations/${mission.location}`, {
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
          console.log("MISSION PICTURE", missionPicture);
          if (mission.picture && mission.picture.startsWith('/uploads')) {
            fetch(`${config.apiUrl}/uploads/${isAssociation ? 'association' : 'volunteer'}/mission/${mission_id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
            }).then((response) => {
              console.log(response);
              response.blob()
                .then((blob) => {
                  const objectUrl = URL.createObjectURL(blob);
                  setMissionPicture(objectUrl);
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          }
        })
      } else {
        window.location.href = "/";
      }
    });
  }, [mission_id, isAssociation, SetMissionStatus, SetMissionEndDate, missionPicture]);

  return (
    <div>
      <div className="manage-mission-information-header-container" style={{ backgroundImage: `url(${missionPicture})` }}>
        {/* <div className="association-logo">
            <img src="https://th.bing.com/th/id/R.a159530285fe4c5b20f40dc89741304e?rik=3L6mcWO3XWPxxA&pid=ImgRaw&r=0.png" alt="logo" className='association-logo-mission'/>
          </div> */}
        <div className="manage-mission-information-header-container-title">
          <h1> {mission?.title} </h1>
        </div>
      </div>
      <Card className="volunteer-manage-mission-accordion" sx={{ marginTop: '1em' }}>
        <CardHeader
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Informations de la mission
        </CardHeader>
        <CardContent>
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
              {/* <h4> Thème </h4>
              <TextDisplayer element={theme} /> */}
              <h4> Status </h4>
              <p className={props.MissionStatus === 1 ? "manage-mission-information-status-published" : props.MissionStatus === 2 ? "manage-mission-information-status-canceled" : props.MissionStatus === 3 ? "manage-mission-information-status-passed" : "manage-mission-information-status-draft"}>
                {props.MissionStatus === 1 ? "En ligne" : props.MissionStatus === 2 ? "Annulée" : props.MissionStatus === 3 ? "Passée" : "Brouillon"}
              </p>

            </Grid>
            <Grid xs={6}>
              <h4> Description de la mission </h4>
              <TextDisplayer element={mission?.description} />
              <h4> Informations pratiques </h4>
              <TextDisplayer element={mission?.practical_information} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" color="warning" onClick={() => window.location.href = `/${mission?.id}/edit`}>Modifier</Button>
          <Button size="small" color="info" onClick={() => window.location.href = localStorage.getItem('role') === 'association' ? `/manage/${mission?.id}` :  `/mission/close/${mission?.id}`}>Visualiser</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ManageMissionInformation;