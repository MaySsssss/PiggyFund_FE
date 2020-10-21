import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer';

const ITME_API = `https://ballistic-circular-parent.glitch.me/getall?fbclid=IwAR3I5jHaJwcConYQarRy4lngs-q0ozRyINwpTgWZZRKL-_T5rWeZnHwbtCY`

// Initial state
const initialState = {
  transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const url = `${ITME_API}`
      const response = await fetch(url)
      const data = await response.json()
      setList(data)
      state.transactions = list
      // console.log(state.transactions)
    }
    fetchData()
  })

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

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}