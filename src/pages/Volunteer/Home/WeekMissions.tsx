import { useState, useEffect } from 'react';
import MissionCard from './MissionCard';
import './Home.scss';

function WeekMissions (props: {missions: [Number]}) {

    const [missionList, setMissionList] = useState<Number[]>(props.missions);

    useEffect(() => {
    }, [])

    return (
        <div className="week-missions">
        </div>
    )
}

export default WeekMissions;