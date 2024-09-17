import { Button } from '@mui/material';
import config from '../../../../config';

interface Props {
  isFollowing: boolean;
  onFollow: () => void;
}

const FollowButton: React.FC<Props> = ({ isFollowing, onFollow }) => {
    const association = {}; // Declare the 'association' variable
    const handleFollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ association_id: association }),
            });
            onFollow();
        } catch (error) {
            console.error('Error following association', error);
        }
    }

    const handleUnfollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows/${association}`, { // Include association ID in the DELETE request URL
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            onFollow();
        } catch (error) {
            console.error('Error unfollowing association', error);
        }
    }

  return (
    <Button
    variant="contained"
    color={isFollowing ? 'error' : 'primary'}
    onClick={isFollowing ? handleUnfollow : handleFollow}
    sx={{ marginLeft: 2, alignContent: 'center', justifyItems: 'center', display: 'flex'}}
    >
    {isFollowing ? 'Ne plus suivre' : 'Suivre'}
</Button>
  );
};

export default FollowButton;