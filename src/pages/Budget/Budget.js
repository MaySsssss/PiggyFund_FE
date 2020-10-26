import React, { Component } from 'react'
import { Chart } from '../../components/Budget/Chart';
import { BudgetList } from '../../components/Budget/BudgetList';
import { GlobalProvider } from '../../context/GlobalState_budget';

export default class Budget extends Component {
    state = {
      error: null,
      isLoaded: false,
      items: []
    };

  componentDidMount() {
    this.getItems()
  }

  getItems = _ => {
      fetch(`https://ballistic-circular-parent.glitch.me/getallbudget`)
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

    render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (<>
            <GlobalProvider>
                <div className="container">
                    <div>
                        {items.map(item => (
                        <li key={item._id}>
                            ID: {item._id} {item.Category} {item.Amount} {item.Currency}
                        </li>
                        ))}
                    </div>
                    <Chart />
                    <BudgetList />
                </div>
            </GlobalProvider>
        </>);
    }
    }
}

 