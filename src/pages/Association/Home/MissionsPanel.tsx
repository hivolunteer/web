import { useEffect, useState } from "react";
import { Button } from "@mui/material"
import "./MissionsPanel.scss";
import config from "../../../config";
import MissionsList from "../../../components/MissionListComponent"
import { Mission } from "../../../interfaces";

function MissionsPanel() {
    const [nextMissions, setNextMissions] = useState<Mission[]>([]);
    const [draftMissions, setDraftMissions] = useState<Mission[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(async (data) => {
                    console.log("MISSION PANEL DATA: ", data)
                    const next_missions = data.active.slice(0, 4)
                    setNextMissions(next_missions);
                    console.log("NEXT MISSIONS: ", nextMissions)
                    const draft_missions = data.draft.slice(0, 4)
                    setDraftMissions(draft_missions);
                    console.log("FRIENDS MISSIONS: ", draftMissions)
                })
            }
        })
    }, []);

    return (
        <div className="component-missions-panel-container">
            <div className="component-missions-panel-missions">
                <div className="component-missions-panel-button">
                    <Button 
                        variant="contained"
                        className="new-mission"
                        style={{
                            backgroundColor: '#67A191',
                            color: '#FFFEFF',
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            width: '20%',
                            height: '20%',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={() => {window.location.href = 'missionCreation'}}
                    > 
                        Créer une nouvelle mission
                    </Button>
                </div>
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Prochaines missions</p>
                    <a href="/accueil?subType=1" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {(nextMissions && nextMissions.length === 0) ? (
                    <p className="component-missions-panel-no-mission">Tu n'as aucune prochaine mission 😓</p>
                ) : (
                    <MissionsList missions={nextMissions} />
                )}
                <div className="component-missions-panel-title-container">
                    <p className="component-missions-panel-title">Missions brouillon</p>
                    <a href="/accueil?subType=2" className="component-missions-panel-see-all">Voir toutes les missions</a>
                </div>
                {(draftMissions && draftMissions.length === 0) ? (
                    <p className="component-missions-panel-no-mission">Tu n'as aucune mission brouillon 😓</p>
                ) : (
                    <MissionsList missions={draftMissions} />
                )}
            </div>
        </div>
    );
}

export default MissionsPanel;