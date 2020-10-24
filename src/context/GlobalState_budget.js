import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer';

const ITME_API = `https://be-4920.herokuapp.com/getallbudget?fbclid=IwAR0C2suqYyAyUjzer7qjKHPLS8KvLKZILbE8LSGiOIXCiKfjkVVqNf-mTJs`

// Initial state
const initialState = {
  budgets: []
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
      state.budgets = list
    }
    fetchData()
  })

  // Actions
    /*
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
  }*/

  return (<GlobalContext.Provider value={{
    budgets: state.budgets/*,
    deleteTransaction,
    addTransaction*/
  }}>
    {children}
  </GlobalContext.Provider>);
}