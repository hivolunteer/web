import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Alert, Grid, IconButton, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from "react-router-dom";
import config from "../../../../config";
import HoverRating from "../../../../components/rating";
import './ManageMissionVolunteers.scss';

interface Volunteer {
    id: number,
    first_name: string,
    last_name: string,
    profile_picture: string,
    status: number,
}

type VolunteerCardProps = {
    volunteer: Volunteer,
    is_premium: boolean,
    onAccept: any,
    onRefuse: any,
    MissionStatus: number,
    MissionEndDate: Date,
    onInfoChange: (id: number, rating: number, comment: string) => void;
    preFilledRating?: number | null;
    preFilledComment?: string;
}

function VolunteerCard(props: VolunteerCardProps) {
    const mission_id = useParams().id;
    const { volunteer, is_premium, onAccept, onRefuse, MissionStatus, MissionEndDate, onInfoChange, preFilledRating, preFilledComment } = props;

    const [comment, setComment] = useState<string>(preFilledComment || "");
    const [rating, setRating] = useState<number | null>(preFilledRating || null);
    const [response, setResponse] = useState<{ error: boolean, message: string }>({ error: false, message: "" });

    const [expirationDate, setExpirationDate] = useState<Date | null>(null);

    useEffect(() => {
        setComment(preFilledComment || "");
        setRating(preFilledRating || null);
    }, [preFilledComment, preFilledRating]);

    
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
      onInfoChange(volunteer.id, rating!, e.target.value);
    };

    const handleRatingChange = (newRating: number) => {
      setRating(newRating);
      onInfoChange(volunteer.id, newRating, comment || "");
    };

    const handleValidate = () => {
        fetch(`${config.apiUrl}/missions/volunteer/rate_volunteer/${mission_id}/${volunteer.id}`, {
            method: "POST",
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ stars: rating, comment: comment }),
        })
        .then((data) => {
            if (data.status === 201) {
                setResponse({ error: false, message: "Note soumise avec succès" });
            } else {
                setResponse({ error: true, message: "Échec de soumission de la note" });
            }
        })
        .catch((error) => {
            setResponse({ error: true, message: "ne erreur s'est produite : " + error.message });
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setResponse({ error: false, message: "" });
        }, 5000);
        return () => clearTimeout(timer);
    }, [response]);

    useEffect(() => {
        if (MissionStatus === 3) {
            const expiration = new Date(MissionEndDate);
            expiration.setMonth(expiration.getMonth() + 1);
            setExpirationDate(expiration);
        }
    }, [MissionStatus, MissionEndDate]);

    const isExpired = expirationDate ? new Date() > expirationDate : false;

    return (
        <div className="association-manage-mission-volunteer-card">
            <div className="association-manage-mission-volunteer-card-picture-container">
                <img className="association-manage-mission-volunteer-card-picture" src={volunteer.profile_picture} alt="profile_picture" />
            </div>
            <div className="association-manage-mission-volunteer-card-information" onClick={() => window.location.href = `/volunteer/${volunteer.id}`}>
                <p>{volunteer.first_name} {volunteer.last_name}</p>
            </div>
            {MissionStatus === 3 && (
                <div className="volunteer-comment-rating">
                    {!isExpired ? (
                        <>
                            <TextField
                                label="Enter your comment"
                                value={comment}
                                onChange={handleCommentChange}
                                fullWidth
                                multiline
                            />
                            <HoverRating value={preFilledRating || 0} onInfoChange={handleRatingChange} />
                            <Button variant="contained" color="primary" onClick={handleValidate}>
                                Valider
                            </Button>
                            {response.message && (
                                <Alert severity={response.error ? "error" : "success"}>{response.message}</Alert>
                            )}
                        </>
                    ) : (
                        <div className="expired-rating-comment">
                            <div className="expired-comment">
                                <h4>Dernier commentaire:</h4>
                                <p className="last-rating">{preFilledComment}</p>
                            </div>
                            <div className="expired-rating">
                                <h4>Dernière note:</h4>
                                <p className="last-comment">{preFilledRating}</p>
                            </div>
                            <Alert severity="error">La période de commentaire et de notation a expiré. Vous ne pouvez plus soumettre de commentaire ou de note.</Alert>
                        </div>
                    )}
                </div>
            )}
            {is_premium && MissionStatus === 1 && (
                <div className="association-manage-mission-volunteer-card-action">
                    <IconButton onClick={() => onAccept(volunteer.id)}>
                        <CheckIcon color="success" />
                    </IconButton>
                    <IconButton onClick={() => onRefuse(volunteer.id)}>
                        <CloseIcon color="error" />
                    </IconButton>
                </div>
            )}
        </div>
    );
}

type ManageMissionVolunteersProps = {
    mission_id: string | undefined,
    MissionStatus: number,
    MissionEndDate: Date
}

function ManageMissionVolunteers(props: ManageMissionVolunteersProps) {
    const [ListVolunteers, setListVolunteers] = useState<Volunteer[]>([]);
    const [response, setResponse] = useState<{ error: boolean, message: string }>({ error: false, message: "" });
    const mission_id = props.mission_id;
    const MissionStatus = props.MissionStatus;
    const MissionEndDate = props.MissionEndDate;

    const [allComments, setAllComments] = useState<{ [key: number]: string }>({});
    const [allRatings, setAllRatings] = useState<{ [key: number]: number | null }>({});

    const [expirationDate, setExpirationDate] = useState<Date | null>(null);

    const handleValidateAll = () => {
        const reviewList = ListVolunteers?.map((volunteer) => {
            return {
                volunteer_id: volunteer.id,
                comment: allComments[volunteer.id] || "",
                rate: allRatings[volunteer.id] || 0,
            };
        });

        fetch(`${config.apiUrl}/missions/volunteer/rate_group_volunteer/${mission_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ reviewList }),
        }).then((data) => {
            if (data.status === 201) {
                setResponse({ error: false, message: "Rating submitted successfully" });
            } else {
                setResponse({ error: true, message: "Failed to submit rating" });
            }
        }).catch((error) => {
            setResponse({ error: true, message: "An error occurred: " + error.message });
        });
    };

    const handleInfoChange = (id: number, rating: number, comment: string) => {
        setAllRatings((prev) => ({ ...prev, [id]: rating }));
        setAllComments((prev) => ({ ...prev, [id]: comment }));
    };

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/${mission_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setListVolunteers(data)
                })
            }
        })
    }, [mission_id]);

    function acceptVolunteer(id: number) {
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/accept`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setResponse({ error: false, message: "Le bénévole a bien été accepté" });
                setListVolunteers(ListVolunteers.map(volunteer => volunteer.id === id ? { ...volunteer, status: 1 } : volunteer));
            } else {
                setResponse({ error: true, message: "Une erreur est survenue lors de l'acceptation du bénévole" });
            }
        })
    }

    function refuseVolunteer(id: number) {
        fetch(`${config.apiUrl}/missions/association/${mission_id}/${id}/refuse`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                setResponse({ error: false, message: "Le bénévole a bien été refusé" });
                // on ListVolunteers, remove the volunteer
                setListVolunteers(ListVolunteers.filter(volunteer => volunteer.id !== id));
            } else {
                setResponse({ error: true, message: "Une erreur est survenue lors du refus du bénévole" });                
            }
        })
    }

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/all/rate/${mission_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch all ratings and comments');
            }
        })
        .then((data) => {
            const ratings: { [key: number]: number | null } = {};
            const comments: { [key: number]: string } = {};
            
        
            data.forEach((item: any) => {
                comments[item.volunteer_id] = item.comment_from_association;
                ratings[item.volunteer_id] = item.stars_from_association;
            });
    
            setAllRatings(ratings);
            setAllComments(comments);
        })
        .catch((error) => {
            console.error('Error fetching all ratings and comments:', error);
        });
    }, [mission_id]);

    useEffect(() => {
        if (MissionStatus === 3) {
            const expiration = new Date(MissionEndDate);
            expiration.setMonth(expiration.getMonth() + 1);
            setExpirationDate(expiration);
        }
    }, [MissionStatus, MissionEndDate]);

    const isExpired = expirationDate ? new Date() > expirationDate : false;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setResponse({ error: false, message: "" });
        }, 5000);
        return () => clearTimeout(timer);
    }, [response]);

    return (
        <div className='association-manage-mission-volunteers-container'>
            <div className="accordion-container">
                <Accordion className="association-manage-mission-accordion" defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Gestion des participants
                    </AccordionSummary>
                    {!isExpired ? (
                        <AccordionActions>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className="validate-all-button"
                                onClick={() => { handleValidateAll(); }}
                            >
                                Valider tous les notes et commentaires
                            </Button>
                        </AccordionActions>
                    ) : null }
                    {response.message && (
                        <Alert severity={response.error ? "error" : "success"}>{response.message}</Alert>
                    )}
                    <AccordionDetails>
                        <div className="association-manage-mission-volunteers-list-container">
                            { MissionStatus !== 1 ?
                                ListVolunteers.length === 0 ?
                                    <p>Aucun participant</p>
                                    :
                                    ListVolunteers.map((volunteer) => {
                                        return (
                                            <VolunteerCard
                                            key={volunteer.id}
                                            volunteer={volunteer}
                                            is_premium={false}
                                            onAccept={acceptVolunteer}
                                            onRefuse={refuseVolunteer}
                                            MissionStatus={MissionStatus}
                                            MissionEndDate={MissionEndDate}
                                            onInfoChange={handleInfoChange}
                                            preFilledRating={allRatings[volunteer.id]}
                                            preFilledComment={allComments[volunteer.id]}
                                        />
                                    )
                                })
                            :
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <h2>Participants en attente</h2>
                                        <div className="association-manage-mission-volunteers-list-container">
                                            { ListVolunteers.length === 0 ?
                                                <p>Aucun participant en attente</p>
                                                :
                                                ListVolunteers.map((volunteer) => {
                                                    if (volunteer.status === 0) {
                                                        return (
                                                            <VolunteerCard
                                                                key={volunteer.id}
                                                                volunteer={volunteer}
                                                                is_premium={true}
                                                                onAccept={acceptVolunteer}
                                                                onRefuse={refuseVolunteer}
                                                                MissionStatus={MissionStatus}
                                                                MissionEndDate={MissionEndDate}
                                                                onInfoChange={handleInfoChange}
                                                                preFilledRating={allRatings[volunteer.id]}
                                                                preFilledComment={allComments[volunteer.id]}
                                                            />
                                                        )
                                                    }
                                                    return null
                                                })
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <h2>Participants acceptés</h2>
                                        <div className="association-manage-mission-volunteers-list-container">
                                            { ListVolunteers.length === 0 ?
                                                <p>Aucun participant accepté</p>
                                                :
                                                ListVolunteers.map((volunteer) => {
                                                    if (volunteer.status === 1) {
                                                        return (
                                                            <VolunteerCard
                                                                key={volunteer.id}
                                                                volunteer={volunteer}
                                                                is_premium={false}
                                                                onAccept={acceptVolunteer}
                                                                onRefuse={refuseVolunteer}
                                                                MissionStatus={MissionStatus}
                                                                MissionEndDate={MissionEndDate}
                                                                onInfoChange={handleInfoChange}
                                                                preFilledRating={allRatings[volunteer.id]}
                                                                preFilledComment={allComments[volunteer.id]}
                                                            />
                                                        )
                                                    }
                                                    return null
                                                })
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
        {response.message && (
            <Alert severity={response.error ? "error" : "success"}>{response.message}</Alert>
        )}
    </div>
);
}

export default ManageMissionVolunteers;
                 
