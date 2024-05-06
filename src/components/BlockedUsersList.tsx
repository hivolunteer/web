import { CardMedia } from '@mui/material';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import "./BlockedUsersList.scss"
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
      <button onClick={poyo} className={`block-button ${block ? "blocked" : "unblocked"}`}>
        {block ? "Bloquer" : "Débloquer"}
      </button>
    );
  }

  const longestName = blockedUsers.reduce((longest, volunteer) => {
    const fullName = `${volunteer.first_name} ${volunteer.last_name}`;
    return (fullName.length > longest.length ? fullName : longest) + 1;
  }, '');

  return (
    <div className="blocked-users-container">
      {blockedUsers.map((v: Volunteer) => (
        <div key={v.id} className="volunteer-card-container">
          <div className="volunteer-card" style={{ width: `${longestName.length * 0.65}em` }}>
            <div className="profile-picture-container">
              <img
                src={v.profile_picture}
                alt={`${v.first_name} ${v.last_name}`}
                className="profile-picture"
              />
            </div>
            <div className='volunteer-info'>
              <div className="volunteer-name">
                <span>{v.first_name} {v.last_name}</span>
              </div>
              <BlockButton id={v.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}