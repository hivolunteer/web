import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import config from "../../../config";
import "./Profile.scss";
import profileImage from "../../../images/logo/submark.png";
import { Volunteer } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

type newProfile = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  profile_picture: string,
}

function ProfilePage(props: any) {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profile_picture, setProfilePicture] = useState<string>(profileImage);

  function refuseVolunteer(id: number) {
    fetch(`${config.apiUrl}/volunteers/blocked`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        if (response.body) {

        }
      } else {
        console.log("ERROR");
        alert("Une erreur est survenue lors du refus du volontaire");
      }
    })
  }

  useEffect(() => {
    console.log(localStorage);

    const getProfile = () => {
      fetch(`${config.apiUrl}/volunteers/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setFirstName(data.volunteer.first_name);
            setLastName(data.volunteer.last_name);
            setEmail(data.volunteer.email);
            setPhone(data.volunteer.phone);
            setProfilePicture(data.volunteer.profile_picture);
          });
        } else {
          console.log('Error fetching profile');
          console.log(response)
        }
      }).catch((error) => {
        console.log(error);
      })
    }


    getProfile();
  }, []);

  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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
        fetch(`${config.apiUrl}volunteers/profile/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    console.log(first_name, last_name, email, phone, profile_picture);
    let profile: newProfile = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      profile_picture: profile_picture,
    }

    fetch(`${config.apiUrl}/volunteers/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(profile),
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  const [color_blind, setColorBlind] = useState(
    localStorage.getItem("color_blind") === "true"
  );

  return (
    <Row className="profile-row">
      <Col sm={12} md={4} lg={3}>
        <div className="profile-pic">
          <img src={profile_picture} alt="" className="profile-img" />
        </div>
        <div className="profile-btn-div">
          <label
            htmlFor="profile-pic-upload"
            className={"profile-pic-btn" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")}
          >
            Changer la Photo
          </label>
          <input
            className="profile-input"
            id="profile-pic-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </Col>
      <Col sm={12} md={8} lg={9}>
        <div className="profile-info">
          <div className="profile-row">
            <label>Prénom:</label>
            <input
              className="filled-text"
              type="text"
              placeholder="Name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="profile-row">
            <label>Nom de famille:</label>
            <input
              className="filled-text"
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="profile-row">
            <label>Email:</label>
            <input
              className="filled-text"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="profile-row">
            <label>Numéro de téléphone:</label>
            <input
              className="filled-text"
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="profile-btn-div">
            <button className={"profile-pic-btn" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={updateProfile}>
              Mettre à jour le profile
            </button>
          </div>
        </div>
      </Col>
      <div className="profile-btn-div">
            <button className={"profile-pic-btn" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={() => {navigate("/profile/blocked")}}>
              Gérer les utilisateurs Bloqués
            </button>
          </div>
    </Row>
  );
};

export default ProfilePage;
