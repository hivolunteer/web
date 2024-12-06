import { useState, useEffect, Fragment } from 'react';
import TeamCard from './TeamCard';
import config from '../../../config';
import { Box, Button } from '@mui/material';
import CreateTeamModal from './CreateTeamModal';

interface TeamRanking {
  team: {
    id: number;
    name: string;
    description: string;
    affiliation_token: string;
  };
  total_bee: number;
}

function Team() {
  const [teamRankings, setTeamRankings] = useState<TeamRanking[]>([]);
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = () : void => {
    setOpen(false);
  }

  useEffect(() => {
    fetch(`${config.apiUrl}/teams/teamRanking`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setTeamRankings(data);
        });
      } else {
        console.error('Failed to fetch team rankings');
      }
    }).catch((error) => {
      console.error('Error fetching team rankings:', error);
    });
  }, []);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '0 auto',
        }}
      >
        {teamRankings.length > 0 && (
          teamRankings.map((ranking) => (
            <TeamCard key={ranking.team.id} team={ranking.team} totalBee={ranking.total_bee} />
          ))
        )}
      </Box>
      <Box style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="contained"
          onClick={() => {setOpen(true)}}
          className="generate-token-button"
        >
          Créer une Equipe
        </Button>
      </Box>
      <CreateTeamModal open={open} close={handleClose} />
    </Fragment>
  );
}

export default Team;
