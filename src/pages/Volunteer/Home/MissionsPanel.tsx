import React, { useEffect, useState } from "react";
import "./MissionsPanel.scss";
import config from "../../../config";
import MissionsList from "./MissionListComponent";
import { Mission } from "../../../interfaces";
import { get } from "http";

function MissionsPanel() {
    const [nextMissions, setNextMissions] = useState<Mission[]>([]);
    const [friendsMissions, setFriendsMissions] = useState<Mission[]>([]);
    const [followingMissions, setFollowingMissions] = useState<Mission[]>([]);

    async function getMission(missions: any[]) {
        let new_missions: Mission[] = [];

        await Promise.all(missions.map(async (mission) => {
            let new_mission: Mission;
            if (mission.is_association) {
                const response = await fetch(`${config.apiUrl}/missions/association/${mission.id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    new_mission = data.association_mission;
                    new_missions.push(new_mission);
                }
            } else {
                const response = await fetch(`${config.apiUrl}/missions/close/${mission.id}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    new_mission = data.close_mission;
                    new_missions.push(new_mission);
                }
            }
        }));

        return new_missions.slice(0, 4);
    }

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/home`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(async (data) => {
                    console.log("MISSION PANEL DATA: ", data)
                    const next_missions = data.next_missions
                    setNextMissions(await getMission(next_missions));
                    console.log("NEXT MISSIONS: ", nextMissions)
                    const friends_missions = data.friends_missions
                    setFriendsMissions(await getMission(friends_missions));
                    console.log("FRIENDS MISSIONS: ", friendsMissions)
                    const following_missions = data.associations_missions
                    setFollowingMissions(await getMission(following_missions));
                })
            }
        })
    }, []);

    return (
        <div className="component-missions-panel-container">
            <div className="component-missions-panel-missions">
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Mes missions</p>
                    <a href="/accueil?mymission=true" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {(nextMissions && nextMissions.length === 0) ? (
                    <p className="component-missions-panel-no-mission">Tu n'es inscrit à aucune mission 😓</p>
                ) : (
                    <MissionsList missions={nextMissions} />
                )}
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Que font mes amis ?</p>
                    <a href="/accueil?friendsmission=true" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {(friendsMissions && friendsMissions.length === 0) ? (
                    <p className="component-missions-panel-no-mission">Tes amis ne sont inscrits à aucune mission 😓</p>
                ) : (
                    <MissionsList missions={friendsMissions} />
                )}
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Que font les associations que je suis ?</p>
                    <a href="/accueil?missionsassociationfollowed=true" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {(followingMissions && followingMissions.length === 0) ? (
                    <p className="component-missions-panel-no-mission">Rien de nouveau du côté des associations que vous suivez</p>
                ) : (
                    <MissionsList missions={followingMissions} />
                )}
            </div>
        </div>
    );
}

export default MissionsPanel;