
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState_budget';
import React, { useContext } from 'react';

export const Chart = () => {
    const { budgets } = useContext(GlobalContext);

    function groupBudgets(budgets) {
        var groups = {};

        budgets.forEach(function (i) {
            if (groups.hasOwnProperty(i.Category)) {
                groups[i.Category] += i.Amount;
            } else {
                groups[i.Category] = i.Amount;
            }
        });

        var result = [];

        for (var g in groups) {
            result.push({ Category: g, Amount: groups[g].toFixed(2) });
        }

        return result;
    }

    function colourGenerator(amount) {
        var letters = '0123456789ABCDEF';
        var result = [];
        for (var i = 0; i < amount; i++) {
            var colour = '#';
            for (var j = 0; j < 6; j++) {
                colour += letters[Math.floor(Math.random() * 16)];
            }
            result.push(colour)
        }
    }

    const grouped = groupBudgets(budgets);

  const state = {
    labels: grouped.map(b => b.Category),
    datasets: [
      {
        label: 'Budgets',
        backgroundColor: colourGenerator(grouped.length),
        hoverBackgroundColor: colourGenerator(grouped.length),
        data: grouped.map(b => b.Amount)
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
  

