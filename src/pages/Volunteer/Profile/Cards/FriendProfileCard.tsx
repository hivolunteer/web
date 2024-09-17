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
                }}
            >
                <CardMedia
                    sx={{ width: 80, height: 80, verticalAlign: 'middle', display: 'flex', borderRadius: '50%', margin: '10px', marginTop: '25px'
                    }}
                    component="img"
                    height="18"
                    image={profilePicture ? profilePicture : ProfileDefaultPicture}
                    alt="Volunteer profile picture"
                />
                <CardContent
                    sx={{
                        backgroundColor: 'white',
                        minHeight: '100px',
                        maxHeight: '100px',
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
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
                            justifyContent: "center",
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
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            size="small"
                            color="primary"
                            href={`/volunteer/${id}`}
                            variant="contained"
                            sx={{
                                color: 'white',
                                display: 'flex',
                                justifyContent: "space-between",
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
