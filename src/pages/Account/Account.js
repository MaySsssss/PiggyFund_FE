import React, { Component } from 'react';
import cookie from 'react-cookies'

export default class Account extends Component {
  state = {
    rates: [],
    currencies: [],
    baseCurrency: 'AUD'
  };

  componentDidMount() {
    this.callAPI('AUD')
  }

  callAPI = async(base) => {
    try {
      let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
      let data = await res.json();
      let rate = data['rates']
      let sort_curr = Object.keys(data['rates']).sort()
      this.setState({
        rates: rate,
        currencies: sort_curr
      })

      if (cookie.load('currency') == null) {
        cookie.save('currency', 'AUD', { path: '/' })
        cookie.save('rate', rate['AUD'], { path: '/' })
      }

    } catch (err) {
      console.log(err);
    }
  } 

  changeBaseCurrency = (e) => {
    const { rates } = this.state;
    this.setState({ baseCurrency: e.target.value});
    cookie.save('currency', e.target.value, { path: '/' })
    cookie.save('rate', rates[e.target.value], { path: '/' })
  }

  render() {
    const { currencies } = this.state;

    const currencyChoice = currencies.map(currency =>
      <option key={currency} value={currency}> {currency} </option>      
    );
    return (
      <div>
        <select  value={cookie.load('currency')} onChange={this.changeBaseCurrency}>
          {currencyChoice}
          <option>{cookie.load('currency')}</option>
        </select>
      </div>
    );
  }
}
