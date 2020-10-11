import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu} from 'antd';
import menuList from '../../config/menuConfig'

import Logo from '../../assets/images/logo.png'
import './left-nav.less'


const { SubMenu } = Menu;

class LeftNav extends Component {
  // 渲染左侧导航菜单
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        // 判断子节点的路由是否被打开
        // 使用find查找子路由中的key是否和被打开的key 是否一致
        const cItem = item.children.find(cItem => path.includes(cItem.key))
        if(cItem) {  // 若果子路由中的key被打开，则说明被打开的子路由的父路由被打开
          this.openKey = item.key
        }
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname
    if(path.includes('/product')) {
      path = '/product'
    }
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={Logo} alt="logo" />
          <h1>电商后台</h1>
        </Link>
        {/* 左侧导航栏 */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}


// withRouter 是一个高阶组件，可以通过包装非路由组件，让它变成路由组件
export default withRouter(LeftNav)
