import { Alert, Button, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import "./BlockedUsersList.scss"
import config from "../config";
import { Volunteer } from '../interfaces';



export default function BlockedUsersList() {

  const [response, setResponse] = useState<{ error: boolean, message: string, id: number }>({ error: false, message: "", id: 0 });
  const [blockedUsers, setBlocked] = useState<Volunteer[]>([]);
  const [isSet, setIsSet] = useState(false);


  const getBlocked = () => {
    console.log("Fetching blocked users");
    fetch(`${config.apiUrl}/friends/blocked`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          // filter data by first_name and last_name
          const filteredData = data.filter((volunteer: Volunteer) => volunteer.first_name && volunteer.last_name);
          setBlocked(filteredData);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse({ error: false, message: '', id: 0 });
    }, 5000);
    return () => clearTimeout(timer);
  }, [response]);

  const BlockUnBlock = async (id: number, isAlreadyBlocked: boolean) => {
    const isblock = isAlreadyBlocked ? "unblock" : "block";
    fetch(`${config.apiUrl}/friends/${isblock}/${id.toString()}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 201) {
        if (isAlreadyBlocked) {
          setResponse({ error: false, message: "L'utilisateur a bien été débloqué", id: id });
        } else {
          setResponse({ error: false, message: "L'utilisateur a bien été bloqué", id: 0 });
        }
        getBlocked();
      } else {
        setResponse({ error: true, message: "Une erreur est survenue, veuillez réessayer ultérieurement", id: id });
      }
    })
  }

  const getFullName = (volunteer: Volunteer) => {
    const fullName = `${volunteer.first_name} ${volunteer.last_name}`;
    return (fullName.length > 100) ? (fullName.slice(0, 100) + "...") : fullName;
  }

  const undoUnblock = (id: number) => () => {
    setResponse({ error: false, message: "", id: 0 });
    BlockUnBlock(id, false);
  }

  return (
    <div>
      <p className="blocked-user-title">Utilisateurs bloqués</p>
      <div className="blocked-user-blocked-users-container">
        {blockedUsers.map((volunteer: Volunteer) => (
          <div key={volunteer.id} className="blocked-user-volunteer-card-container">
            <div className="blocked-user-volunteer-card">
              <div className="blocked-user-profile-picture-container">
                <img
                  src={volunteer.profile_picture}
                  alt={`${volunteer.first_name} ${volunteer.last_name}`}
                  className="blocked-user-profile-picture"
                />
              </div>
              <div className="blocked-user-volunteer-info">
                <div className="blocked-user-volunteer-name">
                  <span>{getFullName(volunteer)}</span>
                </div>
                <Button onClick={() => BlockUnBlock(volunteer.id, true)} variant="contained" color="error">
                  Débloquer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {response.message &&
        <div className="blocked-user-alert">
          <Alert severity={response.error ? "error" : "success"}
            {...(!response.error && response.id !== 0) &&
            { action: <Button onClick={undoUnblock(response.id)}>Annuler</Button> }
            }
          >
            {response.message}
          </Alert>
        </div>
      }
    </div>
  );
}