import { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import config from '../../../config';
import { Box } from '@mui/material';

interface TeamRanking {
  team: {
    id: number;
    name: string;
    description: string;
  };
  total_bee: number;
}

function Team() {
  const [teamRankings, setTeamRankings] = useState<TeamRanking[]>([]);

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '0 auto',
      }}
    >
      {teamRankings.length > 0 ? (
        teamRankings.map((ranking) => (
          <TeamCard key={ranking.team.id} team={ranking.team} totalBee={ranking.total_bee} />
        ))
      ) : (
        <p>Aucune équipe trouvée pour cette entreprise</p>
      )}
    </Box>
  );
}

export default Team;
