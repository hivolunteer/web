import { useState, useEffect } from "react";
import config from "../../../config";
import './FollowAssociation.scss';
import AssociationCard from "./AssociationCard";

export default function FollowAssociation() {
    
    const [associations, setAssociations] = useState<number[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/follows/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response: any) => {
            if (response.status === 200) {
                response.json().then((data: any) => {
                    console.log(data)
                    setAssociations(data);
                })
            }
        })
    }, [])

    return (
        <div className="follow-association-container">
            <h1>Associations Suivies</h1>
            <div>
                {
                    associations.length === 0 ? <h2> Vous ne suivez aucune association </h2> :
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        associations.map((association: any) => {
                            return(
                                <div style={{width: '100%', height: '100%'}}>
                                    <AssociationCard id={association.association_id} />
                                </div>
                            )
                        })
                    }
                    </div>
                }
            </div>
        </div>
    )
}