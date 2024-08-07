import MissionCardHome from "./MissionCardHome";
import './MissionListComponent.scss'
import { Mission } from "../interfaces";

function MissionsList(props: {missions: Mission[]}) {
    const missions = props.missions;

    return (
        <div className="component-missions-list-missions">
            {missions.map((mission: Mission) => {
                return (
                    <div className="component-missions-list-mission" key={mission.id}>
                        <MissionCardHome mission={mission} />
                    </div>
                )
            })}
        </div>
    );
}

export default MissionsList;