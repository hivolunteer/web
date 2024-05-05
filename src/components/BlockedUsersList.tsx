import { CardMedia } from '@mui/material';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import "./BlockedUsersList.scss"
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import config from "../config";
import { Volunteer } from '../interfaces';

export default function BlockedUsersList(props: { blockedUsers: Volunteer[] }) {
  const blockedUsers: Volunteer[] = props.blockedUsers;

  const BlockButton = (props: {id: number}) => {
    const id = props.id;
    const [block, setblock] = useState(false);
    const poyo = () => {
      console.warn(`FOR ID ${id} : ${block}`);
      setblock(!block);
    }

    return (
      <button onClick={poyo} className={block ? "unblock-button" : "block-button"}>{block ? "unblock" : "block"}</button>
    );
  }

  return (
    <div>
      {blockedUsers.map((v: Volunteer) => (
        <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>name: {v.first_name} id: {v.last_name} pp: {v.profile_picture}</span>
          <BlockButton id={v.id}/>
        </div>
      ))}
    </div>
  );
}