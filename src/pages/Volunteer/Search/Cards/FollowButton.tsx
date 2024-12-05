import { IconButton } from '@mui/material';
import config from '../../../../config';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface Props {
    associationId: number;
    isFollowing: boolean;
    onFollow: () => void;
}

const FollowButton: React.FC<Props> = ({ associationId, isFollowing, onFollow }) => {
    const handleFollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ association_id: associationId }),
            });
            onFollow();
        } catch (error) {
            console.error('Error following association', error);
        }
    }

    const handleUnfollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows/`, { // Include association ID in the DELETE request URL
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ association_id: associationId }),
            });
            onFollow();
        } catch (error) {
            console.error('Error unfollowing association', error);
        }
    }

  return (
    <IconButton
    color={isFollowing ? 'error' : 'primary'}
    onClick={isFollowing ? handleUnfollow : handleFollow}
    sx={{ marginLeft: 2, alignContent: 'center', justifyItems: 'center', display: 'flex'}}
    >
    {isFollowing ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>);
};

export default FollowButton;