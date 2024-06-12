import React, { useEffect, useState } from 'react';
import "./ReferentHistory.scss";
import config from "../../../config";
import MissionCardHome from '../../../components/MissionCardHome';

function ReferentHistoryList( {is_active} : {is_active: boolean}) {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/referent/volunteer/mission/${is_active ? 'active' : 'passed'}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMissions(data)
                })
            }
        }
        )
    }, [])

    return (
        <div className="referent-history-missions-list">
            {missions.length === 0 &&
                ({is_active} ? <p>Aucune association ne vous a assigné de missions</p> : <p>Engagez vous auprès d'une association !</p>)
            }
            <div className="component-missions-list-missions">
                {missions.map((mission: any) => {
                    return (
                        <div className="component-missions-list-mission component-history-referent-list" key={mission.id}>
                            <MissionCardHome mission={mission} />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default ReferentHistoryList;