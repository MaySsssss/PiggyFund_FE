import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import './App.css';
import Home from './pages/Home'
import Tracker from './pages/Tracket'
import { AddTransaction } from './components/AddTransaction';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tracker" exact component={Tracker} />
          <Route path="/addTransaction" exact component={AddTransaction} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
