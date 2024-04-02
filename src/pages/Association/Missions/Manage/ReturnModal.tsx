import { Dialog } from "@mui/material";
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

function ReturnModal (props: {modalProps: ReturnModalProps}) {
    const modalProps = props.modalProps;

    const [averageRating, setAverageRating] = useState<number>(0);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association/rate/${modalProps.mission_id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setAverageRating(data.rate_average);
                    setComments(data.comments);
                })
            }
        })
    }, [])

    return (
        <Dialog open={modalProps.open} onClose={modalProps.handleClose} fullWidth maxWidth='xl'
        sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            margin: 'auto  20%',
        }}
        >
            <div style={{margin: 'auto 10%'}}>
                <div className="modal_title">
                    <p> Retours de la mission </p>
                </div>
                <div>
                    <p> <a style={{fontWeight: 'bolder'}}> Note moyenne de la mission </a> : {averageRating} </p>
                </div>
                <div className="modal_comments">
                    <p> <a style={{fontWeight: 'bolder'}}> Nombre de commentaires </a> : {comments.length} </p>
                </div>
                <div className="modal_comments">
                    <p> <a style={{fontWeight: 'bolder'}}> {(comments.length === 1) ? "Commentaire" : "Commentaires" }  </a> : </p>
                    <ul>
                        {comments.map((comment, index) => {
                            return (
                                <div key={index} className="comment">
                                    <p> <a style={{fontWeight: 'bolder'}}> Note </a> : {(comment.rate === 0) ? "Non noté" : comment.rate} </p>
                                    <p> <a style={{fontWeight: 'bolder'}}> Commentaire </a> : {(comment.comment === "NO COMMENT") ? "Pas de commentaire" : comment.comment} </p>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Dialog>
    )
}

export default ReturnModal;