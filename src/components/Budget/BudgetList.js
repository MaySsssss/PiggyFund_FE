import React, { useContext } from 'react';
import { Budget } from './Budget';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import { GlobalContext } from '../../context/GlobalState';
import './Progress.css';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);
    const { transactions } = useContext(GlobalContext);

    function calculateProgress(budgets, transactions) {
        var results = [];

        budgets.forEach(function (b) {
            results.push(b);
            results[results.length - 1].Progress = 0;
        });

        transactions.forEach(function (t) {
            results.forEach(function (b) {
                if (b.Category.localeCompare(t.Category)) {
                    b.Progress += t.Amount;
                }
            });
        });

        results.forEach(function (b) {
            b.Progress /= b.Amount;
        });

        return budgets;
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
