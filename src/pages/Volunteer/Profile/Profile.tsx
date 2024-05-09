import * as React from "react";
import {useEffect, useState} from "react";
import config from "../../../config";
import "./Profile.scss";
import profileImage from "../../../images/logo/submark.png";

export default function FullWidthGrid(props: any) {

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setProfilePicture] = useState<string>(profileImage);


  useEffect(() => {
    const getProfile = async () => {
      await fetch(`${config.apiUrl}/volunteers/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              });
            } else {
              console.log("Error fetching profile");
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };

    getProfile();
  }, []);

  return (
      <>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "self-start",
          textAlign: "center",
          padding: "20px",
        }}>
          <img src={image} alt="Logo de profil" className={"container-div"}/>
          <h1> {first_name} {last_name}</h1>
        </div>
          <h2>
            Missions réalisées
          </h2>
      </>
  )
      ;
}
