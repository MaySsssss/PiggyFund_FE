import React, { useContext } from 'react';
import { Budget } from './Budget';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
// import { GlobalContext } from '../../context/GlobalState';
import cookie from 'react-cookies'
import moment from 'moment';

import './Progress.css';

export const trackerData = () => {
    return cookie.load('trackerData')
}

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);
    const transactions = JSON.parse(localStorage.trackerData);

    const convertToCurrency = cookie.load('currency');
    const storage = window.localStorage;
    const rates = JSON.parse(storage.rates);

    function calculateProgress(budgets, transactions) {
        var results = [];

        budgets.forEach(function (b) {
            results.push(b);
            results[results.length - 1].Progress = 0;
            results[results.length - 1].Spent = 0;
        });

        transactions.forEach(function (t) {
            results.forEach(function (b) {
                if (b.Category.toUpperCase().localeCompare(t.Category.toUpperCase()) === 0 && b.Month === moment(t.Time).format('MMMM')) {
                    var cost = parseFloat(t.Amount).toFixed(2)
                    b.Spent -= cost;
                }
            });
        });

        results.forEach(function (b) {
            var newSpent = parseFloat(b.Spent * rates[convertToCurrency]).toFixed(2);
            var newAmount = parseFloat(b.Amount * rates[convertToCurrency]).toFixed(2);
            b.Progress = newSpent / newAmount;
            b.Spent = b.Progress * newAmount;
            // b.Progress = b.Spent / b.Amount;
            // b.Spent = b.Progress * b.Amount;
        });

        return budgets;
    };

    const budgetsWithProgress = calculateProgress(budgets, transactions);

    function budgetListContent(budgets) {
        if (budgets.length == 0) {
            return (<p>There is no budget in this month.</p>);
        } else {
            return (budgets.map(budget => {
                return (
                    <Budget key={budget._id} budget={budget} />
                )
            }));
        }
    }

    return (
        <>
            <h3>Budgets</h3>
            <ul className="list">
                {budgetListContent(budgetsWithProgress)}
            </ul>
        </>
    );
}
