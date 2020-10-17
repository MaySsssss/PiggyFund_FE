import React from 'react';
import { Header } from './components/common'
import { BrowserRouter as Router } from 'react-router-dom' 
import './App.css';
import Routers from './router/index'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routers />
      </Router>
    </div>
  );
}

export default App;
