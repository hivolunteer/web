import { useState, useEffect } from "react";
import config from "../../../config";
import { Team, Volunteer } from "../../../interfaces";
import './Dashboard.scss';
import Button from '@mui/material/Button';
import TeamCard from "../Team/TeamCard";
import { useNavigate } from "react-router-dom";

interface completeTeam extends Team {
  bee: number
}

export default function Dashboard() {
  const navigate = useNavigate();
  const submark = require("../../../images/logo/submark.png")
  const [teams, setTeams] = useState<completeTeam[]>([]);
  const [employees, setEmployees] = useState<Volunteer[]>([]);
  const [linkedAssociationsNumber, setLinkedAssociationsNumber] = useState(0);
  const [linkedMissionsNumber, setLinkedMissionsNumber] = useState(0);
  const token = localStorage.getItem('token');
  const [open, setopen] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded == false) {
      fetch(`${config.apiUrl}/companies/dashboard`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.ok) {
          setIsLoaded(true);
          response.json().then((body) => {
            setTeams(body.teams);
            setEmployees(body.employees);

            setName(body.company.name);
            setEmail(body.company.email);
            setPhone(body.company.phone);
            setProfilePicture(body.company.profile_picture);
            setDescription(body.company.description);

            setLinkedAssociationsNumber(body.linked_associations_nb);
            setLinkedMissionsNumber(body.linked_missions_nb);
          });
        }
      });
    }
  }, [isLoaded]);

  function Placeholder() {
    return (
      <div>
        <h1>placeholder</h1>
      </div>
    );
  }

  function Data() {
    return (
      <div>
        <img src={(profilePicture !== null) ? profilePicture : submark} alt="Logo de profil" style={{ width: "auto", height: "200px" }} />

        <h1 style={{ textAlign: 'center', padding: '10px 20px' }}>{name}</h1>

        <div>
          <h2>Description</h2>
          <p>{description}</p>
        </div>

        <h2>Employés</h2>
        <div className='employees-modal-list'>
          {employees.map((employee, index) => {
            return (
              <div key={index} className='employee'>
                <img src={employee.profile_picture} alt='profile' className='employee-picture-modal' />
                <h3>{employee.first_name} {employee.last_name}</h3>
              </div>
            )
          })}
        </div>

        <h2>Equipes</h2>
        {teams.map((team: completeTeam) => (
          <TeamCard key={team.id} team={team} totalBee={team.bee} />
        ))
        }
        <div>
          <h3>Statistiques</h3>
          <h4 style={{ textAlign: 'center', padding: '10px 20px' }}>Vous êtes lié à {linkedAssociationsNumber} {linkedAssociationsNumber == 1 ? 'Association' : 'Associations'} !</h4>
          <h4 style={{ textAlign: 'center', padding: '10px 20px' }}>Vous avez réalisé {linkedMissionsNumber} missions !</h4>
        </div>

        <h2>Contact</h2>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "50px",
          padding: "10px",
        }}>
          <label>E-mail:</label>
          <a href="mailto:">
            {email}
          </a>
          <label>Numéro de téléphone:</label>
          <a href="tel:">
            {phone}
          </a>
        </div>

        <div className="profile-btn-div">

          <Button sx={{ marginInlineEnd: '5rem', alignSelf: 'center' }} variant="contained" color="primary" onClick={() => { navigate("/settings/profile_information"); }}>
            Mettre à jour le profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {(isLoaded) ? <Data /> : <Placeholder />}
    </div>
  );
}