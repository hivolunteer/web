import {useState, useEffect} from "react";
import config from "../../../config";
import RateCard from "./RateCard";


function History() {

    const [missions, setMissions] = useState<number[]>([])
        
    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/passed`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMissions(data.passed_missions)
                })
            }
        })
    }, [])
    
    return (
        <div style={{width: '90%', margin: 'auto 5%'}}>
            <div className="History-Header">
                <h1> Vos Missions Passées </h1>
            </div>
            <div className="History-Body">
                {
                    (missions.length > 0) ? (
                        <div>
                            {
                                missions.map((mission) => {
                                    return (
                                        <div>
                                            <RateCard mission={mission} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div>
                            <p> Vous n'avez pas encore participé à des missions. </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default History