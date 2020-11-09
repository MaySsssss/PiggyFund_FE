import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer_budget';
import moment, { months } from 'moment';
import { Header } from '../components/Budget/Header';

function onOk(value) {
    console.log('onOk: ', value);
}

var ITME_API = `https://be-4920.herokuapp.com/getallbudget`

// Initial state
const initialState = {
    budgets: [],
    month: moment().format('MMMM')
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${ITME_API}`
            const response = await fetch(url)
            const data = await response.json()
            setList(data)
            state.budgets = list
        }
        fetchData()
    });

  // Actions
    const setMonthToDisplay = function(month) {
        state.month = month;
    };

    return (<GlobalContext.Provider value={{
        budgets: state.budgets.filter(budget => { return budget.Month.localeCompare(state.month) == 0; })
    }}>
        <Header />
        <select
            onChange={e => setMonthToDisplay(e.target.value)}
            onOk={onOk}
        >
            {months().map(month => {
                if (moment().format('MMMM').localeCompare(month) == 0) {
                    return (<option value={month} selected>{month}</option>)
                } else {
                    return (<option value={month}>{month}</option>)
                }
            })}
        </select>
        {children}
  </GlobalContext.Provider>);
}