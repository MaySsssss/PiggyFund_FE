
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState';
import React, { useContext } from 'react';

export const Chart = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.Amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += Math.round(item)), 0)
    .toFixed(2);

  const outcome = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc -= Math.round(item)), 0)
    .toFixed(2);

  const state = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Balance',
        backgroundColor: [
          '#B21F00',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000'
        ],
        data: [income, outcome]
      }
    ]
  }
  return (
    <h2>
      <Doughnut
        data={state}
        options={{
          title:{
            display: true,
            text:'',
            fontSize:20
          },
          legend:{
            display: true,
            position:'right'
          }
        }}
      />
    </h2>
  )
}
  

