import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import config from "../../../config";
import "./Profile.scss";
import profileImage from "../../../images/logo/submark.png";
import { Volunteer } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import FriendProfileCard from "./Cards/FriendProfileCard";
import ConfirmationModal from "../../../components/ConfirmationModal";

type newProfile = {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  profile_picture: string,
}

function ProfilePage(props: any) {
  const navigate = useNavigate();

  const [id, setId] = useState(""); // TODO: get the id from the URL params
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [profile_picture, setProfilePicture] = useState<string>(profileImage);
  const [passedMissions, setPassedMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [friends, setFriends] = useState<Number[]>([]);
  
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

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/volunteers/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setId(data.volunteer.id);
        setFirstName(data.volunteer.first_name);
        setLastName(data.volunteer.last_name);
        setEmail(data.volunteer.email);
        setPhone(data.volunteer.phone);
        setProfilePicture(data.volunteer.profile_picture);
        setPassedMissions(data.volunteer.nb_missions);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(id);

      if (response.ok) {
        const data: any = await response.json();
        let friends_list: Number[] = [];
        data.friends.forEach((friend: any) => {
          if (id === friend.user_id1)
            friends_list.push(friend.user_id2)
          else if (id === friend.user_id2)
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

  useEffect(() => {
    fetchProfile();
    fetchFriends();
  }, [id]);

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

  /** delete account feature functions */
  const [openConfirmationModal, setopenConfirmationModal] = useState(false);

  const deleteAccount = () => {
      let url = `${config.apiUrl}/volunteers/delete`;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then((response) => {
          if (response.status === 200) {
            alert('Account deleted successfully');
            // Redirect to the login page
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.reload();
            window.location.href = '/';
          } else {
            console.log('Error deleting account');
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const handleCloseConfirmationModal = () => {
    setopenConfirmationModal(false);
  }
  /** END - delete account feature functions */

  const handleTogglePrivate = () => {
    setIsPrivate(!isPrivate);
  };
  
  const [color_blind, setColorBlind] = useState(
    localStorage.getItem("color_blind") === "true"
  );

  return (
    <>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: "self-start",
      }}
    >
      <img src={profile_picture} alt="Logo de profil" className={"profile-photo"} />
      <div className="profile-info">
        <h1>{first_name} {last_name}</h1>
        <p>{passedMissions} missions réalisées</p>
      </div>
      <div className="header">
        <span>Type de compte : </span>
        <label className="switch">
          <input type="checkbox" checked={isPrivate} onChange={handleTogglePrivate} />
          <span className="slider round"></span>
        </label>
        {isPrivate ? "Privé" : "Public"}
      </div>
    </div><h2>Mes amis</h2><div className="friends-grid">
        {friends && friends.slice(0, 4).map((friend) => (
          <FriendProfileCard id={friend} />
        ))}
      </div>
      <Col sm={12} md={4} lg={3} className="profile-info"></Col>
      <Row sm={12} md={4} lg={3} className="button-row">
        <div className="profile-btn-div">
          <button className={"profile-pic-btn" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={() => { navigate("/settings/profile_information"); }}>
            Mettre à jour le profile
          </button>
        </div>
      <div className="profile-btn-div">
        <button className={"profile-pic-btn" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")} onClick={() => { navigate("/profile/blocked"); } }>
          Gérer les utilisateurs Bloqués
        </button>
      </div>
      <div className="profile-btn-div">
        <button className="delete-account-btn" onClick={() => setopenConfirmationModal(true)}>
        Supprimer le compte
      </button>
      {
        openConfirmationModal && 
        <ConfirmationModal
          handleClose={handleCloseConfirmationModal}
          title="Suppression de compte"
          description="Voulez-vous supprimer votre compte ? Cette action est irréversible."
          yes_choice="Oui"
          no_choice="Non"
          yes_function={deleteAccount}
        />
      }
      </div>
      </Row>
      </> 
  );
};

export default ProfilePage;