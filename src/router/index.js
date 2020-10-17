import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom' 
import Home from '../pages/Home/Home'
import Tracker from '../pages/Tracker/Tracker'
import Budget from '../pages/Budget/Budget'
import Export from '../pages/Export/Export'
import Account from '../pages/Account/Account'

function index() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tracker" exact component={Tracker} />
          <Route path="/budget" exact component={Budget} />
          <Route path="/export" exact component={Export} />
          <Route path="/account" exact component={Account} />
        </Switch>
    </div>
  );
}

export default index;
