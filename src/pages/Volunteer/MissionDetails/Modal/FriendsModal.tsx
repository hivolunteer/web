import { Button, Dialog } from "@mui/material";

interface IFriendsModal {
  friends: { first_name: string, last_name: string, profile_picture: string }[]
  open: boolean,
  onClose: () => void
}

export default function FriendsModal(props: IFriendsModal) {
  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth style={{ overflowY: 'scroll' }}>
      <div className='friends-modal'>
        <h2>Amis</h2>
        <div className='friends-modal-list'>
          {props.friends.map((friend, index) => {
            return (
              <div key={index} className='friend'>
                <img src={friend.profile_picture} alt='profile' className='friend-picture-modal' />
                <h3>{friend.first_name} {friend.last_name}</h3>
              </div>
            )
          })}
        </div>
        <div className='button-friend-modal'>
          <Button
            variant='contained'
            onClick={props.onClose}
            color="error"
          >
            Fermer
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

