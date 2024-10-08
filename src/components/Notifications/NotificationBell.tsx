import React, { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import { NotificationsNone } from '@mui/icons-material';
import NotificationModal from './NotificationModal';

interface NotificationBellProps {
  notifications: any[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
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
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsNone />
        </Badge>
      </IconButton>
      {isOpen && <NotificationModal notifications={notifications} onClose={handleClose} anchorEl={anchorRef.current} />}
    </div>
  );
};

export default NotificationBell;