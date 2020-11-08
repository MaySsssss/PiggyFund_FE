import React, { useContext } from 'react';
import { Budget } from './Budget';
import moment from 'moment';

import { GlobalContext } from '../../context/GlobalState_budget';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext);
    var results = budgets.filter(item => item.Month == moment().format('MMMM'));

    return (
    <>
        <h3>Month</h3>
        <ul className="list">
        {budgets.map(budget => (<Budget key={budget._id} budget={budget} />))}
        </ul>
    </>
    )
}
