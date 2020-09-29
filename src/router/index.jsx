import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'

class AppRouter extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route exact path='/' component={Admin}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRouter;