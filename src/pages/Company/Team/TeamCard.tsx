import { Card, CardContent, Typography, Box, Button, IconButton } from '@mui/material';
import { useState, useEffect, Fragment } from 'react';
import TeamMembers from './TeamMembers';
import bee from '../../../images/logo/submark_black.png';
import config from '../../../config';
import { MdOutlineCopyAll } from "react-icons/md";
import { MdOutlineDelete, MdOutlineRestartAlt } from "react-icons/md";

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
    affiliation_token: string | null;
  };
  totalBee: number;
}

function TeamCard({ team, totalBee }: TeamCardProps) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(team.affiliation_token)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.apiUrl}/teams/getTeamMembers/${team.id}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          const data = await response.json();
          setMembers(data.member_list || []);
        } else {
          console.error('Failed to fetch members');
          setMembers([]);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [team.id]);


  const deleteTeam = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.apiUrl}/teams`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: [team.id]
        })
      });
      if (response.status === 200) {
        alert('L\'équipe a été supprimée avec succès.');
      } else {
        console.error('Failed to delete team');
      }
      window.location.reload(); // Refresh the page to display the updated list of teams
    } catch(error) {
      console.error('Error deleting team:', error);
    }
  }


  const createEmployeeCode = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${config.apiUrl}/companies/employeeCode/${team.id}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        response.json().then((data) => {
          setToken(data.token)
        })
      } else {
        console.error('Failed to delete team code');
      }
    } catch(error) {
      console.error('Error deleting team code:', error);
    }
  }

  return (
    <Card sx={{ width: 'calc(38% - 20px)', margin: '40px', position: 'relative', padding: '15px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{team.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {team.description}
        </Typography>

        {loading ? (
          <Typography variant="body1" color="textSecondary">Chargement...</Typography>
        ) : (
          <Fragment>
            {members.length > 0 ? (
              <Button variant="outlined" onClick={handleOpen} sx={{ marginTop: 2 }}>
                Voir les membres
              </Button>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                Aucun membre
              </Typography>
            )}
          </Fragment>
        )}

        <Box style={{margin: '15px 0'}}>
          {
            (token !== null) ? 
              <Box style={{display: 'flex'}}>
                <Typography variant="body2" color="textSecondary">
                  Code d'affiliation de l'équipe :
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ marginLeft: '4px' }}>
                  {token}
                </Typography>
                <IconButton onClick={() => navigator.clipboard.writeText(token as string)}>
                  <MdOutlineCopyAll style={{ width: '15px', height: '15px', marginTop: '-5px'}} />
                </IconButton>
                <IconButton onClick={createEmployeeCode}>
                  <MdOutlineRestartAlt style={{ width: '15px', height: '15px', marginTop: '-5px'}} />
                </IconButton>
              </Box>
            :
            <Button
              variant="contained"
              onClick={createEmployeeCode}
              className="generate-token-button"
            >
              Générer un code référent
            </Button>
          }
        </Box>

        <TeamMembers open={open} onClose={handleClose} members={members} />
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
        }}
      >
        <Typography variant="body2" color="primary" sx={{ marginRight: '4px', fontWeight: 'bold' }}>
          {totalBee}
        </Typography>
        <img src={bee} alt="Bee" style={{ width: '30px', height: '30px' }} />
        <IconButton onClick={deleteTeam}>
          <MdOutlineDelete style={{ color: 'red', width: '20px', height: '20px'}} />
        </IconButton>
      </Box>
    </Card>
  );
}

export default TeamCard;
