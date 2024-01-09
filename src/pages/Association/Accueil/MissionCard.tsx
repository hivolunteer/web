import { CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./Accueil.scss";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import config from "../../../config";

function MissionCard(props: { mission: any }) {

    // misc functions
    let associationPicture = '';

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
                window.location.href = `/manage/${props.mission.id}`
            }}
        >
            <Card.Body style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div style={{flex: 1, margin: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <CardMedia
                            component="img"
                            style={{borderRadius: '100%', objectFit: 'cover', height: '150px', width: '150px'}}
                            image={props.mission.picture}
                            alt="association picture"
                        />
                    </div>
                    <div style={{flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                        <div className='mission-header'>
                            <p style={{fontWeight: 'bold'}}> {props.mission.title} </p>
                        </div>
                        <div className='mission-body'>
                            <div className='mission-body-with-icon'>
                                <CalendarMonthOutlinedIcon />
                                <p style={{marginLeft: '10px'}}> {convertDay(props.mission.start_date)} {convertHour(props.mission.start_date)}h - {convertHour(props.mission.end_date)}h </p>
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

export default MissionCard;