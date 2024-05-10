import MissionCard from "../../../../components/MissionCard";
import MissionCardHome from "../../../../components/MissionCardHome";
import { Mission } from "../../../../interfaces";
import '../Search.scss'

interface MissionPanelProps {
    missionList: Array<Mission>;
    filteredMissions: Array<Mission>;
    search: string;
    location_search: string;
    locations: {[key: number]: string};
}

function MissionPanel(props: MissionPanelProps) {

    const { missionList, filteredMissions, search, location_search, locations } = props;

    return (
        <div className="missions-container">
            {missionList
              .filter(
                (mission: Mission) =>
                  (filteredMissions.length === 0 ||
                    filteredMissions.some(
                      (filteredMission: Mission) =>
                        mission.id === filteredMission.id
                    )) &&
                  mission.title.toLowerCase().includes(search.toLowerCase())
                  && (locations[mission.location] ? locations[mission.location].toLowerCase().includes(location_search.toLowerCase()) : false)
              )
              .map((mission: Mission) => (
                <div className="mission-card" key={mission.id}>
                  <MissionCardHome mission={mission} />
                </div>
              ))}
          </div>
    )
}

export default MissionPanel;