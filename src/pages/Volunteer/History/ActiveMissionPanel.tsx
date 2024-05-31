import {useState, useEffect} from 'react'
import config from '../../../config'
import MissionCard from '../../../components/MissionCard'
import MissionCardHome from '../../../components/MissionCardHome'

function ActiveMissionPanel() {

    interface PageMission {
        page: number
        mission: any[]
    }

    const [missions, setMissions] = useState<PageMission[]>([])

    const [max_page, setMaxPage] = useState<number>(1)

    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: any) => {
            if (response.status === 200) {
                response.json().then((data: any) => {
                    let _missions : PageMission[] = []
                    let page_number = Number(Number(data.active.length / 4).toString().split('.')[0])
                    setMaxPage(page_number + 1)
                    let x = 0;
                    let page = 1;
                    data.active.forEach((mission: any) => {
                        if (x === 4) {
                            x = 0
                            page++
                        }
                        if (x === 0) {
                            _missions.push({page: page, mission: []})
                        }
                        _missions[page - 1].mission.push(mission)
                        x++
                    })
                    setMissions(_missions)  
                })
            }
        })
    }, [])

    return (
        <div className='panel-div'>
            {missions.filter((mission) => mission.page === page).map((mission) => (
                <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                    {mission.mission.map((mission) => (
                        <div
                            style={{width: '45%', margin: '2.5%'}}
                        >
                            <MissionCardHome
                                key={mission.id}
                                mission={mission}
                            />
                        </div>
                    ))}
                </div>
            ))}
            {
                max_page > 1 && (
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        {
                            Array.from(Array(max_page).keys()).map((index) => (
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: index + 1 === page ? '#FFD700' : '#000000',
                                        margin: '0 5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: index + 1 === page ? '#000000' : '#FFFFFF',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ActiveMissionPanel