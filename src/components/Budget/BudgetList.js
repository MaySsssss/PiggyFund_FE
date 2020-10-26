import React, { useContext } from 'react';
import { Budget } from './Budget';

import { GlobalContext } from '../../context/GlobalState_budget';

export const BudgetList = () => {
  const { budgets } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {budgets.map(budget => (<Budget key={budget._id} budget={budget} />))}
      </ul>
    </>
  )
}
