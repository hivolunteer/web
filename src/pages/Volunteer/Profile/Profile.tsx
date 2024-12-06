import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import config from "../../../config";
import "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { CardContent, CardMedia, Typography, Button } from "@mui/material";
import Chart from "react-apexcharts";

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
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

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
          })
            .then(response => response.json())
            .then((data: ProfileData) => {
              setProfileData(data);
            })
            .catch(error => console.error('Error fetching profile:', error));
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      };

      fetchProfile();
    }
  }, [volunteerId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const skillData = Array.isArray(profileData.volunteer_competencies) 
  ? profileData.volunteer_competencies.map(skill => ({ name: skill, value: 1 }))  // Assuming each skill has a value of 1
  : Object.entries(profileData.volunteer_competencies).map(([skill, count]) => ({
      name: skill,
      value: count,
    }));

  const topSkills = skillData.length > 0 ? skillData.slice(0, 5) : [{ name: "Aucune compétence", value: 0 }];

  const missionData = [
    { name: "Missions réalisées", value: profileData.missions_done },
    { name: "Temps de bénévolat", value: profileData.volunteering_time },
  ];

  const barChartOptions = {
    chart: {
      id: "bar-chart",
      type: "bar" as "bar",
    },
    xaxis: {
      categories: missionData.map(data => data.name),
    },
  };

  const barChartSeries = [
    {
      name: "Value",
      data: missionData.map(data => data.value),
    },
  ];

  const pieChartOptions = {
    chart: {
      id: "pie-chart",
      type: "pie" as "pie",
    },
    labels: topSkills.map(data => data.name),
  };

  const pieChartSeries = topSkills.length > 0 ? topSkills.map(data => data.value) : [];

  return (
    <><div className="public-profile-container">
      <img src={profileData.volunteer.profile_picture} alt="Logo de profil" className={"profile-photo"} />
      <div className="profile-info">
        <h1>{profileData.volunteer.first_name} {profileData.volunteer.last_name}</h1>
      </div>
      <div className="background-card">
        <Card className="stats-card">
          <CardContent>
            <h2>Statistiques</h2>
            <div className="chart-container">
              <Chart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height="80%"
                width="80%" />
            </div>

            <h3>Top 5 compétences :</h3>
            <div className="chart-container">
              {topSkills.length > 0 && topSkills[0].value > 0 ? (
                <Chart
                  options={pieChartOptions}
                  series={pieChartSeries}
                  type="pie" />
              ) : (
                <p>Aucune compétence</p>
              )}
            </div>
            <div className="stat-item">
              <h3>Bee Score :</h3>
              <p>{profileData.bee_score}/5</p>
            </div>
          </CardContent>
        </Card>

        <Card className="friends-card">
          <CardContent>
            <h2>Amis</h2>
            <div className="friend-list">
              {profileData.friends.length > 0 ? (
                profileData.friends.map((friend: Friend) => (
                  <Link to={`/volunteer/${friend.id}`} key={friend.id} className="friend-item">
                    <CardMedia
                      component="img"
                      image={friend.profile_picture || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                      alt="Friend's Profile Picture" />
                    <Typography variant="body2" color="text.secondary" className="friend-name">
                      {friend.first_name} {friend.last_name}
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
          <Button variant="contained" color="primary" className={((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={() => { navigate("/profile/blocked"); } }>
            Gérer les utilisateurs Bloqués
          </Button>
        </div>
    </Row>
    </>
  );
}

export default ProfilePage;
