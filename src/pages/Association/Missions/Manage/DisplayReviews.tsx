import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../../../config";

interface Review {
    anonymous: boolean;
    comment: string;
}

function DisplayReviews() {
    // Simuler les données d'évaluation des bénévoles (à remplacer par un appel API)
    const [reviews, setReviews] = useState<Review[]>([
        { anonymous: true, comment: "Très bonne expérience, mission enrichissante !" },
        { anonymous: false, comment: "Merci pour l'opportunité, mais l'organisation peut être améliorée." },
        { anonymous: true, comment: "L'accueil était chaleureux et l'équipe très sympathique." },
    ]);

    const { missionId } = useParams<{ missionId: string }>();

    const [averageRating, setAverageRating] = useState<number>(4.5); // Par exemple, la moyenne des notes

    /*useEffect(() => {
        fetch(`${config.apiUrl}/missions/${missionId}/reviews`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des avis :", error);
            });
        // setReviews(data);
        // setAverageRating(calculatedAverage);
    }, [missionId]);*/


    return (
        <div className='association-manage-mission-volunteers-container'>
            <div className="accordion-container">
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Notes de bénévoles et commentaires</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" gutterBottom>
                            Moyenne des notes : {averageRating} / 5
                        </Typography>

                        <Box
                            sx={{
                                maxHeight: '500px',
                                overflowY: 'auto',
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <Box key={index} sx={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.anonymous ? "Bénévole anonyme" : "Bénévole"} :
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontStyle: review.anonymous ? 'italic' : 'normal' }}>
                                            {review.comment}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Aucun commentaire disponible.
                                </Typography>
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}

export default DisplayReviews;
