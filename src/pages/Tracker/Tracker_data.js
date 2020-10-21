import React, { Component } from 'react'
import { input } from 'react-router-dom'

export default class Tracker_data extends Component {
    state = {
      error: null,
      isLoaded: false,
      items: [],
      datas: {
        amount: 0,
        category: ""
      }
    };

  componentDidMount() {
    this.getItems()
  }

  getItems = _ => {
    fetch(`https://ballistic-circular-parent.glitch.me/getall?fbclid=IwAR3I5jHaJwcConYQarRy4lngs-q0ozRyINwpTgWZZRKL-_T5rWeZnHwbtCY`)
      .then(response => response.json())
      .then(response => 
        this.setState({ 
          isLoaded: true,
          items: response 
        }))
      .catch(error => 
        this.setState({
          isLoaded: true,
          error: error
        })
      )
  }

  addItems = _ => {
    const { datas } = this.state;
    fetch(`https://ballistic-circular-parent.glitch.me/spending?category=${datas.category}&amount=${datas.amount}&fbclid=IwAR3ruVBFMXI2d-mgnolt0OCgP3UPI2i2ogs_HNDtVGEjgWbzN8XDpzsKK6w`)
      .then(console.log('Add item success'))
      .then(this.getItems)
      .catch(error => 
        this.setState({
          isLoaded: true,
          error: error
        })
      )
  }

  render() {
    const { error, isLoaded, items, datas } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {items.map(item => (
            <li key={item._id}>
              ID: {item._id} {item.category} {item.amount} {item.currency} {item.Time}
            </li>
          ))}

          <label>
            Category:
              <input 
                value={datas.category} 
                onChange={e => this.setState({ datas: { ...datas, category: e.target.value}})}
              />
          </label>
          <label>
            Amount:
            <input 
              value={datas.amount} 
              onChange={e => this.setState({ datas: { ...datas, amount: e.target.value}})}
            />
          </label>
          <br />
          <button onClick={this.addItems}>Add Item</button>
        </div>
      );
    }
  }
}
