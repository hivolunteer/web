import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import {useState, useEffect} from 'react';

export default function MissionCard(props: {mission_id: number}) {
    
        const [mission, setMission] = useState<Mission | undefined>(undefined);
        const [associationLogo, setAssociationLogo] = useState<string>('');

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
        }
    
        useEffect(() => {
            fetch(`http://localhost:8000/missions/association/${props.mission_id}`, {
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
                    fetch(`http://localhost:8000/associations/profile/${mission.owner_id}`, {
                        method: 'GET',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setAssociationLogo(data.association.profile_picture)
                            })
                        }
                    })
            }
        }, [mission])


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
        return(
            <div>
                <Card sx={{width: '100%', height: '100%'}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={(associationLogo) ? associationLogo : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                        alt="association logo"
                    />
                    <CardContent sx={{backgroundColor: 'black', opacity: 0.8}}>
                        <Typography variant="body2" color="white">
                            {findDay(mission?.start_date)} - {findHour(mission?.start_date)} - {findHour(mission?.end_date)}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{backgroundColor: 'white', minHeight: '100px', maxHeight: '100px'}}>
                        <Typography variant="h5" component="div">
                            {mission?.title}
                        </Typography>
                        <Typography variant="body2">
                            {mission?.description}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer', textDecoration: 'underline'}}
                        onClick={() => console.log('mission ', mission?.id)}>
                            En savoir plus
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
}