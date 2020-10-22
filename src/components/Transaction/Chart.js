
import DonutChart from 'react-donut-chart';
import { GlobalContext } from '../../context/GlobalState';
import React, { useContext } from 'react';

export const Chart = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.Amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += Math.round(item)), 0)
    .toFixed(2);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc -= Math.round(item)), 0)
    .toFixed(2);

 
  return (
    <h2>
      <DonutChart
    data={[{
        label: 'INCOME',
        value: income
    },
    {
        label: 'EXPENSE',
        value: expense,
        
    }]} />
    </h2>
  )
}
