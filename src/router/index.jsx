import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'

class AppRouter extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Admin}></Route>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default AppRouter;