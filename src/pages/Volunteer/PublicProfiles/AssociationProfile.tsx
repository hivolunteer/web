import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import config from '../../../config';
import './AssociationProfile.scss';
import { useParams, Link } from 'react-router-dom';

interface Association {
    id: number;
    name: string;
    description: string;
    profile_picture: string;
    bee: number;
    nb_hours: number;
    rating: number;
}

interface Mission {
    id: number;
    title: string;
    picture: string;
    start_date: string;
    end_date: string;
    owner_id: number;
}

interface AssociationProfileData {
    association: Association;
    nb_followers: number;
    missions: Mission[];
    nb_missions: number;
}

function PublicProfile() {
    const { associationId } = useParams<{ associationId: string }>();
    const [profileData, setProfileData] = useState<AssociationProfileData | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${config.apiUrl}/associations/profile/${associationId}`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data: { association: Association, nb_followers: number } = await response.json();

                const missionsResponse = await fetch(`${config.apiUrl}/missions`, {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                const missionsData = await missionsResponse.json();

                const allMissions: Mission[] = Array.isArray(missionsData.associations_missions)
                ? missionsData.associations_missions
                : [];

                // Filter missions by association
                const missions = allMissions.filter(mission => mission.owner_id === Number(associationId));
                const nb_missions = missions.length;

                console.log("MISSIONS", missions)

                setProfileData({
                    association: data.association,
                    nb_followers: data.nb_followers,
                    missions,
                    nb_missions                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        fetchData();
    }, [associationId]);

    if (!profileData) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="public-profile-container">
            <div className="profile-card">
                <div className="profile-image" style={{ backgroundImage: `url(${profileData?.association?.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'})` }} />
                <CardContent className="profile-details">
                    <Typography variant="h5" component="div" className="profile-name">
                        {profileData?.association?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="profile-description">
                        {profileData?.association?.description}
                    </Typography>
                </CardContent>
            </div>

            <div className="background-card">
                <Card className="stats-card">
                    <CardContent>
                        <h2>Statistiques</h2>
                        <div className="stat-item">
                            <h3>Bee score:</h3>
                            <p>{profileData?.association?.bee}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Nombre de missions proposées:</h3>
                            <p>{profileData?.nb_missions}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Nombre de bénévoles qui vous suivent:</h3>
                            <p>{profileData?.nb_followers}</p>
                        </div>
                        <div className="stat-item">
                            <h3>Nombre total d'heures de bénévolat:</h3>
                            <p>{profileData?.association?.nb_hours} heures</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="missions-card">
                    <CardContent>
                        <h2>5 dernières missions proposées</h2>
                        {profileData?.missions && profileData.missions.length > 0 ? (
                            profileData.missions.slice(-5).reverse().map(mission => (
                                <Link to={`/mission/${mission.id}`} key={mission.id} className="mission-link">
                                    <Card className="mission-item">
                                        <CardMedia
                                            component="img"
                                            image={mission.picture}
                                            alt={mission.title}
                                            className="mission-image"
                                        />
                                        <div className="mission-details">
                                        <Typography variant="h6" component="h2" color="text.primary" className="mission-title" style={{ textAlign: 'left' }}>
                                            {mission.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mission-date">
                                            Du {new Date(mission.start_date).toLocaleDateString('fr-FR', {
                                                                                                timeZone: 'Europe/Paris',
                                                                                                hour12: true,
                                                                                                })
                                                } au {new Date(mission.end_date).toLocaleDateString('fr-FR', {
                                                                                                timeZone: 'Europe/Paris',
                                                                                                hour12: true,
                                                                                                })
                                                }
                                        </Typography>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <div className="no-missions-container">
                                <p>Aucune mission proposée pour le moment.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PublicProfile;
