import "./Profile.scss";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const src_img = require('../../../images/titleLogo.png');

function ProfilePage(props: any) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profile_picture, setProfilePicture] = useState<string>(src_img);
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(localStorage)
    const getProfile = () => {
      let url = 'http://localhost:8000/associations/profile';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setEmail(data.association.email);
            setName(data.association.name);
            setPhone(data.association.phone);
            setDescription(data.association.desc);
            setProfilePicture(data.association.profile_picture);
            setRating(data.association.rating);
          });
        } else {
          console.log('Error fetching profile');
          console.log(response)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    getProfile();
  }, []);

  /* Function to add when back is gonna be done */

  const deleteAccount = () => {
    /* if (window.confirm('Are you sure you want to delete your account?')) {
      let url = 'http://localhost:8000/associations/profile';
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then((response) => {
          if (response.status === 204) {
            alert('Account deleted successfully');
            // Redirect to the login page
            window.location.href = '/';
          } else {
            console.log('Error deleting account');
          }
        })
        .catch((error) => 
          console.log(error);
        });
    } */
  };

  return (
    <Container className="profile-container">
        <Row className="profile-row">
            <Col sm={12} md={4} lg={3}>
              <div className="profile-pic">
                  <Typography className="rating">{rating} / 5</Typography>
                  <img src={profile_picture} alt="" className="profile-img"/>
              </div>
              <div className="profile-btn-div">
                <h2>
                  {name}
                </h2>
              </div>
            </Col>
            <Col sm={12} md={8} lg={9}>
                <div className="profile-info">
                  <label className="volunteers-title">Bénévoles: </label>
                  <div className="card-component">
                    <Card sx={{ width: 400 }} className="volunteer-card">
                      <CardContent>
                        <Typography>
                          0 bénévoles
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ width: 400 }} className="volunteer-card">
                      <CardContent>
                        <Typography>
                          0 en attente
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <label className="volunteers-title">Description : </label>
                    <Typography className="asso-desc"> {description || "Aucune description"} </Typography>
                  </div>
                  <div>
                    <label className="volunteers-title">Contacts : </label>
                    <button type="button" onClick={() => setShow(prev => !prev)}>Afficher</button>
                    {show && 
                    <Typography className="asso-desc"> Numéro de téléphone: {phone || "Pas de téléphone"} <br/> Email: {email || "Pas de email"} <br/> Site: { "Pas de site"} </Typography>
                    }
                  </div>
                  <div className="profile-btn-div">
                      <button type="button" className="profile-pic-btn" onClick={() => navigate("/modifyProfile")}>
                          Modifier le profile
                      </button>
                      {/* <button className="delete-account-btn" onClick={deleteAccount}>
                          Supprimer le compte
                      </button> */}
                  </div>
                </div>
            </Col>
        </Row>
    </Container>
  );
};  

export default ProfilePage;
