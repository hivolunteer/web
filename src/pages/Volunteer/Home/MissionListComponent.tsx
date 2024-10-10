import MissionCard from "../../../components/Mission/MissionCardComponent";
import MissionCardHome from "../../../components/MissionCardHome";
import config from '../../../config';
import './MissionListComponent.scss'
import { Mission } from "../../../interfaces";
import { useEffect, useState } from "react";

function MissionsList(props: {missions: Mission[]}) {
    const missions = props.missions;

    return (
        <div className="component-missions-list-missions">
            {missions.map((mission: Mission) => {
                return (
                    <div className="component-missions-list-mission" key={mission.id}>
                        <MissionCardHome mission={mission} isToday={false} />
                    </div>
                )
            })}
        </div>
    );
}

export default MissionsList;