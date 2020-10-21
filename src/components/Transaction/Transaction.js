import React, {useContext} from 'react';
import { GlobalContext } from '../../context/GlobalState'
import Moment from 'react-moment';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.Amount < 0 ? '-' : '+';

  return (
    <li className={transaction.Amount < 0 ? 'minus' : 'plus'}>
      {transaction.Category} 
      <p><Moment format="YYYY:MM:DD HH:mm:ss">{transaction.Time}</Moment></p>
      <span>{sign}${Math.abs(transaction.Amount)}</span>
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  )
}
