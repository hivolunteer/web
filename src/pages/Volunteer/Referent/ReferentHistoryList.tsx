import { useEffect, useState } from 'react';
import config from "../../../config";
import MissionCardHome from '../../../components/MissionCardHome';
import isToday from '../../../functions/isToday';
import "./ReferentHistory.scss";

function ReferentHistoryList( {is_active} : {is_active: boolean}) {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        console.log(is_active)
        fetch(`${config.apiUrl}/referent/volunteer/mission/${is_active ? 'active' : 'passed'}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const sortedMissions = data.sort(
                        (a: { start_date: Date }, b: { start_date: Date }) => 
                            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
                    );
                    setMissions(sortedMissions)
                })
            }
        }
        )
    }, [is_active])

    return (
        <div className="referent-history-missions-list">
            {missions.length === 0 && (
                is_active 
                    ? <p>Aucune association ne vous a assigné de missions.</p> 
                    : <p>Engagez-vous auprès d'une association !</p>
            )}
            <div className="component-missions-list-missions">
                {missions.map((mission: any) => {
                    return (
                        <div className="component-missions-list-mission component-history-referent-list" key={mission.id}>
                            <MissionCardHome
                                mission={mission}
                                isToday={isToday(mission.start_date)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default ReferentHistoryList;