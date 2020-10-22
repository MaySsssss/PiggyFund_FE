import React from 'react';
import { Header } from '../components/Header';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { Link } from 'react-router-dom';
import { AddTransaction } from '../components/AddTransaction';

import { GlobalProvider } from '../context/GlobalState';

import './Tracket.css'

function Tracket() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
        <button className='back-btn'>
            <Link to={`/`}>Back</Link>
        </button>
      </div>
    </GlobalProvider>
  );
}

export default Tracket;
