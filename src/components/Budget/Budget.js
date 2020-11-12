import React from 'react';
import { notification } from 'antd';
import './Progress.css';

export const Budget = ({ budget }) => {
    function progress(budget) {
        if (budget.Progress < 1) {
            return (<div className="progress" style={{ width: 100 * budget.Progress + "%" }}></div>);
        } else {
            return (<div className="progress_exceeded"></div>);
        }
    };

    function deleteBudget(id) {
        fetch(`http://be-4920.herokuapp.com/deletebudget?id=${id}`)
            .then(console.log('delete', id))
            .catch(error =>
                console.log(error)
            );
    };

    function openNotificationWithIcon(type) {
        notification[type]({
            message: 'Delete',
            description:
                'Delete Budget Successfully',
        });
    };

    return (
        <>
            <li className="budgetBox">
                <div className="budgetInfo">
                    {budget.Category}
                    <span>${budget.Spent}/${budget.newAmount} ({(100 * budget.Progress).toFixed(2) + '%'})</span>
                </div>
                <div className="progressBar">
                    {progress(budget)}
                </div>
                <button
                    onClick={() => { deleteBudget(budget._id); openNotificationWithIcon('warning') }}
                    className="delete-btn">
                    x
                </button>
            </li>
        </>
    );
}
