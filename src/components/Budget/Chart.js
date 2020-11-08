
import {Bar, Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState_budget';
import { ColourGenerator } from './ColourGenerator';
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

    const grouped = groupBudgets(budgets);
    const colours = ColourGenerator.getInstance(grouped.length);

    const state = {
    labels: grouped.map(b => b.Category),
    datasets: [
        {
        label: 'Budgets',
        backgroundColor: colours[0],
        hoverBackgroundColor: colours[1],
        data: grouped.map(b => b.Amount)
        }
    ]
    }

    const options = {
        title: {
            display: true,
            text:'',
            fontSize:20
            },
        legend: {
            display: true,
            position:'right'
            }
    }

    const scale = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    return (
    <h2>
        <Doughnut
        data={state}
        options={options}
        />
        <Bar
                data={state}
                width={100}
                height={50}
                options={options, scale}
        />
    </h2>
    )
}
  

