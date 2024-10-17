import React from 'react';
import { FaBell } from 'react-icons/fa';

interface BellIconProps {
  onClick: () => void;
}

const BellIcon: React.FC<BellIconProps> = ({ onClick }) => {
  return (
    <FaBell onClick={onClick} />
  );
};

export default BellIcon;