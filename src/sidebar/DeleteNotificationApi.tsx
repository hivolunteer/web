import config from "../config";

const handleDeleteNotification = (notificationId: any, notifications: any, setNotifications: React.Dispatch<React.SetStateAction<any[]>>) => {
    fetch(`${config.apiUrl}ions/${notificationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                setNotifications(notifications.filter((notification: any) => notification.id !== notificationId));
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export default handleDeleteNotification;