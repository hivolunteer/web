import AssociationCard from "../Cards/AssociationCard";
import { Association } from "../Interfaces";

interface associationPanelProps {
    associationList: Array<Association>;
    filteredAssociations: Array<Association>;
    search: string;
}

function associationPanel(props: associationPanelProps) {

    const { associationList, filteredAssociations, search } = props;

    return(
    <div className="missions-container">
        {associationList
          .filter(
            (association: Association) =>
              (filteredAssociations.length === 0 ||
                filteredAssociations.some(
                  (filteredAssociation: Association) =>
                    association.id === filteredAssociation.id
                )) &&
              association.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((association: Association) => (
            <div className="mission-card-asso-vol" key={association.id}>
              <AssociationCard association_id={association.id} />
            </div>
          ))}
      </div>
    )
}

export default associationPanel