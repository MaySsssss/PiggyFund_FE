import React, { Component } from 'react'

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
    fetch(`https://be-4920.herokuapp.com/getall`)
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
      return (
        <div>
          {items.map(item => (
            <li key={item._id}>
              ID: {item._id} {item.category} {item.amount} {item.currency} {item.Time}
            </li>
          ))}
        </div>
      );
    }
  }
}

 