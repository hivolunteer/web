import config from "../config";

const handleDeleteNotification = (notificationId: any) => {
    fetch(`${config.apiUrl}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                //setNotifications(notifications.filter((notification) => notification.id !== notificationId));
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export default handleDeleteNotification;