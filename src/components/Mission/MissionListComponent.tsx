import MissionCard from "./MissionCardComponent";
import './MissionListComponent.scss'

function MissionsList(props: {missions: any[]}) {
    const missions = props.missions;
    return (
        <div className="component-missions-list-missions">
            {missions.map((mission) => {
                return (
                    <div className="component-missions-list-mission" key={mission.id}>
                        <MissionCard mission={mission} />
                    </div>
                )
            })}
        </div>
    );
}

export default MissionsList;