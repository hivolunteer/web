import React, { useState, useEffect } from 'react';
import MissionCard from './MissionCard';
import './Home.scss';

function Home(props: any) {

    interface Mission {
        association_mission: number
    }

    const [missionList, setMissionList] = useState<Mission[]>([]);
    const [passedMissionList, setPassedMissionList] = useState<Mission[]>([]);
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        fetch('http://localhost:8000/missions/volunteer/active', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    setMissionList(data.active_missions)
                })
            }
        })

        fetch('http://localhost:8000/missions/volunteer/passed', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  response.json().then((data) => {
                    console.log(data)
                    setPassedMissionList(data.passed_missions)
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
                    console.log(data)
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
            <div style={{width: '95%', margin: '0 2.5%'}}>
                <div>
                    <div>
                        <h1> Vos missions : </h1>
                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0 15%'}}>
                            {
                                missionList.map((mission: any) => {
                                    return(
                                        <div style={{width: '50%'}}>
                                            <MissionCard mission={mission} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <h1> Missions de la semaine </h1>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '0 15%'}}>
                        {
                            passedMissionList.map((mission: any) => {
                                return(
                                    <div style={{width: '50%', margin: '10px 0'}}>
                                        <MissionCard mission={mission} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;