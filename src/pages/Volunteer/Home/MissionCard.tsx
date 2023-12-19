import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
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

    let [associationName, setAssociationName] = useState<string>('')

    useEffect(() => {

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
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            response.json().then((data) => {
                                setAssociationName(data.name)
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
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    }

    function convertDate(date: string) {
        let newDate = new Date(date)
        // get only hours and minutes
        let hours = newDate.getHours()
        let minutes = newDate.getMinutes()
        return `${hours}:${minutes}`
    }
        

    // page rendering
    return(
        <Card
            style={{
                width: '18rem',
                height: '15rem',
                margin: '1rem',
                border: '3px solid #5b8971',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Card.Body
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: 'auto'
                }}
            >
                <Card.Title
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        width: '80%',
                    }}
                > {mission.title} </Card.Title>
                <Card.Subtitle
                    style={{
                        fontSize: '1rem',
                        fontWeight: 'italic'
                    }}
                > 
                    {associationName} 
                </Card.Subtitle>
                <br />
                <Card.Text> Date : {convertDay(mission.start_date)} </Card.Text>
                <Card.Text> {convertDate(mission.start_date)} - {convertDate(mission.end_date)} </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MisssionCard;