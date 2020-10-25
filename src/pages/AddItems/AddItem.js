import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './AddItem.css'

import { DatePicker, Space } from 'antd';

function onOk(value) {
  console.log('onOk: ', value);
}

export default class AddItem extends Component {
  state = {
    error: null,
    isLoaded: false,
    datas: {
      amount: "",
      category: ""
    },
    date: ""
  };

  addItems = _ => {
    const { datas, date } = this.state;
    fetch(`https://ballistic-circular-parent.glitch.me/spending?category=${datas.category}&amount=${datas.amount}&fbclid=IwAR3ruVBFMXI2d-mgnolt0OCgP3UPI2i2ogs_HNDtVGEjgWbzN8XDpzsKK6w&time=${date}`)
      .then(console.log('Add item success'))
      .catch(error => 
        this.setState({
          isLoaded: true,
          error: error
        })
      )
  }

  onChange = (value, dateString) => {
    // const { date } = this.state;
    // console.log('Selected Time: ', value.toISOString());
    // console.log('Formatted Selected Time: ', dateString);
    this.setState({
      date: value.toISOString()
    })
    // console.log('Date: ', date)
  }

  render() {
    const { datas } = this.state;
    return (
      <div>
        <div className="additem-input">
          
            <label htmlFor="text">
              Select a date:
            </label> 
            <DatePicker 
              style={{ width: 330 }}
              // showTime 
              size="large" 
              onChange={this.onChange} 
              onOk={onOk} 
            />
         
        </div>
        <div className="additem-input">
          <label htmlFor="text">
            Category:
          </label>
          <input 
              type="text"
              placeholder="Enter catagory..." 
              value={datas.category} 
              onChange={e => this.setState({ datas: { ...datas, category: e.target.value}})}
            />
        </div>
        <div className="additem-input">
          <label htmlFor="amount">
            Amount:
          </label>
          <input 
            type="number"
            placeholder="Enter Amount..." 
            value={datas.amount} 
            onChange={e => this.setState({ datas: { ...datas, amount: e.target.value}})}
          />
        </div>
        <br />
        <Link to="/tracker/">
          <button className='additem-btn' onClick={this.addItems} type="primary">Add Item</button>
        </Link>
        <br />
        <Link to="/tracker/">
          <button className='additem-btn' type="primary">Back to tracker</button>
        </Link>
      </div>
    );
  }
}
