import React, { useContext } from 'react';
import { GlobalContext_budget } from '../../context/GlobalState_budget';

export const Balance_budget = () => {
//   const { transactions } = useContext(GlobalContext);
  const { budgets } = useContext(GlobalContext_budget);

  const amounts = budgets.map(budgets => budgets.Amount);

  const total = amounts
    .filter(item => !isNaN(item))
    .reduce((acc, item) => (acc += Math.round(item)), 0)
    .toFixed(2);

  return (
    <>
      <h3>Your Budget</h3>
      <h1>{total}</h1>
    </>
  )
}
