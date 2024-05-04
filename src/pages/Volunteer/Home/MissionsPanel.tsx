import React, { useEffect, useState } from "react";
import "./MissionsPanel.scss";
import config from "../../../config";
import MissionsList from "../../../components/Mission/MissionListComponent";

function MissionsPanel() {
    const [nextMissions, setNextMissions] = useState<any[]>([]);
    const [friendsMissions, setFriendsMissions] = useState<any[]>([]);
    const [followingMissions, setFollowingMissions] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/home`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log("MISSION PANEL DATA: ", data)
                    setNextMissions(data.next_missions)
                    console.log("NEXT MISSIONS: ", data.next_missions)
                    setFriendsMissions(data.friends_missions)
                    setFollowingMissions(data.associations_missions)
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
                {nextMissions.length === 0 ? (
                    <p>Tu n'es inscrit à aucune mission 😓</p>
                ) : (
                    <MissionsList missions={nextMissions} />
                )}
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Que font mes amis ?</p>
                    <a href="/accueil?friendsmission=true" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {friendsMissions.length === 0 ? (
                    <p>Tes amis ne sont inscrits à aucune mission 😓</p>
                ) : (
                    <MissionsList missions={friendsMissions} />
                )}
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Que font les associations que je suis ?</p>
                    <a href="/accueil?missionsassociationfollowed=true" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {followingMissions.length === 0 ? (
                    <p>Rien de nouveau du côté des associations que vous suivez</p>
                ) : (
                    <MissionsList missions={followingMissions} />
                )}
            </div>
        </div>
    );
}

export default MissionsPanel;