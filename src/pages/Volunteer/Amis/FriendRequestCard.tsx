import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import {Mission, Volunteer} from '../../../interfaces';
import ProfileDefaultPicture from "../../../images/logo/submark.png";
import config from "../../../config";
import {useEffect, useState} from "react";

interface FriendRequestCardProps {
    volunteer: Volunteer,
    isPending: boolean;
}

export default function FriendRequestCard(props: FriendRequestCardProps) {
    const [friendshipStatus, setFriendshipStatus] = useState<number>(0);
    const { volunteer } = props;

    const handleAcceptFriendRequest = () => {
        fetch(`${config.apiUrl}/friends/accept/${volunteer.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id: localStorage.getItem("id") })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setFriendshipStatus(1);
            })
            .catch(error => {
                console.error("Error accepting friend request:", error);
            });
    };

    const handleDenyFriendRequest = () => {
        fetch(`${config.apiUrl}/friends/deny/${volunteer.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id: localStorage.getItem("id") })
        })
            .then((response) => response.json())
            .then(data => {
                setFriendshipStatus(2);
            })
            .catch(error => {
                console.error("Error denying friend request:", error);
            });
    };

    const handleWithdrawRequest = () => {
        fetch(`${config.apiUrl}/friends/remove/${volunteer.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id: localStorage.getItem("id") })
        })
            .then((response) => response.json())
            .then(data => {
                setFriendshipStatus(3);
            })
            .catch(error => {
                console.error("Error withdrawing friend request:", error);
            });
    }

    return (
        <div>
                <Card
                sx={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <CardMedia
                    component="img"
                    height="185"
                    image={volunteer.profile_picture ? volunteer.profile_picture : ProfileDefaultPicture}
                    alt="Volunteer profile picture"
                />
                <CardContent
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.70)",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                </CardContent>
                <CardContent
                    sx={{
                        backgroundColor: 'white',
                        minHeight: '50px',
                        maxHeight: '100px'
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        color="#2D2A32"
                        fontWeight={550}
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        {volunteer.first_name} {volunteer.last_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <div style={{
                        margin: 'auto',
                        marginBottom: '10px',
                    }}>
                        {props.isPending ? (
                            <>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleAcceptFriendRequest}
                                        sx={{ color: 'white' }}
                                    >
                                        {friendshipStatus === 1 ? "Confirmé" : "Confirmer"}
                                    </Button>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        size="medium"
                                        color="secondary"
                                        onClick={handleDenyFriendRequest}
                                        variant="contained"
                                        sx={{ color: 'white' }}
                                    >
                                        {friendshipStatus === 2 ? "Refusé" : "Refuser"}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div style={{ width: '100%', display: ' flex', justifyContent: 'center' }}>
                                <Button
                                    size="medium"
                                    color="secondary"
                                    onClick={handleWithdrawRequest}
                                    variant="contained"
                                    sx={{ color: 'white' }}
                                >
                                    {friendshipStatus === 3 ? "Retiré" : "Retirer"}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}