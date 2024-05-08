import { Card, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import config from "../../../../config";

interface ReturnModalProps {
    open: boolean;
    handleClose: () => void;
    mission_id: string | undefined;
}

interface Comment {
    rate: number,
    comment: string
}

function ReturnComments(props: {mission_id: string | undefined}) {
    const [averageRating, setAverageRating] = useState<number>(0);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association/rate/${props.mission_id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setAverageRating(data.rate_average);
                    setComments(data.comments)
                })
            }
        })
    }, [])

    return (
        <div>
            <h2 style={{textAlign: 'center', textDecoration: 'underline'}}>Notes et Commentaires</h2>
            <p style={{fontWeight: 'bold', marginLeft: '10px'}}> <span style={{textDecoration: 'underline'}}> Note moyenne :</span> {averageRating}</p>
            <p style={{fontWeight: 'bold', textDecoration: 'underline', marginLeft: '10px'}}>Commentaires :</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch'}}>
            {
                comments.map((comment, index) => {
                return (
                    <Card key={index} style={{margin: '1rem', padding: '1rem', width: '20%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <p> <span style={{textDecoration: 'underline', fontWeight: 'bold', marginRight: '10px'}}> Note : </span>{comment.rate}</p>
                    <p style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}><span style={{textDecoration: 'underline', fontWeight: 'bold', marginRight: '10px'}}> Commentaire : </span> {comment.comment}</p>
                    </Card>
                )
                })
            }
            </div>
        </div>
    )
}

export default ReturnComments;