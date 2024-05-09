/**
 * @module Accueil.tsx
 * @description Association Accueil Page
 * @utility This page is used to display the association's accueil page
 */
import './Accueil.scss';
import '../../Volunteer/Home/Home.scss';
import {useEffect, useState } from 'react'
import config from "../../../config";
import { Button } from '@mui/material';
import MissionCard from '../../../components/MissionCard';
import { Mission } from '../../../interfaces';


function Accueil () {
    const [missionList, setMissionList] = useState<Mission[]>([])

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMissionList(data.active)
                })
            }
        })
    }, [])

    return (
        <div>
            <h1> Accueil </h1>
            <div className="body-container">
                <div className="mission-container">
                    <div>
                        <h2> Prochaines missions : </h2>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            { missionList &&
                                missionList.map((mission: Mission) => {
                                    return(
                                        <div style={{width: '100%', margin: '10px'}}>
                                            <MissionCard mission={mission} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accueil;