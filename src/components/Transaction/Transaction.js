import React from 'react';
import Moment from 'react-moment';
import cookie from 'react-cookies'

import { notification } from 'antd';

export const Transaction = ({ transaction }) => {

  function deleteTransaction(id) {
    fetch(`http://be-4920.herokuapp.com/deletespending?id=${id}`)
      .then(console.log('delete', id))
      .catch(error => 
        console.log(error)
      )
  }

  function openNotificationWithIcon(type) {
    notification[type]({
      message: 'Delete',
      description:
        'Delete Transcation Successfully',
    });
  };

  const sign = transaction.newAmount < 0 ? '-' : '+';

  let currency = cookie.load('currency');

  return (
    <li className={transaction.newAmount < 0 ? 'minus' : 'plus'}>
      {transaction.Category} 
      <p><Moment format="YYYY:MM:DD HH:mm:ss">{transaction.Time}</Moment></p>
      <span>{sign}{Math.abs(transaction.newAmount)} {currency}</span>
      <button 
        onClick={() => {deleteTransaction(transaction._id); openNotificationWithIcon('warning')}} 
        className="delete-btn">
          x
      </button>
    </li>
  )
}
