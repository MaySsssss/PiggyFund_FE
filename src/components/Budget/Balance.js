import React, { useContext } from 'react';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import cookie from 'react-cookies'
import moment from 'moment';

export const trackerData = () => {
    return cookie.load('trackerData')
}

export const Balance_budget = () => {
//   const { transactions } = useContext(GlobalContext);
  const { budgets } = useContext(GlobalContext_budget);

  const amounts = budgets.map(budgets => budgets.Amount);


    function calculateProgress(budgets) {
        const transactions = trackerData();
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

        // const convertToCurrency = cookie.load('currency');
        const rates = cookie.load('rate');

        let total = [];
        total.spent = 0;
        total.amount = 0;
        results.forEach(function (b) {
            var newSpent = parseFloat(b.Spent * rates).toFixed(2);
            var newAmount = parseFloat(b.Amount * rates).toFixed(2);
            b.Progress = newSpent / newAmount;
            b.Spent = b.Progress * newAmount;
            b.newAmount = newAmount;
            total.amount += b.Amount;
            total.spent += b.Spent;
        });

        // budgets.total_spent = total_spent;
        // budgets.total_amount = total_amount;

        return total;
    };


  const total = calculateProgress(budgets)

  return (
    <>
      {/* <h3>Your Budget</h3> */}
      <h1>{total}</h1>
      <div className="inc-exp-container-budget">
        <div>
          <h4>Expense</h4>
          <p className="money minus">{total.spent}</p>
        </div>
        <div>
          <h4>Total</h4>
          <p className="money plus">{total.amount}</p>
        </div>
      </div>
    </>
  )
}
