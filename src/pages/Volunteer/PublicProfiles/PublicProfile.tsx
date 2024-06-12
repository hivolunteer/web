import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
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
    friendship_status: number;
}

function formatTime(hours: number) {
    const formattedHours = Math.floor(hours);
    const formattedMinutes = Math.round((hours - formattedHours) * 60);
    if (formattedHours === 0) {
        return `${formattedMinutes} m`;
    } else if (formattedMinutes === 0) {
        return `${formattedHours} h`;
    } else {
        return `${formattedHours} h ${formattedMinutes} m`;
    }
}

function PublicProfile() {
    const { volunteerId } = useParams();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [friendshipStatus, setFriendshipStatus] = useState<number>(0);

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
            setFriendshipStatus(data.friendship_status);
            if (data.friendship_status === 23) {
                window.location.href = '/';
            }
        })
        .catch(error => console.error('Error fetching profile:', error));
    }, [volunteerId]);

    if (!profileData) {
        return <div>Chargement...</div>;
    }

    function handleFriendRequest() {
        fetch(`${config.apiUrl}/friends/add/${volunteerId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(10);
        })
        .catch(error => console.error('Error sending friend request:', error));
    }

    function handleUnfriend() {
        fetch(`${config.apiUrl}/friends/remove/${volunteerId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(-1);
        })
        .catch(error => console.error('Error unfriending user:', error));
    }

    function handleAcceptRequest() {
        fetch(`${config.apiUrl}/friends/accept/${volunteerId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(21);
        })
        .catch(error => console.error('Error accepting friend request:', error));
    }

    function handleRejectRequest() {
        fetch(`${config.apiUrl}/friends/reject/${volunteerId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(-1);
        })
        .catch(error => console.error('Error rejecting friend request:', error));
    }

    function handleBlockUser() {
        fetch(`${config.apiUrl}/friends/block/${volunteerId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(13);
        })
        .catch(error => console.error('Error blocking user:', error));
    }

    function handleUnblockUser() {
        fetch(`${config.apiUrl}/friends/unblock/${volunteerId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriendshipStatus(-1);
        })
        .catch(error => console.error('Error unblocking user:', error));
    }
    const formattedVolunteeringTime = formatTime(profileData?.volunteering_time);

    return (
        <div className="public-profile-container">
            <div className="profile-card">
                <div className="profile-image" style={{ backgroundImage: `url(${profileData?.volunteer?.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'})` }} />
                <CardContent>
                    <Typography variant="h5" component="div" className="profile-name">
                        {profileData?.volunteer?.first_name} {profileData?.volunteer?.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {profileData?.volunteer?.bio}
                    </Typography>
                </CardContent>
            </div>

            <div className="volunteer-profile-friendship-actions">
                {friendshipStatus === -1 && (
                    <Button variant="text" color="primary" onClick={handleFriendRequest}>
                        Ajouter
                    </Button>
                )}
                {friendshipStatus === 10 && (
                    <Button variant="outlined" color="primary" disabled>
                        En attente
                    </Button>
                )}
                {friendshipStatus === 20 && (
                    <>
                    <Button variant="outlined" color="primary" onClick={handleAcceptRequest}>
                        Accepter
                    </Button>
                    <Button variant="outlined" color="warning" onClick={handleRejectRequest}>
                        Refuser
                    </Button>
                    </>
                )}
                {friendshipStatus === 13 && (
                    <Button variant="text" color="error" onClick={handleUnblockUser}>
                        Débloquer
                    </Button>
                )}
                {(friendshipStatus !== -1 && friendshipStatus !== 13) && (
                    <Button variant="text" color="error" onClick={handleUnfriend}>
                        Retirer
                    </Button>
                )}
                {friendshipStatus !== 13 && (
                    <Button variant="contained" color="error" onClick={handleBlockUser}>
                        Bloquer
                    </Button>
                )}
            </div>

            <div className="background-card">
                <Card className="stats-card">
                    <CardContent>
                        <h2>Statistiques</h2>
                        <div className="stat-item">
                            <h3>Missions réalisées:</h3>
                            <p>{profileData?.missions_done ? profileData?.missions_done : 0}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Temps de bénévolat:</h3>
                            <p>{formattedVolunteeringTime}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Top 5 compétences:</h3>
                                {(Object.entries(profileData?.volunteer_competencies).length !== 0) ?
                                <ul>
                                    {Object.entries(profileData?.volunteer_competencies).map(([skill, count]) => (
                                    <li key={skill}>{skill}: {count}</li>
                                    ))}
                                </ul>
                                : 0 }
                        </div>
                        <div className="stat-item">
                            <h3>Note Bee:</h3>
                            <p>{profileData?.bee_score}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="friends-card">
                    <CardContent>
                        <h2>Amis</h2>
                        <div className="friend-list">
                        {profileData?.friends && profileData.friends.length > 0 ? (
                            profileData?.friends.map((friend: Friend) => (
                                <Link to={`/volunteer/${friend?.id}`} key={friend.id} className="friend-item">
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={friend?.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                                        alt="Friend's Profile Picture"
                                    />
                                    <Typography variant="body2" color="text.secondary" className="friend-name">
                                        {friend?.first_name} {friend?.last_name}
                                    </Typography>
                                </Link>
                            ))
                        ): (
                            <div className="follow-button-container">
                                <p>Vous n'avez aucun amis.</p>
                                <Link to="/accueil">
                                    <Button variant="contained" color="primary">
                                        Découvrir les bénévoles
                                    </Button>
                                </Link>
                            </div>
                        )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PublicProfile;