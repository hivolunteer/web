import {useState, useEffect} from 'react'
import config from '../../../../config'
import RateCard from "../RateCard";

function PassedMissionPanel() {
    const [missions, setMissions] = useState<number[]>([])

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    let _missions : number[] = []
                    data.passed.forEach((mission: any) => {
                        _missions.push(mission.id)
                    })
                    setMissions(_missions)
                })
            }
        })
    }, [])

    return (
        <div className='panel-div'>
            {missions.map((mission) => (
                <div style={{width: '45%', margin: ' 0 2.5%'}}>
                <RateCard
                    key={mission}
                    mission={mission}
                />
            </div>
            ))}
        </div>
    )
}

export default PassedMissionPanel