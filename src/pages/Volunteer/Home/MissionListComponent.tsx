import MissionCardHome from "../../../components/MissionCardHome";
import './MissionListComponent.scss'
import { Mission } from "../../../interfaces";

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