import { useState, useEffect } from 'react';
import './Home.scss';
import config from "../../../config";
import MissionCard from './MissionCard';
import WeekMissions from './WeekMissions';

function Home(props: any) {

    const [missionList, setMissionList] = useState<Number[]>([]);
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/active`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMissionList(data.active_missions)
                })
            }
        })

          fetch('http://localhost:8000/volunteers/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setProfile(data.volunteer)
                })
            }
        })
    }, [])
    
    return(
        <div className="home-container">
            <div className="header-container">
                <div className="header-left">
                    <br/>
                    <h1> {profile.first_name} {profile.last_name} </h1>
                </div>
                <div className="header-right">
                    <p> {profile.rating} </p>
                </div>
            </div>
            <div className="body-container">
                <div className="mission-container">
                    <div>
                        <h2> Prochaines missions : </h2>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                missionList.map((mission: any) => {
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
                <div>
                    <WeekMissions missions={missionList} />
                </div>
            </div>
        </div>
    )
}

export default Home;