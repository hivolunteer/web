import * as React from "react";
import { useState, useEffect } from "react";
import config from "../../../config";
import "./Profile.scss";
import profileImage from "../../../images/logo/submark.png";
import { Card } from "@mui/material";
import FriendProfileCard from "./Cards/FriendProfileCard";

interface Props {
  // Add type annotations for props
}

export default function Profile(props: Props) {
  const [id, setId] = useState(""); // TODO: get the id from the URL params
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(profileImage);
  const [passedMissions, setPassedMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [friends, setFriends] = useState<Number[]>([]);

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
        console.log("data: ", data);
        setId(data.volunteer.id);
        setFirstName(data.volunteer.first_name);
        setLastName(data.volunteer.last_name);
        setEmail(data.volunteer.email);
        setPhone(data.volunteer.phone);
        setImage(data.volunteer.profile_picture);
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

  const handleTogglePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <img src={image} alt="Logo de profil" className={"container-div"} />
        <div className="profile-info">
          <h1>{firstName} {lastName}</h1>
          <p>{passedMissions} missions réalisées</p>
        </div>
      <div className="header">
        <span>Type de compte : </span>
        <label className="switch">
          <input type="checkbox" checked={isPrivate} onChange={handleTogglePrivate} />
          <span className="slider round"></span>
        </label>
        {isPrivate? "Privé" : "Public"}
      </div>
      </div>
      <h2>Mes amis</h2>
      <div className="friends-grid">
        {friends && friends.slice(0, 4).map((friend) => (
          <FriendProfileCard id={friend} />
        ))}
      </div>
      <Card className="friend-card">
            <img src={image} alt={firstName} className="friend-image"/>
            <h3> {firstName} {lastName}</h3>
          </Card>
    </>
  );
}