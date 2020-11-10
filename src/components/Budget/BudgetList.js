import React, { useContext } from 'react';
import { Budget } from './Budget';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import { GlobalContext } from '../../context/GlobalState';
import moment from 'moment';
import './Progress.css';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);
    const { transactions } = useContext(GlobalContext);

    function checkMonth(t, b) {
        return "X".localeCompare("November 2020") == 0;
    }

    function calculateProgress(budgets, transactions) {
        var results = [];

        budgets.forEach(function (b) {
            var bCopy = JSON.parse(JSON.stringify(b));
            bCopy.Progress = 0;
            results.push(bCopy);
        });

        results.forEach(function (b) {
            b.Progress = 1;
            const amounts = transactions
                .filter(t => checkMonth(t, b))
                .map(transaction => transaction.Amount);
            const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += Math.round(item)), 0).toFixed(2);
            b.Progress += income;
        });

        results.forEach(function (b) {
            b.Progress /= b.Amount;
        });

        return results;
    };

    const budgetsWithProgress = calculateProgress(budgets, transactions);
    function progress(budget) {
        if (budget.Progress < 1) {
            return (<div className="progress" style={{ width: 430 * budget.Progress }}></div>);
        } else {
            return (<div className="progress_exceeded"></div>);
        }
    };

    return (
        <>
            <h3>Month</h3>
            <ul className="list">
                {budgetsWithProgress.map(budget => {
                    return (
                        <>
                            <Budget key={budget._id} budget={budget} />
                            {(100 * budget.Progress).toFixed(2) + '%'}
                            <div className="progressBar">
                                {progress(budget)}
                            </div>
                        </>
                    )
                })}
            </ul>
        </>
    );
}
