import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import config from '../../../config'
import './PublicProfile.scss';
import { useParams, Link } from 'react-router-dom';

interface Volunteer {
    id: number;
    first_name: string;
    last_name: string;
    bio: string;
    profile_picture: string;
}

interface Friend {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string;
}

interface ProfileData {
    volunteer: Volunteer;
    missions_done: number;
    volunteering_time: number;
    volunteer_competencies: { [key: string]: number };
    bee_score: number;
    friends: Friend[];
}

function PublicProfile() {
    const { volunteerId } = useParams();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/profile/${volunteerId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data: ProfileData) => {
            setProfileData(data);
        })
        .catch(error => console.error('Error fetching profile:', error));
    }, [volunteerId]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="public-profile-container">
            <div className="profile-card">
                <div className="profile-image" style={{ backgroundImage: `url(${profileData.volunteer.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'})` }} />
                <CardContent>
                    <Typography variant="h5" component="div" className="profile-name">
                        {profileData.volunteer.first_name} {profileData.volunteer.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {profileData.volunteer.bio}
                    </Typography>
                </CardContent>
            </div>

            <div className="background-card">
                <Card className="stats-card">
                    <CardContent>
                        <h2>Statistics</h2>
                        <div className="stat-item">
                            <h3>Missions réalisées:</h3>
                            <p>{profileData.missions_done ? profileData.missions_done : 0}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Temps de bénévolat</h3>
                            <p>{profileData.volunteering_time} hours</p>
                        </div>
                        <div className="stat-item">
                            <h3>Top 5 compétences:</h3>
                            <ul>
                                {Object.entries(profileData.volunteer_competencies).map(([skill, count]) => (
                                    <li key={skill}>{skill}: {count}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="stat-item">
                            <h3>Bee Score:</h3>
                            <p>{profileData.bee_score}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="friends-card">
                    <CardContent>
                        <h2>Amis</h2>
                        <div className="friend-list">
                            {profileData.friends.map((friend: Friend) => (
                                <Link to={`/volunteer/${friend.id}`} key={friend.id} className="friend-item">
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={friend.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                                        alt="Friend's Profile Picture"
                                    />
                                    <Typography variant="body2" color="text.secondary" className="friend-name">
                                        {friend.first_name} {friend.last_name}
                                    </Typography>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PublicProfile;
