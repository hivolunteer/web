/**
 * @module ManageMission.tsx
 * @description Association Manage Mission Page
 * @utility This page is used to display the association's manage mission page
 */
import './ManageMission.scss';
import { useState } from 'react';
import config from "../../../../config";
import { Button } from '@mui/material';
import ManageMissionInformation from '../../../Volunteer/ManageMission/Components/ManageMissionInformation';
import ManageMissionVolunteers from './ManageMissionVolunteers';

function ManageMission() {
    const [MissionStatus, setMissionStatus] = useState<number>(0);
    const [MissionEndDate, setMissionEndDate] = useState<Date>(new Date());

    // get id from url
    const url = window.location.href;
    const mission_id = url.split("/").pop();

    const [isCompanyMission, setIsCompanyMission] = useState<boolean>(false);
    const [is_company_approved, setIsCompanyApproved] = useState<boolean>(false);

    function publishMission() {
        // fetch(`${config.apiUrl}/missions/association/upload/${mission_id}`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // }).then((response) => {
        //     if (response.status === 201) {
        //         window.location.href = `/manage/${mission_id}`;
        //     } else {
        //         console.log("ERROR");
        //         alert("Une erreur est survenue lors de la publication de la mission");
        //     }
        // });
    }

    function handleCancel () {
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
                    console.log("ERROR");
                    alert("Une erreur est survenue lors de l'annulation de la mission");
                }
        }

    return (
        <div>
            <ManageMissionInformation 
                mission_id={mission_id}
                setMissionStatus={setMissionStatus}
                MissionStatus={MissionStatus}
                isAssociation={true}
                setMissionEndDate={setMissionEndDate}
                MissionEndDate={MissionEndDate}
                setIsCompanyApproved={setIsCompanyApproved}
                setIsCompanyMission={setIsCompanyMission}
            />

            { (MissionStatus !== 0) &&
                <ManageMissionVolunteers mission_id={mission_id} MissionStatus={MissionStatus} MissionEndDate={MissionEndDate} />
            }
            
            <div className='manage-mission-button-container'>
                { MissionStatus === 0 &&
                    <>
                        <Button 
                            className='manage-mission-button'
                            variant="outlined"
                            color="success"
                            onClick={() => publishMission()}
                            disabled={isCompanyMission && !is_company_approved}
                        > Mettre en ligne </Button>
                        <div className='manage-mission-button-separator'/>
                    </>
                    }
                { (MissionStatus === 0) &&
                    <Button className='manage-mission-button' variant="outlined" color="error" onClick={() =>  { if (window.confirm('Êtes-vous surs de vouloir supprimer la mission ? Cette action est irreversible')) deleteMission()} } > {"Supprimer"} </Button>
                }
                { (MissionStatus === 1) &&
                    <Button className='manage-mission-button' variant="outlined" color="error" onClick={() => { if (window.confirm('Êtes-vous surs de vouloir annuler la mission ? Cette action est irreversible')) handleCancel() } }> Annuler </Button>
                }
            </div>
        </div>
    )
}

export default ManageMission;
