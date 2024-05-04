import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Volunteer } from '../../../../interfaces';

import ProfileDefaultPicture from "../../../../images/logo/submark.png"

interface VolunteerCardProps {
    volunteer: Volunteer
}

export default function VolunteerCard(props: VolunteerCardProps) {

    const { volunteer } = props;

    return(
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
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="body2" color="white">
                        {volunteer.rating}
                    </Typography>
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
                        {volunteer.first_name} {volunteer.last_name}
                    </Typography>
                    <Typography
                        variant="body2"
                        display="inline-block"
                        style={{
                            width: '100%',
                            display: 'block',
                            whiteSpace: 'normal',
                            textDecoration: 'underline',
                            fontStyle: 'italic'
                        }}>
                        {volunteer.email}
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
                            href={`/volunteer/${volunteer.id}`}
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