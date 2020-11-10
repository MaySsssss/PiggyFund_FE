import React, { useContext } from 'react';
import { Budget } from './Budget';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import { GlobalContext } from '../../context/GlobalState';
import moment from 'moment';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);
    const { transactions } = useContext(GlobalContext);

    function checkMonth(t, b) {
        return moment(t.Time.split("T")[0], "YYYY-MM-DD").format("MMMM YYYY").localeCompare(b.Month + moment().format(" YYYY")) == 0;
    };

    budgets.forEach(function (b) {
        var filtered = transactions.filter(t => checkMonth(t, b));
        const amounts = filtered.map(transaction => transaction.Amount);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += Math.round(item)), 0).toFixed(2);
        b.Spent = 1 + income;
    });

    budgets.forEach(function (b) {
        b.Progress = b.Spent/b.Amount;
    });

    return (
        <>
            <h3>Month</h3>
            <ul className="list">
                {budgets.map(budget => {
                    return (
                        <Budget key={budget._id} budget={budget} />
                    )
                })}
            </ul>
        </>
    );
}
