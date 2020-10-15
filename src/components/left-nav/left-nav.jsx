import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { connect } from 'react-redux'

import menuList from '../../config/menuConfig'
import { setHeaderTitle } from '../../store/actions'

import Logo from '../../assets/images/logo.png'
import './left-nav.less'


const { SubMenu } = Menu;

class LeftNav extends Component {
  /*
  判断当前登陆用户对item是否有权限
   */
  hasAuth = (item) => {
    // 取出 路由地址 key, 和公共的属性
    const { key, isPublic } = item
    // 获取redux中的管理状态 user
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if (username === 'admin' || isPublic || menus.includes(key)) {
      return true
    } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
      return item.children.find(child => menus.includes(child.key))
    }
    return false
  }

  // 渲染左侧导航菜单
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (this.hasAuth(item)) {
        // 向pre添加<Menu.Item> 一级选项菜单
        if (!item.children) {
          // 判断 如果选中的地址和路由的地址相同
          if (item.key === path || path.includes(item.key)) {
            this.props.setHeaderTitle(item.title)
          }
          pre.push((
            <Menu.Item key={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.includes(cItem.key))
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.key
          }
          // 向pre添加<SubMenu> 二级选项菜单
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    let path = this.props.location.pathname
    if (path.includes('/product')) {
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
// connect 是高阶组件，可以让他拥有redux的属性（props）
export default connect(
  state => ({ user: state.user }),
  { setHeaderTitle }
)(withRouter(LeftNav))
