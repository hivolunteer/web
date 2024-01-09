/**
 * @module Home.tsx
 * @description Association Home Page
 * @utility This page is used to display the association's home page
*/

import './Home.scss';
import {useEffect, useState } from 'react'
import config from "../../../config";
import { Button } from '@mui/material';
import HomeMisssionCard from '../../../components/HomeMissionCard';

interface Association {
    id: number,
    name: string, 
    rating: string,
    profile_picture: string,
}

interface Mission {
    id: number,
    owner_id: number,
    status: number
}

function Home () {

    const [Association, setAssociation] = useState<Association>({
        id: 0,
        name: "", 
        rating: "",
        profile_picture: "",
    })

    const [PastMissions, setPastMissions] = useState<Mission[]>([])
    const [NextMissions, setNextMissions] = useState<Mission[]>([])
    const [SavedMissions, setSavedMissions] = useState<Mission[]>([])

    useEffect(() => {
        fetch(`${config.apiUrl}/associations/profile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.association)
                    setAssociation(data.association)
                })
            }
        })

        fetch(`${config.apiUrl}/missions/association/all/missions`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    data.map((mission: Mission) => {
                        console.log(mission.status)
                        if (mission.status === 0) {
                            setSavedMissions((prev) => [...prev, mission])
                        } else if (mission.status === 1) {
                            setNextMissions((prev) => [...prev, mission])
                        } else if (mission.status === 3) {
                            setPastMissions((prev) => [...prev, mission])
                        }
                    })
                })
            }
        })
    }, [])


    function noDuplicates(array: Mission[]) : Mission[] {
        let newArray: Mission[] = []
        // remove duplicates by Mission.id and not Mission.owner_id
        array.map((mission: Mission) => {
            if (!newArray.find((item) => item.id === mission.id)) {
                newArray.push(mission)
            }
        })
        return newArray
    }

    return (
        <div className="home-container">
            <div className="header-container-association" style={{height: '20%', maxHeight: '200px'}}>
                <div className="header-left-association">
                    <div className="header-picture">
                        <img src={Association.profile_picture} alt="profile_picture" className="profile-picture" />
                    </div>
                    <div className={"header-rating" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")}>
                        <h2 className="asso-rating"> {Association.rating} / 5 </h2>
                    </div>
                    <h1> {Association.name} </h1>
                </div>
                <div className="header-right-association">
                    <Button 
                        variant="contained"
                        className="new-mission"
                        style={{
                            backgroundColor: '#67A191',
                            color: '#FFFEFF',
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            width: '100%',
                            height: '100%',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={() => {window.location.href = 'missionCreation'}}
                    > 
                        Nouvelle Mission
                    </Button>
                </div>
            </div>
            <div className="body-container" style={{flex: 2}}>
                <div className="body-row">
                    <h2> Prochaines missions </h2>
                    {
                        (NextMissions.length === 0) ? (
                            <h3 className="no-mission"> Aucune mission prévue </h3>
                        ) : (
                            <div className="missions-container">
                                {
                                    noDuplicates(NextMissions).map((mission: Mission) => {
                                        return (
                                            <div className="missions-row">
                                                <HomeMisssionCard
                                                    mission={mission.id}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="body-row">
                    <h2> Missions sauvegardées </h2>
                    {
                        (SavedMissions.length === 0) ? (
                            <h3 className="no-mission"> Aucune mission sauvegardée </h3>
                        ) : (
                            <div className="missions-container">
                                {
                                    noDuplicates(SavedMissions).map((mission: Mission) => {
                                        return (
                                            <div className="missions-row">
                                                <HomeMisssionCard
                                                    mission={mission.id}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="body-row">
                    <h2> Missions passées </h2>
                    {
                        (PastMissions.length === 0) ? (
                            <h3 className="no-mission"> Aucune mission passée </h3>
                        ) : (
                            <div className="missions-container">
                                {
                                    noDuplicates(PastMissions).map((mission: Mission) => {
                                        return (
                                            <div className="missions-row">
                                                <HomeMisssionCard
                                                    mission={mission.id}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
