import {useState, useEffect} from 'react'
import config from '../../../config';
import './ExternalProfile.scss'

import default_picture from '../../../images/logo/submark.png'
import bee from '../../../images/logo/submark_white.png'

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

    const [ActiveMissions, setActiveMissions]  = useState<Number[]>([])
    const [pastMissions, setPastMissions] = useState<Number[]>([])

    useEffect(() => {

        let id = window.location.href.split('/')[4]

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
            setVolunteerProfile(json.volunteer)
        })

        fetch(`${config.apiUrl}/missions/volunteer/all/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(data => data.json())
        .then(json => {
            const active: Number[] = [];
            const past: Number[] = [];
        })

    }, [])

    function roundBee(bee: number) {
        return Math.round(bee)
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
            <div className='external-profile-active-missions'>
            </div>
        </div>
    );
}

export default ExternalProfile