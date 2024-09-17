import { useEffect, useState } from "react";
import AssociationCard from "../Cards/AssociationCard";
import { Association, PageAssoProps } from "../Interfaces"

function AssociationPanel(props: {assoPages: Array<PageAssoProps>}) {

    const {assoPages} = props;
    const [noAssociationFound, setNoAssociationFound] = useState<boolean>(false)
    const [max_page, setMaxPage] = useState<number>(1)
    const [actual_page, setActualPage] = useState<number>(1)
    const [noMissionFound, setNoMissionFound] = useState<boolean>(false)


    useEffect(() => {
      console.log(assoPages.length)
      if (assoPages.length === 0)
        setNoMissionFound(true)
      else {
        setNoMissionFound(false)
        setMaxPage(assoPages.length)
      }
    }, [assoPages])

    return(
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
          {
            (noAssociationFound) ?
              <p>
                Aucune association correspond à vos critères de recherche
              </p>
            :
            assoPages.filter((page: PageAssoProps) => page.page === actual_page)
            .map((page: PageAssoProps) => {
              return (
                <div style={{display: 'flex', flexWrap: 'wrap', width: '90%', justifyContent: 'center'}}>
                  {
                    page.associations.map((association: Association) => {
                      return (
                        <div key={association.id} style={{margin: '25px', width: '25%'}}>
                          <AssociationCard
                            association_id={association.id}
                          />
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
          <div className='pagination-style'>
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

export default AssociationPanel