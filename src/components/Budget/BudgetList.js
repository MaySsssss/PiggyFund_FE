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

        var x = transactions.length;
        transactions.forEach(function (t) {
            x += 10;
        });

            results.forEach(function (b) {
                    b.Progress += x;
            });

        results.forEach(function (b) {
            b.Progress = (b.Progress / b.Amount).toFixed(2);
        });

        return budgets;
    };

    const budgetsWithProgress = calculateProgress(budgets, transactions);

    return (
        <>
            <h3>Month</h3>
            <ul className="list">
                {budgetsWithProgress.map(budget => {
                    return (
                        <>
                            <Budget key={budget._id} budget={budget} />
                            {budget.Progress}
                            <div className="progressBar">
                                <div className="progress" style={{ width: 430 * budget.Progress }}></div>
                            </div>
                        </>
                    )
                })}
            </ul>
        </>
    );
}
