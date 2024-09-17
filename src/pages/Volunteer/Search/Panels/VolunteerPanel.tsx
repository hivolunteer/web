import { useEffect, useState } from "react";
import { Volunteer } from "../../../../interfaces";
import VolunteerCard from "../Cards/VolunteerCard";
import { VolunteerPage } from "../Interfaces";


function VolunteerPanel(props: {volunteerPages: Array<VolunteerPage>}) {

    const { volunteerPages } = props;

    const [max_page, setMaxPage] = useState<number>(1)
    const [actual_page, setActualPage] = useState<number>(1)
    const [novolunteerFound, setNovolunteerFound] = useState<boolean>(false)

    useEffect(() => {
        if (volunteerPages.length === 0)
            setNovolunteerFound(true)
        else {
            setNovolunteerFound(false)
            setMaxPage(volunteerPages.length)
        }
    }, []);

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
            {
                (novolunteerFound) ?
                    <p>
                        Aucun bénévole correspond à vos critères de recherche
                    </p>
                    :
                    volunteerPages.filter((page: VolunteerPage) => page.page === actual_page)
                        .map((page: VolunteerPage) => {
                            return (
                              <div style={{display: 'flex', flexWrap: 'wrap', width: '90%', justifyContent: 'center'}}>
                                    {
                                        page.volunteers.map((volunteer: Volunteer) => {
                                            return (
                                              <div key={volunteer.id} style={{margin: '25px', width: '25%'}}>
                                                    <VolunteerCard volunteer={volunteer} />
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
              <div className="pagination-style">
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

export default VolunteerPanel;