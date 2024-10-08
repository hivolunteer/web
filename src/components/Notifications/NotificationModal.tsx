import React from 'react';
import { Popover, Box, Typography, Button, Divider } from '@mui/material';

interface NotificationModalProps {
  notifications: any[];
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose, anchorEl }) => {
  return (
    <Popover open={true} onClose={onClose} anchorEl={anchorEl} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}>
      <Box sx={{
        width: '300px',
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0px 5px 5px -5px #2d2a32',
        p: 1,
      }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'left',
            mb: 2,
        }}>
          <Typography variant="h6" component="h2">
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
            <Typography variant="body1" component="p">
              Pas de notifications pour le moment.
            </Typography>
        ) : (
            notifications.map((notification, index) => (
                <div key={index}>
                  <Typography variant="body1" component="p">
                    {notification.message}
                  </Typography>
                  {index < notifications.length - 1 && <Divider sx={{mt: 2, mb: 2}}/>}
                </div>
            ))
        )}
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
          <Button variant="contained" onClick={onClose} sx={{mr: 2}}>
            Fermer
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default NotificationModal;