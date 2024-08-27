import MissionCardHome from "./MissionCardHome";
import './MissionListComponent.scss'
import { Mission } from "../interfaces";
import isToday from "../functions/isToday";

function MissionsList(props: {missions: Mission[]}) {
    const missions = props.missions;

    return (
        <div className="component-missions-list-missions">
            {missions.map((mission: Mission) => (
                <div className="component-missions-list-mission" key={mission.id}>
                    <MissionCardHome mission={mission} isToday={isToday(mission.start_date)} />
                </div>
            ))}
        </div>
    );
}

export default MissionsList;