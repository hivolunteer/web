import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import config from '../config';

export default function MissionCard(props: {mission_id: number}) {
    
        const [mission, setMission] = useState<Mission | undefined>(undefined);
        const [missionPicture, setMissionPicture] = useState<string | null>(null);
        const [associationName, setAssociationName] = useState<string>('');
        const [associationLogo, setAssociationLogo] = useState<string | null>(null);
        const [location, setLocation] = useState<string>('');

        interface Mission {
            id : number,
            end_date: string,
            start_date: string,
            description: string,
            location: number,
            max_volunteers: number,
            owner_id: number,
            title: string,
            pratical_information: string,
            picture: string,
        }
    
        useEffect(() => {
            fetch(`${config.apiUrl}/missions/association/${props.mission_id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setMission(data.association_mission)
                    })
                }
            })
        }, [])

        useEffect(() => {
            if (mission && mission.owner_id) {
                    fetch(`${config.apiUrl}/associations/profile/${mission.owner_id}`, {
                        method: 'GET',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setAssociationName(data.association.name)
                                setAssociationLogo(data.association.profile_picture)
                            })
                        }
                    })
            }
        }, [mission])

        useEffect(() => {
            if (mission && mission.location) {
                fetch(`${config.apiUrl}/locations/${mission.location}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            setLocation(data.city)
                        })
                    }
                })
            }
        }
        , [mission])

        useEffect(() => {
            // si la string de mission.picture ne commence pas par /uploads, c'est que c'est une URL externe
            if (mission && mission.picture && mission.picture.startsWith('/uploads')) {
                fetch(`${config.apiUrl}/uploads/association/mission/${mission.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }).then((response) => {
                    response.blob()
                        .then((blob) => {
                            const objectUrl = URL.createObjectURL(blob);
                            setMissionPicture(objectUrl);
                            console.log(objectUrl);
                        })
                        .catch((error) => {
                        console.error(error);
                        });
                });
            } else
            if (mission && mission.picture)
                setMissionPicture(mission.picture);
        }, []);    

        const findDay = (date: string | undefined) => {
            if (!date)
                return;
            let day = date.slice(8, 10);
            let month = date.slice(5, 7);
            let year = date.slice(0, 4);
            return `${day}.${month}.${year}`
        }

        const findHour = (date: string | undefined) => {
            if (!date)
                return;
            let hour = date.slice(11, 13);
            let minute = date.slice(14, 16);
            return (minute === '00') ? `${hour}h` : `${hour}h${minute}`;
        }

        const findLocation = (location: string | undefined) => {
            if (!location)
                return "";
            return ("| " + location);
        }

        return(
            <div>
                <Card sx={{width: '100%', height: '100%', borderBottom: '5px solid #5d9082'}}
                >
                    <CardMedia
                        component="img"
                        height="185"
                        image={(missionPicture === null || missionPicture === '') ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : missionPicture}
                        alt="Mission picture"
                    />
                    <CardContent sx={{backgroundColor: "rgba(0, 0, 0, 0.70)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Typography variant="body2" color="white">
                            {findDay(mission?.start_date)} {findHour(mission?.start_date)} - {findHour(mission?.end_date)} {findLocation(location)}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{backgroundColor: 'white', minHeight: '100px', maxHeight: '100px'}}>
                        <Typography variant="h6" component="div" color="#2D2A32" fontWeight={550} marginBottom={1} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            {mission?.title}
                        </Typography>
                        <Typography variant="body2" display="inline-block" style={{
                                                                           width: '100%',
                                                                           display: 'block',
                                                                           whiteSpace: 'normal',
                                                                           overflow: 'hidden',
                                                                           textOverflow: 'ellipsis',
                                                                           lineHeight: '1.4em',
                                                                           maxHeight: '5.6em',
                                                                           position: 'relative'
                                                                         }}>
                            {mission?.description}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                                <a style={{ fontWeight: "normal" }}>Par</a> {associationName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer', textDecoration: 'underline'}}
                            onClick={() => (window.location.href = 'mission/' + mission?.id)}>
                                Voir plus
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
}