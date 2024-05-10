import { CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../pages/Volunteer/Home/Home.scss';

import BusinessIcon from '@mui/icons-material/Business';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import config from "../config";
import { Mission, Association, Volunteer } from '../interfaces';

function MissionCardHome(props: { mission: Mission }) {
    const mission: Mission = props.mission;

    const [location, setlocation] = useState("");
    const [missionPicture, setMissionPicture] = useState("");
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isVolunteerMission, setIsVolunteerMission] = useState<boolean | null>(null);

    function getLocation() {
        fetch(`${config.apiUrl}/locations/${mission.location.toString()}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    let _location =  `${data.street_number} ${(data.street_number_suffix === null) ? '' : data.street_number_suffix } ${data.street_type} ${data.street_name}, ${data.postal_code} ${data.city}`
                    setlocation(_location);
                });
            }
        });
    }

    useEffect(() => {
        if (location === "") {
            getLocation();
        }
    }, [location]);

    const getMissionPicture = (isCloseMission: boolean) => {
        if (mission && mission.picture && mission.picture.startsWith('/uploads')) {
            fetch(`${config.apiUrl}/uploads/${isCloseMission ? 'volunteer' : 'association'}/mission/${mission.id}`, {
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
        }
        if (mission && mission.picture)
            setMissionPicture(mission.picture);
    }

    useEffect(() => {
        if (isVolunteerMission === null) {
            fetch(`${config.apiUrl}/missions/close/${mission.id}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        const close_mission = data.close_mission;
                        if (close_mission && close_mission.title === mission.title && close_mission.description === mission.description) {
                            setIsVolunteerMission(true);
                            getMissionPicture(true);
                            const ownerId = Number(localStorage.getItem('id'));
                            if (close_mission.owner_id === ownerId && localStorage.getItem('role') === 'volunteer') {
                                setIsOwner(true);
                            }
                        }
                    });
                } else
                    setIsVolunteerMission(false);
                    const ownerId = Number(localStorage.getItem('id'));
                    if (mission.owner_id === ownerId && localStorage.getItem('role') === 'association') {
                        setIsOwner(true);
                    }
            });

        }
    }, [isVolunteerMission]);

    // misc functions

    function convertDay(date: string) {
        if (date === '')
            return ''
        let day = date.split('T')[0].split('-')[2]
        let month = date.split('T')[0].split('-')[1]
        let year = date.split('T')[0].split('-')[0]
        return `${day}/${month}/${year}`
    }

    function convertHour(date: string) {
        if (date === '')
            return ''
        let hour = date.split('T')[1].split(':')[0]
        let minutes = date.split('T')[1].split(':')[1]
        return `${hour}:${minutes}`
    }


    // page rendering
    return (
        <Card
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 5px 5px -5px #2d2a32',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFEFF'
            }}
            onClick={() => {
                window.location.href = isOwner ? `/manage/${mission.id}` : isVolunteerMission ? `/mission/close/${mission.id}` : `/mission/${mission.id}`
            }}
        >
            <Card.Body style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ flex: 1, margin: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <CardMedia
                            component="img"
                            style={{ borderRadius: '100%', objectFit: 'cover', height: '150px', width: '150px' }}
                            image={(missionPicture === null || missionPicture === '') ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : missionPicture}
                            alt="mission picture"
                        />
                    </div>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <div className='mission-header'>
                            <p style={{ fontWeight: 'bold' }}> {mission.title} </p>
                        </div>
                        <div className='mission-body'>
                            <div className='mission-body-with-icon' style={{display: 'flex', flexDirection: 'row'}}>
                                <CalendarMonthOutlinedIcon />
                                <p style={{ marginLeft: '10px' }}> {convertDay(mission.start_date.toString())} {convertHour(mission.start_date.toString())}h - {convertHour(mission.end_date.toString())}h </p>
                            </div>
                            <div className='mission-body-with-icon' style={{ marginBottom: '2px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                                <NearMeOutlinedIcon />
                                <p style={{ marginLeft: '10px', width: '80%' }}> {location} </p>
                            </div>
                            <div className='mission-body-with-icon' style={{ marginBottom: '2px' }}>
                            {(isVolunteerMission) ? <EmojiEmotionsIcon/> : <BusinessIcon />}
                            <p style={{ marginLeft: '10px' }}>{isVolunteerMission ? "Bénévole" : "Association"}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MissionCardHome;