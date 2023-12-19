import React, { useState, useEffect } from 'react';
import MissionCard from './MissionCard';
import config from "../../../config";

function Home(props: any) {
    interface Mission {
        association_mission: number
    }

    const [missionList, setMissionList] = useState<Mission[]>([]);
    const [passedMissionList, setPassedMissionList] = useState<Mission[]>([]);


    useEffect(() => {
        console.log(localStorage)
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

        fetch(`${config.apiUrl}/missions/volunteer/passed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          }).then((response) => {
              if (response.status === 200) {
                  response.json().then((data) => {
                    setPassedMissionList(data.passed_missions)
                  })
              }
          })
    }, [])
    
    return(
        <div>
            <div>
                <h1> Bienvenue sur l'application HiVolunteer ! </h1>
            </div>
            <div>
                <div>
                    <h1> Vos missions : </h1>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            missionList.map((mission: any) => {
                                return(
                                    <MissionCard mission={mission.association_mission} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
            <div>
                <h1> Vos missions passées : </h1>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        passedMissionList.map((mission: any) => {
                            return(
                                <MissionCard mission={mission.association_mission} />
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