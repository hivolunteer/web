import { Button, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../Home/Home.scss";
import "./RateCard.scss";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import config from "../../../config";
import SimpleDialog from "./dialog";
import Rating from "@mui/material/Rating";

function RateCard(props: { mission: number }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  interface Mission {
    owner_id: number;
    title: string;
    end_date: string;
    start_date: string;
    pratical_info: string;
  }

  let [mission, setMission] = useState<Mission>({
    title: "",
    end_date: "",
    start_date: "",
    owner_id: 0,
    pratical_info: "",
  });

  let [associationPicture, setAssociationPicture] = useState<string>("");
  let [rated, setRated] = useState<boolean>(false);
  let [stars, setStars] = useState<number>(0);

  let [location, setlocation] = useState<string>("");

  useEffect(() => {

    function getLocation(location: string) {
      fetch(`${config.apiUrl}/locations/${location}`, {
          method: 'GET',
          headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          }
      }).then((response) => {
          if (response.status === 200) {
              response.json().then((data) => {
                  let _location =  `${data.street_number} ${(data.street_number_suffix === null) ? '' : data.street_number_suffix } ${data.street_type} ${data.street_name}, ${data.postal_code} ${data.city}`
                  setlocation(_location);
              });
          }
      });
  }

    fetch(`${config.apiUrl}/missions/volunteer/rate/${props.mission}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          if (data.stars_from_volunteer !== -1) {
            setStars(data.stars_from_volunteer);
            setRated(true);
          } else {
            setRated(false);
          }
          console.log(data);
        });
      }
    });
    fetch(`${config.apiUrl}/missions/association/${props.mission}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          getLocation(data.association_mission.location)
          setMission(data.association_mission);
          fetch(
            `${config.apiUrl}/associations/profile/` +
              data.association_mission.owner_id,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          ).then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setAssociationPicture(data.association.profile_picture);

              });
            }
          });
        });
      }
    });
  }, []);

  // misc functions

  function convertDay(date: string) {
    if (date === "") return "";
    let day = date.split("T")[0].split("-")[2];
    let month = date.split("T")[0].split("-")[1];
    let year = date.split("T")[0].split("-")[0];
    return `${day}/${month}/${year}`;
  }

  function convertHour(date: string) {
    if (date === "") return "";
    let hour = date.split("T")[1].split(":")[0];
    let minutes = date.split("T")[1].split(":")[1];
    return `${hour}:${minutes}`;
  }

  // page rendering
  return (
    <Card
      style={{
        marginBottom: "1%",
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0px 5px 5px -5px #2d2a32",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFEFF",
      }}
    >
      <Card.Body style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              margin: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <CardMedia
              component="img"
              style={{
                borderRadius: "100%",
                objectFit: "cover",
                height: "150px",
                width: "150px",
              }}
              image={
                associationPicture === ""
                  ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                  : associationPicture
              }
              alt="association picture"
            />
          </div>
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div className="mission-header">
              <p style={{ fontWeight: "bold" }}> {mission.title} </p>
            </div>
            <div className="mission-body">
              <div className="mission-body-with-icon">
                <CalendarMonthOutlinedIcon />
                <p style={{ marginLeft: "10px" }}>
                  {" "}
                  {convertDay(mission.start_date)}{" "}
                  {convertHour(mission.start_date)}h -{" "}
                  {convertHour(mission.end_date)}h{" "}
                </p>
              </div>
              <div
                className="mission-body-with-icon"
                style={{ marginBottom: "2px" }}
              >
                <NearMeOutlinedIcon />
                <p style={{ marginLeft: "20px", width: "80%" }}> {location} </p>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10% auto",
            }}
          >
            {!rated ? (
              <>
                <Button
                  className={
                    "profile-pic-btn" +
                    (localStorage.getItem("color_blind") === "true"
                      ? " color-blind-bg"
                      : "")
                  }
                  variant="contained"
                  style={{ color: "white" }}
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  Noter la mission
                </Button>
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  mission={mission}
                />
              </>
            ) : (
              <Rating
                readOnly
                precision={0.5}
                name="simple-controlled"
                value={stars}
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RateCard;
