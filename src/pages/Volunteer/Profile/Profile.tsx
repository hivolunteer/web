import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import config from "../../../config";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { CardContent, CardMedia, Typography, Button } from "@mui/material";

interface Volunteer {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  profile_picture: string;
  email: string;
  phone: string;
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

function ProfilePage(props: any) {
  const [volunteerId, setVolunteerId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const [, setFriends] = useState<Number[]>([]);
  useEffect(() => {
    fetch(`${config.apiUrl}/volunteers/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setVolunteerId(data.volunteer.id);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {

    if (volunteerId) {
      const fetchProfile = async () => {
        try {
          await fetch(`${config.apiUrl}/volunteers/profile/${volunteerId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then(response => response.json())
            .then((data: ProfileData) => {
              setProfileData(data);
            })
            .catch(error => console.error('Error fetching profile:', error));
        } catch (error) {
          console.error("Error fetching profile");
          console.error(error);
        }
      }

      const fetchFriends = async () => {
        try {
          const response = await fetch(`${config.apiUrl}/friends`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data: any = await response.json();
            let friends_list: Number[] = [];
            data.friends.forEach((friend: any) => {
              if (profileData?.volunteer.id === friend.user_id1)
                friends_list.push(friend.user_id2)
              else if (profileData?.volunteer.id === friend.user_id2)
                friends_list.push(friend.user_id1)
            }
            )
            setFriends(friends_list);

          } else {
            console.error("Error fetching friends");
          }
        } catch (error) {
          console.error("Error fetching friends");
          console.error(error);
        }
      };

      fetchProfile();
      fetchFriends();
    }
  }, [profileData?.volunteer.id, volunteerId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="public-profile-container">

        <img src={profileData && profileData.volunteer && profileData.volunteer.profile_picture} alt="Logo de profil" className={"profile-photo"} />
        <div className="profile-info">
          <h1>{profileData && profileData.volunteer && profileData.volunteer.first_name} {profileData && profileData.volunteer && profileData.volunteer.last_name}</h1>
        </div>
        <div className="background-card">
          <Card className="stats-card">
            <CardContent>
              <h2>Statistiques</h2>
              <div className="stat-item">
                <h3 style={{
                  textAlign: "left",
                }}>Missions réalisées :</h3>
                <p>{profileData.missions_done ? profileData.missions_done : "Vous avez participé à aucune mission"}</p>
              </div>
              <div className="stat-item">
                <h3 style={{
                  textAlign: "left",
                }}>Temps de bénévolat :</h3>
                {profileData.volunteering_time === 0 ? "Vous n'avez fait aucune heure de bénvolat pour l'instant" : <p>{profileData.volunteering_time} heures</p>}
              </div>
              <div className="stat-item">
                <h3 style={{
                  textAlign: "left",
                }}>Top 5 compétences :</h3>
                <ul>
                  {Object.keys(profileData.volunteer_competencies).length !== 0 ? Object.entries(profileData?.volunteer_competencies).slice(0, 5).map(([skill, count]) => (
                    <li key={skill}>{skill}: {count}</li>
                  )) : <p>Vous n'avez pas encore de compétences</p>}
                </ul>
              </div>
              <div className="stat-item">
                <h3 style={{
                  textAlign: "left",
                }}>Bee Score :</h3>
                <p>{profileData && profileData.bee_score}/5</p>
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
                ) : (
                  <div className="follow-button-container">
                    <p>Vous n'avez aucun ami.</p>
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
      <Col sm={12} md={4} lg={3} className="profile-info"></Col><Row sm={12} md={4} lg={3} className="button-row">
        <div className="profile-btn-div">
          <Button variant="contained" color="primary" className={((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={() => { navigate("/profile/blocked"); }}>
            Gérer les utilisateurs Bloqués
          </Button>
        </div>
      </Row>
    </>
  );
};

export default ProfilePage;