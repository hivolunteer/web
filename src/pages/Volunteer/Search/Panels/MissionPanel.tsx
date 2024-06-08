import { useEffect, useState } from "react";
 import MissionCardHome from "../../../../components/MissionCardHome";
import '../Search.scss'
import { MissionComplete, PageMission } from "../Interfaces";
import { Mission } from "../../../../interfaces";

function MissionPanel(props: {missions: Array<PageMission>}) {

    const {missions} = props;
    const [max_page, setMaxPage] = useState<number>(1)
    const [actual_page, setActualPage] = useState<number>(1)
    const [noMissionFound, setNoMissionFound] = useState<boolean>(false)

    useEffect(() => {
      console.log(missions.length)
      if (missions.length === 0)
        setNoMissionFound(true)
      else {
        setNoMissionFound(false)
        setMaxPage(missions.length)
      }
    }, [missions])

    return (
        <div className="missions-container">
          {/* {
            (noMissionFound === false) ?
              pages.filter((page: PageMission) => page.page === actual_page)
              .map((page: PageMission) => {
                return (
                  <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                      page.missions.map((mission: MissionComplete) => {
                        return (
                          <div className="mission_card" key={mission.id} style={{margin: '25px'}}>
                            <MissionCardHome mission={mission as Mission} />
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
          } */}
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {
              (noMissionFound) ?
                <p>
                  Aucune mission correspond à vos critères de recherche
                </p>
              :
                missions.filter((page: PageMission) => page.page === actual_page)
                .map((page: PageMission) => {
                  return (
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {
                        page.missions.map((mission: MissionComplete) => {
                          return (
                            <div className="mission_card" key={mission.id} style={{margin: '25px'}}>
                              <MissionCardHome mission={mission as Mission} />
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
            }
          </div>
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