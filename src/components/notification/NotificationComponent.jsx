import React, { useEffect, useState } from 'react';
import {Badge, IconButton} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

// 알림 버튼
const NotificationComponent = ({showMessage}) => {
    const [notifications, setNotifications] = useState([]);

    return (
        <div className="notification-container">
            <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                // onClick={() => handlerDropdownMenu()}
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            {/* <div className="notification-list">
                {notificationOpen && (
                    <div className="notifications">
                        {notifications.map(notification => (
                            <li key={notification.id} onClick={() => handleNotificationClick(notification.relatedUrl)}>
                                {notification.content}
                            </li>
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default NotificationComponent;
