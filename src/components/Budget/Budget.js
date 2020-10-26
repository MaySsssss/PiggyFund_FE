import React, {useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState_budget';

export const Budget = ({ budget }) => {
  const { deleteBudget } = useContext(GlobalContext);

  return (
    <li className={'minus'}>
      {budget.Category} 
      <span>-${Math.abs(budget.Amount)}</span>
      <button onClick={() => deleteBudget(budget._id)} className="delete-btn">x</button>
    </li>
  )
}
