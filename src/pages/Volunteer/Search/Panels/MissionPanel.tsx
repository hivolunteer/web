import { useEffect, useState } from "react";
import MissionCardHome from "../../../../components/MissionCardHome";
import { Mission } from "../../../../interfaces";
import '../Search.scss'

interface MissionPanelProps {
    missionList: Array<Mission>;
    filteredMissions: Array<Mission>;
    search: string;
    location_search: string;
    locations: {[key: number]: string};
    searched: boolean
}

interface PageMission {
  missions: Array<Mission>;
  page: number;
}

function MissionPanel(props: MissionPanelProps) {

    const { missionList, filteredMissions, search, location_search, locations, searched } = props;

    const [max_page, setMaxPage] = useState<number>(1)
    const [pages, setPages] = useState<Array<PageMission>>([])
    const [actual_page, setActualPage] = useState<number>(1)
    const [noMissionFound, setNoMissionFound] = useState<boolean>(false)

    useEffect(() => {

      function filterAndPageMissions() {
        if (noMissionFound) return;
        let missions = missionList
          .filter((mission: Mission) =>
            (filteredMissions.length === 0 ||
              filteredMissions.some(
              (filteredMission: Mission) =>
                mission.id === filteredMission.id
            )) &&
            mission.title.toLowerCase().includes(search.toLowerCase())
            && (locations[mission.location] ? locations[mission.location].toLowerCase().includes(location_search.toLowerCase()) : false)
        )

        if (missions.length === 0)
          setNoMissionFound(true)
        else {
          let page_number = Number(Number(missions.length / 50).toString().split('.')[0])
          setMaxPage(page_number + 1)
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
          setPages(displayMissions)
        }
      }

      setNoMissionFound(filteredMissions.length === 0 && props.searched === true)
      filterAndPageMissions()
    }, [searched, search, location_search, filteredMissions])

    return (
        <div className="missions-container">
          {
            (noMissionFound === false) ?
              pages.filter((page: PageMission) => page.page === actual_page)
              .map((page: PageMission) => {
                return (
                  <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                      page.missions.map((mission: Mission) => {
                        return (
                          <div className="mission_card" key={mission.id} style={{margin: '25px'}}>
                            <MissionCardHome mission={mission} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            :
              <p>
                Aucune mxission correspond à vos critéres de recherche
              </p>
          }
          {
            max_page > 1 && (
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                {
                  Array.from(Array(max_page).keys()).map((index) => (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: index + 1 === actual_page ? '#FFD700' : '#000000',
                        margin: '0 5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: index + 1 === actual_page ? '#000000' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                      onClick={() => setActualPage(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
    )
}

export default MissionPanel;