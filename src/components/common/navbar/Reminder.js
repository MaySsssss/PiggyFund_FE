import React from 'react';
import { notification } from 'antd';

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
            <li className="budgetBox">
                <div className="budgetInfo">
                    {reminder.Message}
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