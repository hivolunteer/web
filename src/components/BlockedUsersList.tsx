import { CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import "./BlockedUsersList.scss"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import config from "../config";
import { Volunteer } from '../interfaces';

export default function BlockedUsersList(props: { blockedUsers: Volunteer[] }) {
  const blockedUsers: Volunteer[] = props.blockedUsers;

  const BlockButton = (props: { id: number }) => {
    const id = props.id;
    const [block, setblock] = useState(false);
    const poyo = async () => {
      const isblock = block ? "block" : "unblock";
      fetch(`${config.apiUrl}/friends/${isblock}/${id.toString()}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        if (response.status === 201) {
          setblock(!block);
        } else {
          console.log(`error trying to ${isblock} id ${id}`);
        }
      })
    }

    return (
        <button onClick={poyo} className={block ? "block-button" : "unblock-button"}>{block ? "block" : "unblock"}</button>
    );
  }

  return (
    <div className="blocked-users-container">
      {blockedUsers.map((v: Volunteer) => (
        <div
          key={v.id}
          className="blocked-user-card"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: "center" }}
        >
          <Card className="user-card">
            <CardMedia
              component="img"
              height="140"
              image={v.profile_picture}
              alt="user profile picture"
            />
            <Card.Body>
              <Card.Title>
                {v.first_name} {v.last_name}
              </Card.Title>
            </Card.Body>
            <BlockButton id={v.id} />
          </Card>
        </div>
      ))}
    </div>
  );}