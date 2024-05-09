import React, { useState } from 'react';
import config from "../../../config";
import ManageMissionInformation from './Components/ManageMissionInformation';
import { Button } from '@mui/material';
import './ManageMission.scss';
import ManageMissionVolunteers from './Components/ManageMissionVolunteers';

function ManageMission() {
    const [MissionStatus, setMissionStatus] = useState<number>(0);

    // get id from url
    const url = window.location.href;
    const mission_id = url.split("/").pop();

    function publishMission() {
        fetch(`${config.apiUrl}/missions/close/upload/${mission_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setMissionStatus(1);
            } else {
                console.log("ERROR");
                alert("Une erreur est survenue lors de la publication de la mission");
            }
        })
    }

    function deleteMission() {
        if (MissionStatus === 0) {
            fetch(`${config.apiUrl}/missions/close/delete/${mission_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                if (response.status === 201) {
                    window.history.back();
                } else {
                    console.log("ERROR");
                    alert("Une erreur est survenue lors de la suppression de la mission");
                }
            })
        } else {
            fetch(`${config.apiUrl}/missions/close/cancel/${mission_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    setMissionStatus(2);
                } else {
                    console.log("ERROR");
                    alert("Une erreur est survenue lors de l'annulation de la mission");
                }
            })
        }
      }    

    return (
        <div>
            <ManageMissionInformation mission_id={mission_id} setMissionStatus={setMissionStatus} MissionStatus={MissionStatus} />
            
            { (MissionStatus != 0) &&
                <ManageMissionVolunteers mission_id={mission_id} />
            }
            
            <div className='manage-mission-button-container'>
                { MissionStatus === 0 &&
                    <>
                        <Button className='manage-mission-button' variant="outlined" color="success" onClick={() => publishMission()}> Mettre en ligne </Button>
                        <div className='manage-mission-button-separator'/>
                    </>
                    }
                { (MissionStatus === 0 || MissionStatus === 1) &&
                    <Button className='manage-mission-button' variant="outlined" color="error" onClick={() => deleteMission()}> {MissionStatus === 0 ? "Supprimer" : "Annuler"} </Button>
                }
            </div>
            {/* { mission?.status !== 0 && (
            <Accordion className="volunteer-manage-mission-accordion" defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    Volontaires inscrits ({ListVolunteers.length} / {mission?.max_volunteers})
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper} style={{ }}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell align="right">Prénom</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Note</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {ListVolunteers.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.last_name}
                                </TableCell>
                                <TableCell align="right">{row.first_name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.rating}</TableCell>
                                <TableCell align="center">{row.status === 0 ? "En attente" : row.status === 1 ? "Accepté" : "Refusé"}</TableCell>
                                <TableCell align="center">
                                {row.status === 0 && (
                                  <>
                                    <IconButton onClick={() => acceptVolunteer(row.id)}> <CheckIcon /> </IconButton>
                                    <IconButton onClick={() => refuseVolunteer(row.id)}> <CloseIcon /> </IconButton>
                                  </>
                                )}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            )} */}

            {/* <div className="container body-mission-container">
                <div className="mission-firstinformation">

                    <div className="mission-date">
                        <AccessTimeIcon className="mission-icon" />
                        Du {formatDate(mission?.start_date?.toString() ?? '')} au {formatDate(mission?.end_date?.toString() ?? '')}
                    </div>
                    <div className="mission-location">
                        <NearMeOutlinedIcon className="mission-icon" />
                        {location?.street_number} {location?.street_number_suffix} {location?.street_type} {location?.street_name}, {location?.postal_code} {location?.city}
                    </div>
                    <h4> Description </h4>
                    { mission?.description }
                </div>
                <div className="mission-management">
                    <Button className="mission-button" onClick={() => window.location.href = `/association/missions/${mission?.id}`} 
                    style={
                        {backgroundColor: '#67a191', color: 'white'}                         
                    }> Visualiser </Button>
                    <Button className="mission-button" onClick={() => window.location.href = `/association/missions/${mission?.id}/edit`}
                    style={{backgroundColor: '#db8900', color: 'white'}}> Modifier </Button>
                    <Button className="mission-button" onClick={() => deleteMission()}
                    style={{backgroundColor: '#991760', color: 'white'}}> {mission?.status === 0 ? "Supprimer" : "Annuler"} </Button>       
                    { mission?.status === 0 && <Button className="mission-button" onClick={() => publishMission()}
                    style={{backgroundColor: '#67a191', color: 'white'}}> Publier </Button> }             
                </div>
                { mission?.status === 1 && (
                    <>
                <hr className="mission-separator" />
                <div className="mission-volunteers">
                    <h2> Volontaires inscrits ({ListVolunteers.length} / {mission?.max_volunteers})  </h2>
                    <TableContainer component={Paper} style={{ }}>
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell align="right">Prénom</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Note</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {ListVolunteers.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.last_name}
                                </TableCell>
                                <TableCell align="right">{row.first_name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.rating}</TableCell>
                                <TableCell align="center">{row.status === 0 ? "En attente" : row.status === 1 ? "Accepté" : "Refusé"}</TableCell>
                                <TableCell align="center">
                                {row.status === 0 && (
                                  <>
                                    <IconButton onClick={() => acceptVolunteer(row.id)}> <CheckIcon /> </IconButton>
                                    <IconButton onClick={() => refuseVolunteer(row.id)}> <CloseIcon /> </IconButton>
                                  </>
                                )}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                </>
                )}
            </div> */}
        </div>
    )
}

export default ManageMission;