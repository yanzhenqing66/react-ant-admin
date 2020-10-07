import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom'
import momeryUtil from '../../utils/momeryUtil'
import { Layout } from 'antd';
import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'

// 引入组件路由
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const user = momeryUtil.user
    if (!user || !user._id) {
      return <Redirect to='/login'></Redirect>
    }
    return (
      <Layout style={{ height: '100%', backgroundColor: '#ddd' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{backgroundColor: '#fff', margin: '25px 20px 0 20px' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#aaa' }}>建议使用谷歌浏览器，浏览更加顺畅</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;