import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import config from '../../../config';
import './AssociationProfile.scss';
import { useParams, Link } from 'react-router-dom';
import FollowButton from '../Search/Cards/FollowButton';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function PublicProfile() {
  const { associationId } = useParams<{ associationId: string }>();
  const [profileData, setProfileData] = useState<AssociationProfileData | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

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

        setProfileData({
          association: data.association,
          nb_followers: data.nb_followers,
          missions,
          nb_missions
        });
        
        fetch(`${config.apiUrl}/follows/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response: any) => {
          if (response.status === 200) {
            response.json().then((data: any) => {
              for (const follow of data) {
                if (follow.association_id === Number(associationId)) {
                  setIsFollowing(true);
                  return;
                }
              };
            })
          }
        })

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchData();
  }, [associationId]);

  const handleFollow = async () => {
    try {
      await fetch(`${config.apiUrl}/follows`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ association_id: Number(associationId) }),
      });
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error following association', error);
    }
    setIsFollowing(!isFollowing);
  };

  if (!profileData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="public-profile-container">
      <div className="profile-card">
        <div className="profile-image" style={{ backgroundImage: `url(${profileData?.association?.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'})` }} />
        <CardContent className="profile-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography variant="h5" component="div" className="profile-name">
              {profileData?.association?.name}
            </Typography>
            <FollowButton associationId={ Number(associationId)} isFollowing={isFollowing} onFollow={handleFollow} />
          </div>

          <Typography variant="body2" color="text.secondary" className="profile-description">
            {profileData?.association?.description}
          </Typography>
        </CardContent>
      </div>

      <Grid container spacing={3} sx={{ padding: '2em' }}>
        <Grid item xs={12} sm={6}>
          <Item style={{ height: '100%' }}>
            <h2 style={{ color: 'black', fontSize: '1.5rem' }}>Statistiques</h2>
            <div style={{ marginLeft: '1.3em', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p className="association-profile-stats">
                Note : {profileData?.association?.rating} ⭐
              </p>
              <p className="association-profile-stats">
                Score Bee : {profileData?.association?.bee} 🐝
              </p>
              <p className="association-profile-stats">
                Nombre de missions proposées : {profileData?.nb_missions}
              </p>
              <p className="association-profile-stats">
                Nombre de bénévoles qui vous suivent : {profileData?.nb_followers}
              </p>
              <p className="association-profile-stats">
                Nombre total d'heures de bénévolat : {profileData?.association?.nb_hours} heures
              </p>
            </div>
          </Item>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Item>
            <h2 style={{ color: 'black', fontSize: '1.5rem' }}>Dernières missions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2em', paddingRight: '2em' }}>
              {profileData?.missions && profileData.missions.length > 0 ? (
                profileData.missions.slice(-5).reverse().map(mission => (
                  <Link to={`/mission/${mission.id}`} key={mission.id} className="mission-link" style={{ textDecoration: 'none' }}>
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
                          Du {new Date(mission.start_date).toLocaleDateString()} au {new Date(mission.end_date).toLocaleDateString()}
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
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default PublicProfile;
