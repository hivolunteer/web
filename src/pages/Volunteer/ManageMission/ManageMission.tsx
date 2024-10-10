import React, { useState } from 'react';
import config from "../../../config";
import ManageMissionInformation from './Components/ManageMissionInformation';
import { Button } from '@mui/material';
import './ManageMission.scss';
import ManageMissionVolunteers from './Components/ManageMissionVolunteers';

function ManageMission() {
    const [MissionStatus, setMissionStatus] = useState<number>(0);
    const [MissionEndDate, setMissionEndDate] = useState<Date>(new Date());

    const [isCompanyMission, setIsCompanyMission] = useState<boolean>(false);
    const [is_company_approved, setIsCompanyApproved] = useState<boolean>(false);

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
            <ManageMissionInformation 
                mission_id={mission_id}
                setMissionStatus={setMissionStatus}
                MissionStatus={MissionStatus}
                isAssociation={false}
                setMissionEndDate={setMissionEndDate}
                MissionEndDate={MissionEndDate}
                setIsCompanyApproved={setIsCompanyApproved}
                setIsCompanyMission={setIsCompanyMission}
            />
            
            { (MissionStatus !== 0) &&
                <ManageMissionVolunteers mission_id={mission_id} MissionEndDate={MissionEndDate} />
            }
            
            <div className='manage-mission-button-container'>
                { MissionStatus === 0 &&
                    <>
                        <Button className='manage-mission-button' variant="outlined" color="success" onClick={() => publishMission()} disabled={isCompanyMission && !is_company_approved}> Mettre en ligne </Button>
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