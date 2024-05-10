import { Button } from '@mui/material';
import config from '../../../../config';

interface Props {
  isFollowing: boolean;
  onFollow: () => void;
  association: { id: number };
}

const FollowButton: React.FC<Props> = ({ isFollowing, onFollow, association }) => {
    const handleFollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ association_id: association.id }),
            });
            onFollow();
        } catch (error) {
            console.error('Error following association', error);
        }
    }

    const handleUnfollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows/${association.id}`, {
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
    onClick={onFollow}
    sx={{ marginLeft: 2, alignContent: 'center', justifyItems: 'center', display: 'flex'}}
    >
    {isFollowing ? 'Unfollow' : 'Follow'}
</Button>
  );
};

export default FollowButton;