import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import ProfileDefaultPicture from "../../../../images/logo/submark.png"
import { useEffect, useState } from 'react';
import config from '../../../../config';


export default function FriendProfileCard(props: {id: Number}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const { id } = props;

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/profile/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("data: ", data);
            setFirstName(data.volunteer.first_name);
            setLastName(data.volunteer.last_name);
            setProfilePicture(data.volunteer.profile_picture);
        })
        .catch(error => {
            console.error(error);
        });
    }, [id]
    );

    return(
        <div>
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <CardMedia
                    component="img"
                    height="18"
                    image={profilePicture ? profilePicture : ProfileDefaultPicture}
                    alt="Volunteer profile picture"
                />
                <CardContent
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.70)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </CardContent>
                <CardContent
                    sx={{
                        backgroundColor: 'white',
                        minHeight: '100px',
                        maxHeight: '100px'
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        color="#2D2A32"
                        fontWeight={550}
                        marginBottom={1}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            size="small"
                            color="primary"
                            href={`/volunteer/${id}`}
                            variant="contained"
                            sx={{
                                color: 'white'
                            }}
                        >
                            Voir le profil
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}
