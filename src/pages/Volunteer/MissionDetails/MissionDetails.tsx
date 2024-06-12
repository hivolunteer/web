import React, { useState, useEffect } from 'react';
import ical from 'ical-generator';
import { Mission, Association, Skill } from '../../../interfaces';
import config from "../../../config";
import './MissionDetails.scss';
import MissionDetailsHeader from './MissionDetailsHeader';
import SkillDisplay from './SkillDisplay';
import { Button } from '@mui/material';

const MissionDetails = () => {

    const [mission, setMission] = useState<Mission | null>(null);
    const id: string = window.location.pathname.split("/")[2]
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

    const [location_id, setLocationId] = useState<string | null>("");
    const [association, setAssociation] = useState<Association | null>(null);
    const [mission_skills, setMissionSkills] = useState<Skill[]>([]);
    const [location, setLocation] = useState<string>("");


    function Register() {
        fetch(`${config.apiUrl}/missions/volunteer/add/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((data: any) => {
                setIsRegistered(true)
            })
    }

    function Unregister() {
        fetch(`${config.apiUrl}/missions/volunteer/remove/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((data: any) => {
                setIsRegistered(false)
            })
    }

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association/${id}`)
            .then(response => response.json())
            .then(data => {
                setLocationId(data.association_mission.location)
                setMission(data.association_mission)
                fetch(`${config.apiUrl}/associations/profile/${data.association_mission.owner_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setAssociation(data.association)
                    })
            })
        fetch(`${config.apiUrl}/missions/skills/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ associationmission: id })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMissionSkills([])
                } else {
                    setMissionSkills(data)
                }
            })

        if (mission?.location) {
            fetch(`${config.apiUrl}/locations/${mission?.location}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response: any) => {
                    if (response.status === 200) {
                        response.json().then((data: any) => {
                            let locationStr: string = String(data.street_number)
                            if (data.street_number_suffix)
                                locationStr += " " + data.street_number_suffix
                            locationStr += " " + data.street_type + " " + data.street_name + ", " + data.city
                            setLocation(locationStr)
                        })
                    }
                })
        }
        
        fetch(`${config.apiUrl}/missions/volunteer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then((data: any) => {
                if (data.active && data.active.length === 0)
                    setIsRegistered(false)
                else if (data.active) {
                    data.active.forEach((mission: any) => {
                        if (mission.id === Number(id)) {
                            setIsRegistered(true)
                        }
                    })
                }
            })
        }, [id, location_id]);
    
    function createIcal() : string | null {
        if (mission) {
            const cal = ical({
                name: mission.title,
                prodId: { company: 'HiVolunteer', product: 'HiVolunteer' },
                timezone: 'Europe/Paris'
            });
            cal.createEvent({
                start: mission.start_date,
                end: mission.end_date,
                summary: mission.title,
                description: "Description:\n" + mission.description + "\n\nInformations pratiques:\n" + mission.practical_information + "\n\n🔗 Lien: " + window.location.href,
                location: location,
                url: window.location.href
            });
            return cal.toString();
        }
        return null;
    }

    function handleDownloadIcal() {
        const ical = createIcal();
        if (ical) {
            const blob = new Blob([ical], { type: 'text/calendar' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mission.ics';
            a.click();
        }
    }



    return (
        <div className='mission-details-container'>
            <MissionDetailsHeader mission={mission as Mission} association={association as Association} location={location} />
            <div className='mission-details-content'>
                <div className='mission-details-content-box'>
                    <p className='mission-details-content-title'> Description de la mission </p>
                    <p className='mission-details-content-description'> {mission?.description} </p>
                </div>
                <div className='mission-details-content-box box-left'>
                    <p className='mission-details-content-title'> Informations pratiques </p>
                    <p className='mission-details-content-description'> {mission?.practical_information} </p>
                </div>
            </div>
            {
                (mission_skills.length !== 0) ? <SkillDisplay skills={mission_skills} /> : null
            }
            <div className='mission-details-content-center'>
                <Button
                    variant='contained'
                    className='mission-details-button'
                    sx={{
                        color: 'white',
                        borderRadius: '10px',
                        margin: '10px'
                    }}
                    onClick={handleDownloadIcal}
                >
                    Télécharger la mission
                </Button>
                <Button 
                    variant='contained'
                    className='mission-details-button'
                    sx={{
                        color: 'white',
                        borderRadius: '10px'
                    }}
                    onClick={() => {
                        if (isRegistered) {
                            Unregister()
                        } else {
                            Register()
                        }
                    }}
                > 
                    {isRegistered ? "Se désinscrire" : "S'inscrire"}
                </Button>
            </div>
        </div>
    )
};

export default MissionDetails;
