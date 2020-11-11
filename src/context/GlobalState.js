import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer';
import moment, { months } from 'moment';
import cookie from 'react-cookies'
import { Header } from '../components/Transaction/Header';

const ITME_API = `https://be-4920.herokuapp.com/getall`

// Initial state
const initialState = {
  transactions: [],
  all_transactions: [],
  month: moment().format('MMMM')
}

// Create context
export const GlobalContext = createContext(initialState);

export const loginUser = () => {
  return cookie.load('userInfo')
}


// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
    const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const url = `${ITME_API}`;
        const response = await fetch(url);
        const data = await response.json();
        setList(data);
        state.all_transactions = list;
        state.transactions = list.filter(transaction => { return moment(transaction.Time).format('MMMM').localeCompare(state.month) === 0; })
            .sort(function (a, b) { return moment(a.Time).diff(moment(b.Time)); });
      // console.log(state.transactions)
      // console.log(state.transactions.Time)
    }
    fetchData()
  })

  const convertToCurrency = cookie.load('currency');
  const storage = window.localStorage;
  const rates = JSON.parse(storage.rates);

  function getRemoval(arr1) {
    let arr = [...arr1];
    let newarr = [];
    let userid = loginUser();

    for (const value of arr) {
        if (value.UserID === parseInt(userid)) {
          let baseAmount = parseFloat(value.Amount).toFixed(2)
          let res = parseFloat(baseAmount * rates[convertToCurrency]).toFixed(2);
          value.newAmount = res.toString()
          newarr.push(value);
        }
    }

    let storage = window.localStorage;
    storage.trackerData = JSON.stringify(newarr);
    return newarr;
  }

  function getRemovalAll(arr1) {
    let arr = [...arr1];
    let newarr = [];
    let userid = loginUser();
    for (const value of arr) {
        if (value.UserID === parseInt(userid)) {
          newarr.push(value);
        }
    }
    // let storage = window.localStorage;
    // storage.trackerData = JSON.stringify(newarr);

    return newarr;
  }

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  const setMonthToDisplay = function(month) {
    state.month = month;
  };
  

  return (<GlobalContext.Provider value={{
    transactions: getRemoval(state.transactions),
    all_transactions: getRemovalAll(state.all_transactions),
    // transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    <Header />
  
    <select
      onChange={e => setMonthToDisplay(e.target.value)}
    >
      {months().map(month => {
          if (moment().format('MMMM').localeCompare(month) === 0) {
              return (<option value={month} selected>{month}</option>)
          } else {
              return (<option value={month}>{month}</option>)
          }
      })}
    </select>

    
    {children}
  </GlobalContext.Provider>);
}