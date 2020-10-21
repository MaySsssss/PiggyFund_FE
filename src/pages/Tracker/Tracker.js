import React from 'react';
import { Header } from '../../components/Transaction/Header';
import { Balance } from '../../components/Transaction/Balance';
import { IncomeExpenses } from '../../components/Transaction/IncomeExpenses';
import { TransactionList } from '../../components/Transaction/TransactionList';
import { Link } from 'react-router-dom';

import { GlobalProvider } from '../../context/GlobalState';

import './Tracker.css'

function Tracker() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <Link to="/additems">
          <button className='back-btn' type="primary">Add Transcation</button>
        </Link>
      </div>
    </GlobalProvider>
  );
}

export default Tracker;
