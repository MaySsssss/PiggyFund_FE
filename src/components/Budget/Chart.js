
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState_budget';
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

    function colourGenerator(amount) {
        var letters = '89ABCDEF';
        var result = [];
        for (var i = 0; i < amount; i++) {
            var colour = '#';
            for (var j = 0; j < 6; j++) {
                colour += letters[Math.floor(Math.random() * 8)];
            }

            var colourOK = true;
            for (var k = 0; k < result.length; k++) {
                var existed = result[k];
                if ((Math.abs(parseInt(existed.slice(1, 3) - colour.slice(1, 3))) + Math.abs(parseInt(existed.slice(3, 5) - colour.slice(3, 5))) + Math.abs(parseInt(existed.slice(5, 7) - colour.slice(5, 7)))) < 20) {
                    colourOK = false;
                    break;
                }
            }

            if (colourOK) {
                result.push(colour)
            } else {
                i--;
            }
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
    const colours = colourGenerator(grouped.length);

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
  

