import {useState, useEffect} from 'react'
import config from '../../../config';
import './ExternalProfile.scss'

import default_picture from '../../../images/logo/submark.png'
import bee from '../../../images/logo/submark_white.png'
import MissionCard from '../../../components/MissionCard';

interface VolunteerProfile {
    first_name: string;
    last_name: string;
    email: string;
    bee: number;
    profile_picture: string | null;
}

function ExternalProfile() {

    const [volunteerProfile, setVolunteerProfile] = useState<VolunteerProfile>({
        first_name: '',
        last_name: '',
        email: '',
        bee: 0,
        profile_picture: null
    })

    const [isPremium, setIsPremium] = useState<boolean>(false)

    const [activeMissions, setActiveMissions]  = useState<number[]>([])
    const [pastMissions, setPastMissions] = useState<number[]>([])

    const [hours, setHours] = useState<Number>(0);
    const [missionDone, setMissioNDone] = useState<Number>(0);

    const [assoId, setAssoId] = useState<Number>(0);
    const [assoName, setAssoName] = useState<string>("")

    useEffect(() => {

        let id = window.location.href.split('/')[5]
        fetch(`${config.apiUrl}/associations/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(data => data.json())
        .then(json => {
            setIsPremium(json.association.is_premium)
            setAssoId(json.association.id)
            setAssoName(json.association.name)
        })
        
        fetch(`${config.apiUrl}/volunteers/profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(data => data.json())
        .then(json => {
            console.log(json)
            setMissioNDone(json.missions_done);
            setHours(json.volunteering_time);
            setVolunteerProfile(json.volunteer)
        })

        if (assoId !== 0) {

            fetch(`${config.apiUrl}/missions/volunteer/all/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(data => data.json())
            .then(json => {
                const active: number[] = [];
                const past: number[] = [];

                console.log(json)

                json.active.association.forEach((mission: any) => {
                    if (mission.owner_id === assoId)
                        active.push(mission.id)
                })
                json.passed.association.forEach((mission: any) => {
                    if (mission.owner_id === assoId)
                        past.push(mission.id)
                })

                setActiveMissions(active)
                setPastMissions(past)
            })
        }

    }, [assoId, assoName])

    function roundBee(bee: number) {
        return Math.round(bee)
    }

    function roundHour(hour: Number) : string {

        let hours = 0;
        let minutes = 0;

        // roudn to 2 decimals after virgule
        let hour_fix = Math.round(Number(hour) * 100) / 100
        // transform xx.xx in hh:mm
        hours = Math.floor(hour_fix)
        minutes = Math.round((hour_fix - hours) * 60)

        if (minutes < 10) {
            return hours + "h0" + minutes
        }
        return hours + "h" + minutes

    }
    
    return (
        <div className='external-profile-container'>
            <div className='external-profile-header'>
                <div className='external-profile-border left'>
                    <div className='external-profile-picture'>
                        <img
                            src={ (volunteerProfile.profile_picture) ? volunteerProfile.profile_picture : default_picture }
                            alt='Profile Picture'
                            className='external-profile-picture'
                        />
                    </div>
                    <div className='external-profile-text-content'>
                        <div className='external-profile-name'>
                            {volunteerProfile.first_name} {volunteerProfile.last_name}
                        </div>
                        <div className='external-profile-score'>
                            <div className='bee-box'>
                                <p> {roundBee(volunteerProfile.bee)} </p>
                                <img src={ bee } alt='Bee' className='bee'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='external-profile-border right'>
                    <div className='external-profile-contact'>
                        <p style={{fontWeight: 'bold'}}>
                            Contact
                        </p> 
                        <p className='external-profil-email'> {volunteerProfile.email} </p>
                    </div>
                </div>
            </div>
            {
                (!isPremium) ?
                <div className='external-profile-box-stastics'>
                    <p style={{fontStyle: 'italic'}}>
                         Pour avoir accez aux statistiques du bénévole, passez en premium
                    </p>
                </div>
                :
                <div className='external-profile-box-stastics'>
                    <div className='external-profile-statistic'>
                            <p> <span style={{fontWeight: 'bolder'}}> {roundHour(hours)} </span> Heures de bénévolat </p>
                    </div>
                    <div className='external-profile-statistic'>
                        <p> <span style={{fontWeight: 'bolder'}}> {Number(missionDone)} </span> Missions effectuées </p>
                    </div>
                </div>
            }
            
            <div className='external-profile-active-missions'>
                {
                    (activeMissions.length === 0) ?
                    <div className='external-profile-mission no-mission'>
                        <p> No active missions </p>
                    </div>
                    :
                    <div className='external-profile-mission'>
                        <p className='external-profile-mission-header'> Mission en cours pour {assoName} : </p>
                        <div className='external-profile-mission-container'>
                        {
                            activeMissions.map((missionId: number) => {
                                return (
                                    <div className='external-profil-mission-card' key={missionId}>
                                        <MissionCard mission_id={missionId} />
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                }
            </div>
            {
                (!isPremium) ?
                    <div className='external-profile-box-stastics'>
                        <p style={{fontStyle: 'italic'}}>
                            Pour avoir accez aux statistiques du bénévole, passez en premium
                        </p>
                    </div>
                :
                <div className='external-profile-active-missions'>
                    {
                        (pastMissions.length === 0) ?
                        <div className='external-profile-mission no-mission'>
                            <p> No past missions </p>
                        </div>
                        :
                        <div className='external-profile-mission'>
                            <p className='external-profile-mission-header'> Missions passées pour {assoName} : </p>
                            <div className='external-profile-mission-container'>
                            {
                                pastMissions.map((missionId: number) => {
                                    return (
                                        <div className='external-profil-mission-card' key={missionId}>
                                            <MissionCard mission_id={missionId} />
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default ExternalProfile