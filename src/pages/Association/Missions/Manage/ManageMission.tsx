/**
 * @module ManageMission.tsx
 * @description Association Manage Mission Page
 * @utility This page is used to display the association's manage mission page
 */
import './ManageMission.scss';
import { useEffect, useState } from 'react';
import config from "../../../../config";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Mission, Location, Volunteer } from "./Interfaces";
import UserCard from '../../../../components/UserCard';
import ReturnComments from './ReturnComments';
import { log } from 'console';

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

interface Volunteer {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    profile_picture: string,
    rating: number,
    status: number,
    stars_from_volunteer: number,
    stars_from_association: number,
    comment_from_volunteer: string,
    comment_from_association: string,
}

function ManageMission() {

    const [mission, setMission] = useState<Mission>()
    const [missionPicture, setMissionPicture] = useState("");
    const [location, setLocation] = useState<Location>()
    const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([])


    // get id from url
    const url = window.location.href;
    const mission_id = url.split("/").pop();

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association/${mission_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMission(data.association_mission);
                    console.log(data)
                    setMissionPicture(data.association_mission?.picture);
                    fetch(`${config.apiUrl}/locations/${data.association_mission?.location}`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }).then((response) => {
                        console.log("RESPONSE", response);
                        if (response.status === 200) {
                            response.json().then((data) => {
                                console.log(data);
                                setLocation(data);
                            })
                        }
                    })
                    if (data.association_mission?.status === 1) {
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
                                    console.log("VOLUNTEERS", data);
                                })
                            }
                        })
                    }
                }) 
            } else {
                window.location.href = "/";
            }
        })
    }, [])

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

    function deleteMission() {
        if (mission?.status === 0) {
            fetch(`${config.apiUrl}/missions/association/delete/${mission_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                if (response.status === 201) {
                    window.location.href = "/";
                } else {
                    console.log("ERROR");
                    alert("Une erreur est survenue lors de la suppression de la mission");
                }
            })
        } else {
            fetch(`${config.apiUrl}/missions/association/cancel/${mission_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                if (response.status === 200) {
                    window.location.href = "/";
                } else {
                    console.log("ERROR");
                    alert("Une erreur est survenue lors de l'annulation de la mission");
                }
            })
        }
    }

    function publishMission() {
        fetch(`${config.apiUrl}/missions/association/upload/${mission_id}`, {
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
        });
    }

    function acceptVolunteer(id: number) {
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/accept`, {
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
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/refuse`, {
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
            <div className="manage-container header-mission-container" style={{backgroundImage: `url('${window.location.origin + missionPicture}')`}}>
                <div className="association-logo">
                    {/* <img src="https://th.bing.com/th/id/R.a159530285fe4c5b20f40dc89741304e?rik=3L6mcWO3XWPxxA&pid=ImgRaw&r=0.png" alt="logo" className='association-logo-mission'/> */}
                </div>
                <div className="mission-title">
                    <h1> {mission?.title } </h1>
                </div>
            </div>
            <div className="container body-mission-container">
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
                {
                    mission?.status !== 3 && (
                    <>
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
                    </>
                    )
                }
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
                {
                    mission?.status === 3 && (
                        <>
                        <hr className="mission-separator" />
                        <ReturnComments mission_id={mission_id} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ManageMission;