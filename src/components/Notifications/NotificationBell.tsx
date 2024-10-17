import React, { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import NotificationModal from './NotificationModal';

interface NotificationBellProps {
  notifications: any[];
  onDeleteNotification: (notificationId: any) => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications, onDeleteNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleBellClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div ref={anchorRef}>
      <IconButton onClick={handleBellClick}>
        <Badge badgeContent={notifications.length} color="primary" sx={{
          "& .MuiBadge-badge": {
            color: "rgba(78,121,110,0.94)",
            backgroundColor: "#fefefe",
            fontSize: 13,
            fontWeight: 700,
          }
        }}>
          <NotificationsNone />
        </Badge>
      </IconButton>
      {isOpen && <NotificationModal notifications={notifications} onClose={handleClose} anchorEl={anchorRef.current} onDeleteNotification={onDeleteNotification} />}
    </div>
  );
};

export default NotificationBell;