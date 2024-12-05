import { useEffect, useState } from "react"
import config from "../../../config"
import { Rating } from "@mui/material"

interface AssociationCommentaryProps {
    id: string
}

interface AssociationRating {
    comment_from_association: string,
    stars_from_association: number
}

export default function AssociationCommentary(props: AssociationCommentaryProps) {

    const {id} = props

    const [rating, setRating] = useState<AssociationRating>({
        comment_from_association: "NO COMMENT",
        stars_from_association: 0
    })

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/association_rate/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((data: any) => {
                console.log(data[0])
                setRating(data[0])
            })
    }, [id])

    return (
        <div className="mission-details-content-center">
            <h2>
                Commentaire de l'association
            </h2>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                {
                    (rating?.comment_from_association === "NO COMMENT" && rating?.stars_from_association === 0) ?
                        <p>
                            Aucun commentaire de l'association
                        </p>
                        :
                        <div className="mission-rating">
                            <Rating
                                readOnly
                                precision={0.5}
                                name="simple-controlled"
                                value={rating?.stars_from_association}
                            />
                            <p style={{fontWeight: 'bold'}}>
                                {rating?.comment_from_association}
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}