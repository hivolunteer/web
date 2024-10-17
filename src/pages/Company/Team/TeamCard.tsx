import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import TeamMembers from './TeamMembers';
import bee from '../../../images/logo/submark_black.png';
import config from '../../../config';

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    description: string;
  };
  totalBee: number;
}

function TeamCard({ team, totalBee }: TeamCardProps) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          <>
            {members.length > 0 ? (
              <Button variant="outlined" onClick={handleOpen} sx={{ marginTop: 2 }}>
                Voir les membres
              </Button>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                Aucun membre
              </Typography>
            )}
          </>
        )}

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
      </Box>
    </Card>
  );
}

export default TeamCard;
