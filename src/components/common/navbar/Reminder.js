import React from 'react';
import { notification } from 'antd';
import Moment from 'react-moment';
import './Navbar.css';

export const Reminder = ({ reminder }) => {
    function deleteReminder(id) {
        fetch(`http://be-4920.herokuapp.com/deletereminder?id=${id}`)
            .then(console.log('delete', id))
            .catch(error =>
                console.log(error)
            );
    };

    function openNotificationWithIcon(type) {
        notification[type]({
            message: 'Delete',
            description:
                'Delete Notification Successfully',
        });
    };

    return (
        <>
            <li>
                <div className="message">
                    <div>{reminder.Message}</div>
                    <div className="notificationTime"><Moment format="YYYY-MM-DD">{reminder.Time}</Moment></div>
                </div>

                <button
                    onClick={() => { deleteReminder(reminder._id); openNotificationWithIcon('warning') }}
                    className="delete-btn">
                    x
                </button>
            </li>
        </>
    );
};