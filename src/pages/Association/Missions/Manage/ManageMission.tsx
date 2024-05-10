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
import UserCard from '../../../../components/UserCard';
import ReturnComments from './ReturnComments';
import ManageMissionInformation from '../../../Volunteer/ManageMission/Components/ManageMissionInformation';
import ManageMissionVolunteers from './ManageMissionVolunteers';

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
    const [MissionStatus, setMissionStatus] = useState<number>(0);

    // get id from url
    const url = window.location.href;
    const mission_id = url.split("/").pop();

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

    function deleteMission() {
        if (MissionStatus === 0) {
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

    return (
        <div>
            <ManageMissionInformation mission_id={mission_id} setMissionStatus={setMissionStatus} MissionStatus={MissionStatus} isAssociation={true} />

            { (MissionStatus !== 0) &&
                <ManageMissionVolunteers mission_id={mission_id} MissionStatus={MissionStatus} />
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
        </div>
    )
}

export default ManageMission;