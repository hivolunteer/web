import { CardContent, CardMedia } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Home.scss';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import config from "../../../config";

function MisssionCard(props: {mission: number}) {

    interface Mission {
        owner_id: number,
        title: string,
        end_date: string,
        start_date: string,
        pratical_info: string
    }

    let [mission, setMission] = useState<Mission>({
        title: '',
        end_date: '',
        start_date: '',
        owner_id: 0,
        pratical_info: ''
    })

    let [associationPicture, setAssociationPicture] = useState<string>('')


    useEffect(() => {
        console.log(props)

        fetch(`${config.apiUrl}/missions/association/${props.mission}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMission(data.association_mission)
                    console.log(data.association_mission)
                    fetch(`${config.apiUrl}/associations/` + data.association_mission.owner_id, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            response.json().then((data) => {
                                console.log(data)
                                setAssociationPicture(data.association.profile_picture)
                            })
                        }
                    })
                })
            }
        })
    }, [])


    // misc functions

    function convertDay(date: string) {
        let newDate = new Date(date)
        // return just the day format DD/MM/YYYY
        let day = newDate.getDate()
        let month = newDate.getMonth()
        let year = newDate.getFullYear()
        return `${(day < 10) ? '0' + day : day}/${(month < 10) ? '0' + month : month}/${year}`
    }

    function convertHour(date: string) {
        let newDate = new Date(date)
        // get only hours and minutes
        let hours = newDate.getHours()
        let minutes = newDate.getMinutes()

        return `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' + minutes : minutes}`
    }
        

    // page rendering
    return(
        <Card
            style={{
                width: '85%',
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
        >
            <Card.Body>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{flex: 1, margin: '0 10px'}}>
                        <CardMedia
                            component="img"
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            image={(associationPicture === '') ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : associationPicture}
                            alt="association picture"
                        />
                    </div>
                    <div style={{flex: 2}}>
                        <div className='mission-header'>
                            <p style={{fontWeight: 'bold'}}> {mission.title} </p>
                        </div>
                        <div className='mission-body'>
                            <div className='mission-body-with-icon'>
                                <CalendarMonthOutlinedIcon />
                                <p style={{marginLeft: '10px'}}> {convertDay(mission.start_date)} {convertHour(mission.start_date)}h - {convertHour(mission.end_date)}h </p>
                            </div>
                            <div className='mission-body-with-icon' style={{marginBottom: '2px'}}>
                                <NearMeOutlinedIcon />
                                <p style={{marginLeft: '10px'}}> Lieu </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MisssionCard;