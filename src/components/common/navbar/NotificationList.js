import React, { useContext } from 'react';
import { GlobalContext_notification } from '../../../context/GlobalState_notification';
import { Reminder } from './Reminder';

export const NotificationList = () => {
    const { notifications } = useContext(GlobalContext_notification);

    function notificationListContent(notifications) {
        if (notifications.length == 0) {
            return (<p>There is no notification.</p>);
        } else {
            return (notifications.map(notification => {
                return (
                    <Reminder key={notification._id} reminder={notification} />
                )
            }));
        }
    }

    return (
        <>
            <div className="notification">
                <h3>Notifications</h3>
                <ul className="list">
                    {notificationListContent(notifications)}
                </ul>
            </div>
        </>
    );
};