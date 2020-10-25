import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer_budget';

const ITME_API = `https://be-4920.herokuapp.com/getallbudget`

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
  function deleteBudget(id) {
    dispatch({
      type: 'DELETE_BUDGET',
      payload: id
    });
  }

  function addBudget(budget) {
    dispatch({
      type: 'ADD_BUDGET',
      payload: budget
    });
  }

  return (<GlobalContext.Provider value={{
    budgets: state.budgets,
    deleteBudget,
    addBudget
  }}>
    {children}
  </GlobalContext.Provider>);
}