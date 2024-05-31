import {useState, useEffect} from 'react'
import config from '../../../config'
import MissionCard from '../../../components/MissionCard'
import MissionCardHome from '../../../components/MissionCardHome'

function ActiveMissionPanel() {
    const [missions, setMissions] = useState<any[]>([])

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
                    let _missions : any[] = []
                    data.active.forEach((mission: any) => {
                        _missions.push(mission)
                    })
                    setMissions(_missions)
                })
            }
        })
    }, [])

    return (
        <div className='panel-div'>
            {missions.map((mission) => (
                <div style={{width: '45%', margin: ' 0 2.5%', cursor: 'pointer'}}>
                    <MissionCardHome
                        key={mission}
                        mission={mission}
                    />
                </div>
            ))}
        </div>
    )
}

export default ActiveMissionPanel