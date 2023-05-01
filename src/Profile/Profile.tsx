import 'material-symbols';
import "./Profile.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const src_img = require('../Images/logo192.png');

function ProfilePage(props: any) {
  let navigation = useNavigate();

  useEffect(() => {
    document.body.classList.add('auth');
    return () => {
      document.body.classList.remove('auth');
    }
  }, []);

  const [first_name, setName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profile_picture, setProfilePicture] = useState<string>(src_img);

  const getProfile = () => {
    let url = 'http://localhost:3000/volunteers/profile';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setPhone(data.phone);
          setPassword(data.password);
          setProfilePicture(data.profile_picture);
        });
      } else {
        console.log('Error fetching profile');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getProfile();
  }, []);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setProfilePicture(dataUrl);
        const formData = new FormData();
        formData.append('file', file);
        const url = 'http://localhost:3000/volunteers/profile/image';
        fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
          body: formData,
        })
          .then((response) => {
            if (response.status === 200) {
              alert('Profile picture updated successfully');
            } else {
              console.log('Error updating profile picture');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    }
  };
  
  const updateProfile = () => {
    if (!validateEmail(email)) {
      console.error('Invalid email');
      return;
    }
    if (!validatePhone(phone)) {
      console.error('Invalid phone number');
      return;
    }
    let url = 'http://localhost:3000/volunteers/profile';
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        profile_picture: profile_picture,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Profile updated successfully');
        } else {
          console.log('Error updating profile');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      let url = 'http://localhost:3000/volunteers/profile';
      fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${props.token}`,
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
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container className="profile-container">
        <Row>
            <Col sm={12} md={4} lg={3}>
                <div className="profile-pic">
                    <img src={profile_picture} alt="profile" className="profile-img"/>
                    <label htmlFor="profile-pic-upload" className="profile-pic-btn">
                        Changer la Photo
                    </label>
                    <input id="profile-pic-upload" type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                </div>
            </Col>
            <Col sm={12} md={8} lg={9}>
                <div className="profile-info">
                    <div className="profile-row">
                        <label>Prénom:</label>
                        <input
                            type="text"
                            value={first_name || ""}
                            readOnly={true}
                        />
                    </div>
                    <div className="profile-row">
                        <label>Nom de famille:</label>
                        <input
                            type="text"
                            value={last_name || ""}
                            readOnly={true}
                        />
                    </div>
                    <div className="profile-row">
                        <label>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="profile-row">
                        <label>Numéro de téléphone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="profile-row">
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="profile-btns">
                        <button className="profile-pic-btn" onClick={updateProfile}>
                            Mettre à jour le profile
                        </button>
                        <button className="delete-account-btn" onClick={deleteAccount}>
                            Supprimer le compte
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  );
};  

export default ProfilePage;
