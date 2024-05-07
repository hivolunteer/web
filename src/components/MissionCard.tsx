import { CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../pages/Volunteer/Home/Home.scss';


import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import config from "../config";
import { Mission, Association } from '../interfaces';

function MissionCard(props: {mission: Mission}) {
    const mission: Mission = props.mission;

    const [location, setlocation] = useState("");
    const [owner, setowner] = useState<Association | null>(null);

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
                    setlocation(`${data.street_number} ${data.street_number_suffix} ${data.street_type} ${data.street_name}, ${data.postal_code} ${data.city}`);
                });
            }
        });
    }
    function getOwner() {
        fetch(`${config.apiUrl}/associations/profile/${mission.owner_id.toString()}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log("PP: " + JSON.stringify(data.association as Association))
                    setowner(data.association as Association);
                });
            } else {
                console.log("FAILURE: " + response.status);
            }
        });
    }

    useEffect(() => {
        if (location === "") {
            getLocation();
        }
    }, [location]);

    useEffect(() => {
        if (!owner) {
            getOwner();
        }
    }, [owner]);

    /*useEffect(() => {

        fetch(`${config.apiUrl}/missions/association/${props.mission}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMission(data.association_mission)
                    fetch(`${config.apiUrl}/associations/profile/` + data.association_mission.owner_id, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setAssociationPicture(data.association.profile_picture)
                            })
                        }
                    })
                })
            }
        })
    }, [])*/


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
    return(
        <Card
            style={{
                width: '110%',
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
                window.location.href = `/manage/${mission.id}`
            }}
        >
            <Card.Body style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div style={{flex: 1, margin: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <CardMedia
                            component="img"
                            style={{borderRadius: '100%', objectFit: 'cover', height: '150px', width: '150px'}}
                            image={(owner?.profile_picture === '') ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : owner?.profile_picture}
                            alt="association picture"
                        />
                    </div>
                    <div style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <div className='mission-header'>
                            <p style={{fontWeight: 'bold'}}> {mission.title} </p>
                        </div>
                        <div className='mission-body'>
                            <div className='mission-body-with-icon'>
                                <CalendarMonthOutlinedIcon />
                                <p style={{marginLeft: '10px'}}> {convertDay(mission.start_date.toString())} {convertHour(mission.start_date.toString())}h - {convertDay(mission.end_date.toString())} {convertHour(mission.end_date.toString())}h </p>
                            </div>
                            <div className='mission-body-with-icon' style={{marginBottom: '2px'}}>
                                <NearMeOutlinedIcon />
                                <p style={{marginLeft: '10px'}}> {location} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MissionCard;