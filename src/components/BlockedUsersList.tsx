import { CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import "./BlockedUsersList.scss"
import config from "../config";
import { Volunteer } from '../interfaces';



export default function BlockedUsersList() {

  const [blockedUsers, setBlocked] = useState<Volunteer[]>([]);
  const [isSet, setIsSet] = useState(false);


  const getBlocked = () => {
    fetch(`${config.apiUrl}/friends/blocked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setBlocked(data);
        });
      } else {
        alert("ERROR FETCHING BLOCKED : " + JSON.stringify(response.body));
      }
      setIsSet(true);
    }).catch((error) => {
      console.warn(error);
    });
  }

  useEffect(() => {
    if (!isSet) {
      getBlocked();
    }
  }, [isSet]);

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
      <button onClick={poyo} className={`block-button ${block ? "blocked" : "unblocked"}`}>
        {block ? "Bloquer" : "Débloquer"}
      </button>
    );
  }

  let longest = 0;

  for (const u of blockedUsers) {
    const fullName = `${u.first_name} ${u.last_name}`;
    const total = (fullName.length > longest) ? fullName.length : longest;
    longest = (total > 100) ? 100 : total;
  }

  const getFullName = (u: Volunteer) => {
    const fullName = `${u.first_name} ${u.last_name}`;
    return (fullName.length > 100) ? (fullName.slice(0, 100) + "...") : fullName;
  }

  return (
    <div className="blocked-users-container">
      {blockedUsers.map((v: Volunteer) => (
        <div key={v.id} className="volunteer-card-container">
          <div className="volunteer-card" style={{ width: `${longest * 0.65}em` }}>
            <div className="profile-picture-container">
              <img
                src={v.profile_picture}
                alt={`${v.first_name} ${v.last_name}`}
                className="profile-picture"
              />
            </div>
            <div className='volunteer-info'>
              <div className="volunteer-name">
                <span>{getFullName(v)}</span>
              </div>
              <BlockButton id={v.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}