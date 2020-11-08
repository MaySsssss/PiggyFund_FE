import React, { Component } from 'react'
import { Header } from '../../components/Budget/Header';
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
      fetch(`https://be-4920.herokuapp.com/getallbudget?fbclid=IwAR0C2suqYyAyUjzer7qjKHPLS8KvLKZILbE8LSGiOIXCiKfjkVVqNf-mTJs`)
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
            <Header />
                <div className="container">

                  <div className="left_container">
                    <Chart />
                    <button className='back-btn' onClick={this.showDrawer} type="primary">Add Budget</button>
                  </div>

                  <div className="right_container">
                    <BudgetList />
                  </div>

                </div>
            </GlobalProvider>
        </>);
    }
    }
}

 