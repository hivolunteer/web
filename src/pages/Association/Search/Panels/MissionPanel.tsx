import MissionCardHome from "../../../../components/MissionCardHome";
import { Mission } from "../../../../interfaces";
import isToday from "../../../../functions/isToday";
import "../Search.scss";

interface MissionPanelProps {
  missionList: Array<Mission>;
  search: string;
}

function MissionPanel(props: MissionPanelProps) {
  const { missionList, search } = props;

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "#ffcc80"; // Orange
      case 1:
        return "#c5e1a5"; // Green
      case 2:
        return "#bdbdbd"; // Grey
      case 3:
        return "#ef9a9a"; // Red
      default:
        return "transparent";
    }
  };

  const filteredMissions = missionList.filter((mission: Mission) =>
    mission.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="missions-container">
      {filteredMissions.map((mission: Mission) => (
        <div className="mission-card" key={mission.id} style={{ marginBottom: '50px' }}>
          <div className="mission-status" style={{ backgroundColor: getStatusColor(mission.status) }}>
            {mission.status === 0 ? "Brouillon" : mission.status === 1 ? "Publiée" : mission.status === 2 ? "Annulée" : "Passée"}
          </div>
          <MissionCardHome mission={mission} isToday={isToday(mission.start_date)} />
        </div>
      ))}
    </div>
  );
}

export default MissionPanel;
