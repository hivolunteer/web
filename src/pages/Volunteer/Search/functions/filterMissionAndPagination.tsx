import { Mission } from "../../../../interfaces";
import { FilterMissionProps, MissionComplete, PageMission } from "../Interfaces";

function filterMissionAndPagination(props: FilterMissionProps ) {

  if (props.filteredMissions.length === 0 && props.searched === true) {
    return [];
  } else {
    let missions = props.missionList
        .filter((mission: MissionComplete) =>
          (props.filteredMissions.length === 0 ||
              props.filteredMissions.some(
            (filteredMission: MissionComplete) =>
              mission.id === filteredMission.id
          )) &&
          mission.title.toLowerCase().includes(props.search.toLowerCase())
          && (props.locations[mission.location] ? props.locations[mission.location].toLowerCase().includes(props.location_search.toLowerCase()) : false)
      )

    if (missions.length === 0)
    return [];
    let x = 0;
    let page = 1;
    let displayMissions : Array<PageMission> = []
    missions.forEach((mission: any) => {
    if (x === 50) {
    x = 0;
    page += 1;
    }
    if (x === 0)
    displayMissions.push({page: page, missions: []})
    displayMissions[page - 1].missions.push(mission)
    x++
    })
    return displayMissions;
  }
}

export default filterMissionAndPagination