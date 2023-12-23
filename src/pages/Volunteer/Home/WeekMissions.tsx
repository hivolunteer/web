import { useState, useEffect } from 'react';
import config from "../../../config";
import MissionCard from './MissionCard';
import './Home.scss';

interface Mission {
    id: number
}

function WeekMissions(props: { missions: Number[] }) {
  const [missionListDisplay, setMissionListDisplay] = useState<Number[]>([]);

  let dateNow = new Date().toISOString()
  // format 2024-11-02 00:00:00
  dateNow = dateNow.split('T')[0] + ' 00:00:00';
  const date7Days = new Date();
  date7Days.setDate(date7Days.getDate() + 7);
  const date7DaysISO = date7Days.toISOString().split('T')[0] + ' 00:00:00';

  useEffect(() => {
    console.log(props.missions)

    fetch(`${config.apiUrl}/search/datefilter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            date_start: dateNow,
            date_end: date7DaysISO
        })
    })
    .then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                data.missions_id.map((mission: Mission) => {
                    if (props.missions.includes(mission.id)) {
                        console.log('mission id : ' + mission.id)
                        console.log(missionListDisplay.includes(mission.id))
                        if (!missionListDisplay.includes(mission.id)) {
                            console.log('mission id : ' + mission.id)
                            setMissionListDisplay(missionListDisplay => [...missionListDisplay, mission.id])
                        }
                    }
                })
            });
        }
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
}, [missionListDisplay, props.missions]);


  return (
    <div className="week-missions">
        <h2> Missions de la Semaine : </h2>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    missionListDisplay.map((mission: any) => {
                        return(
                            <div style={{width: '100%', margin: '10px'}}>
                                <MissionCard mission={mission} />
                            </div>
                        )
                    })
                }
            </div>
    </div>
  )
}

export default WeekMissions;
