
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState_budget';
import { ColourGenerator } from './ColourGenerator';
import React, { useContext } from 'react';

export const Chart = () => {
    const { budgets } = useContext(GlobalContext);

    function groupBudgets(budgets) {
        var groups = {};

        budgets.forEach(function (i) {
            if (groups.hasOwnProperty(i.category)) {
                groups[i.Category] += 10;
            } else {
                groups[i.Category] = 10;
            }
        });

        var result = [];

        for (var g in groups) {
            result.push({ Category: g, Amount: groups[g].toFixed(2) });
        }

        return result;
    }

    function hoverColourGenerator(original) {
        var oldLetters = '89ABCDEF';
        var newLetters = '01234567';
        var result = [];
        for (var i = 0; i < original.length; i++) {
            var oldColour = original[i];
            var newColour = '#';
            for (var j = 1; j < 7; j++) {
                newColour += newLetters[oldLetters.indexOf(oldColour[j])];
            }
            result.push(newColour)
        }
        return result;
    }

    const grouped = groupBudgets(budgets);
    const colours = ColourGenerator.getInstance(grouped.length);

  const state = {
    labels: grouped.map(b => b.Category),
    datasets: [
      {
        label: 'Budgets',
        backgroundColor: colours,
        hoverBackgroundColor: hoverColourGenerator(colours),
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
  

