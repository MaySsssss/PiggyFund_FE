import React from 'react';
import { notification } from 'antd';

export const Budget = ({ budget }) => {
    function deleteBudget(id) {
        fetch(`http://be-4920.herokuapp.com/deletebudget?id=${id}`)
            .then(console.log('delete', id))
            .catch(error =>
                console.log(error)
            )
    }

    function openNotificationWithIcon(type) {
        notification[type]({
            message: 'Delete',
            description:
                'Delete Budget Successfully',
        });
    };

    return (
        <li className={'minus'}>
            {budget.Category} 
            <span>-${Math.abs(budget.Amount)}</span>
            <button
                onClick={() => { deleteBudget(budget._id); openNotificationWithIcon('warning') }}
                className="delete-btn">
                x
            </button>
        </li>
    )
}
