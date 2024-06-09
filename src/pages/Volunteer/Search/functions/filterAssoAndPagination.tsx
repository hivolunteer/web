import { Mission } from "../../../../interfaces";
import { Association, PageAssoProps, filterAssoProps } from "../Interfaces";

function filterAssoAndPagination(props: filterAssoProps ) {
  if (props.filteredAssociations.length === 0 && props.searched == true)
    return []
  else {
    let associations = props.associationList
        .filter((association: Association) => (
          props.filteredAssociations.length === 0 ||
          props.filteredAssociations.some(
            (filteredAssociation: Association) =>
              association.id === filteredAssociation.id
          )
        ) && association.name.toLowerCase().includes(props.search.toLowerCase())
      )

    if (associations.length === 0)
      return []
    let x = 0;
    let page = 1;
    let displayAssociations : Array<PageAssoProps> = []
    associations.forEach((association: any) => {
      if (x === 50) {
        x = 0;
        page += 1;
      }
      if (x === 0)
        displayAssociations.push({page: page, associations: []})
      displayAssociations[page - 1].associations.push(association)
      x++
    })
    return displayAssociations;
  }
}

export default filterAssoAndPagination