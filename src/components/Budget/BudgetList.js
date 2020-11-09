import React, { useContext } from 'react';
import { Budget } from './Budget';
import moment from 'moment';

import { GlobalContext_budget } from '../../context/GlobalState_budget';

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);

    return (
        <>
            <h3>Month</h3>
            <ul className="list">
                {budgets.map(budget => {
                    return (
                        <>
                            <div className="warp">
                                <Budget key={budget._id} budget={budget} />
                                <div className="progressBar">
                                    <div className="progress" style={{width: 1}}></div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </ul>
        </>
    )
}
