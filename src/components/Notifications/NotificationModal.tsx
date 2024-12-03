import React from 'react';
import { Popover, Box, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import handleDeleteNotification from '../../sidebar/DeleteNotificationApi';

interface NotificationModalProps {
  notifications: any[];
  onClose: () => void;
  anchorEl: HTMLElement | null;
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose, anchorEl, setNotifications }) => {
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
          maxHeight: '300px',
          overflowY: 'auto',
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
                <Typography variant="body1" component="p" color={"grey"}>
                    Pas de notification pour le moment
                </Typography>
            ) : (
                notifications.map((notification, index) => (
                    <div key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" component="p">
                                {notification.message}
                            </Typography>
                            <IconButton onClick={() => {
                                handleDeleteNotification(notification.id, notifications, setNotifications)
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {index < notifications.length - 1 && <Divider sx={{mt: 2, mb: 2}}/>}
                    </div>
                ))
            )}
        </Box>
      </Popover>
  );
};

export default NotificationModal;