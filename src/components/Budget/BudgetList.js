import React, { useContext } from 'react';
import { Budget } from './Budget';

import { GlobalContext } from '../../context/GlobalState_budget';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext);
    const results = budgets.filter(item => item.Month == 'January');

  return (
    <>
      <h3>Month</h3>
      <ul className="list">
        {budgets.map(budget => (<Budget key={budget._id} budget={budget} />))}
      </ul>
    </>
  )
}
