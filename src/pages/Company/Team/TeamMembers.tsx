import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Box, Button } from '@mui/material';
import bee from '../../../images/logo/submark_black.png';

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  bee: number;
  email: string;
}

interface TeamMembersProps {
  open: boolean;
  onClose: () => void;
  members: Member[];
}

function TeamMembers({ open, onClose, members }: TeamMembersProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Membres de l'équipe</DialogTitle>
      <DialogContent dividers>
        {members.length > 0 ? (
          members.map(member => (
            <Card key={member.id} sx={{ marginBottom: '16px', position: 'relative', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{`${member.first_name} ${member.last_name}`}</Typography>
                <Typography variant="body2" color="textSecondary">{member.email}</Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  <Typography variant="body2" color="primary" sx={{ marginRight: '4px', fontWeight: 'bold' }}>
                    {member.bee}
                  </Typography>
                  <img src={bee} alt="Bee" style={{ width: '24px', height: '24px' }} />
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">Aucun membre trouvé</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TeamMembers;
