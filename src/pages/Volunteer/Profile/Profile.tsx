import "./Profile.scss";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const src_img = require('../../../images/titleLogo.png');

type newProfile = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  profile_picture: string,
  password: string,
}

function ProfilePage(props: any) {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profile_picture, setProfilePicture] = useState<string>(src_img);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log(localStorage)
    const getProfile = () => {
      let url = 'http://localhost:8000/volunteers/profile';
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
            setFirstName(data.volunteer.first_name);
            setLastName(data.volunteer.last_name);
            setEmail(data.volunteer.email);
            setPhone(data.volunteer.phone);
            setProfilePicture(data.volunteer.profile_picture);
            setPassword(data.volunteer.password);
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

  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

  function validatePhone(phone: string): boolean {
    const re = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
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
         const url = 'http://localhost:8000/volunteers/profile/';
         fetch(url, {
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
    // if (!validatePhone(phone)) {
    //   console.error('Invalid phone number');
    //   return;
    // }
    console.log(first_name, last_name, email, phone, profile_picture);
    let profile: newProfile = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      profile_picture: profile_picture,
      password: password,
    }

    let url = 'http://localhost:8000/volunteers/update';
    fetch(url, {
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

  /* Function to add when back is gonna be done */

  const deleteAccount = () => {
    /* if (window.confirm('Are you sure you want to delete your account?')) {
      let url = 'http://localhost:8000/volunteers/profile';
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
                    <img src={profile_picture} alt="" className="profile-img"/>
                </div>
                <div className="profile-btn-div">
                  <label htmlFor="profile-pic-upload" className="profile-pic-btn">
                    Changer la Photo
                  </label>
                  <input className='profile-input' id="profile-pic-upload" type="file" onChange={handleFileChange} accept="image/*"/> 
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
                    <div className="profile-row">
                        <label>Mot de passe:</label>
                        <input
                            className="filled-text"
                            type="text"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="profile-btn-div">
                        <button className="profile-pic-btn" onClick={updateProfile}>
                            Mettre à jour le profile
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
