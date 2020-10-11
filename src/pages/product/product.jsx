import React, { Component } from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import ProductHome from './product-home'
import Detail from './detail'
import AddUpdate from './add-update'

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome} />
        <Route path="/product/detail" component={Detail} />
        <Route path="/product/addupdate" component={AddUpdate} />
        <Redirect to="/product" />
      </Switch>
    )
  }
}
