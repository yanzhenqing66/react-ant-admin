import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import momeryUtil from '../../utils/momeryUtil'
import storageUtil from '../../utils/storageUtil'
import { formateDate } from '../../utils/dateUtil'
import menuList from '../../config/menuConfig'
import { reqWeather } from '../../api'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './header.less'

class Header extends Component {
  state = {
    curTime: formateDate(Date.now()),   //当前时间
    dayPictureUrl: '',   //天气图片
    weather: '',  // 天气情况
  }
  // 获取天气数据
  getPicUrl = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({ dayPictureUrl, weather })
  }
  setCurTime = () => {
    // 每隔1s更新一次当前时间
    this.intervalId = setInterval(() => {
      const curTime = formateDate(Date.now())
      this.setState({ curTime })
    }, 1000)
  }
  // 根据地址获取title
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  // 退出
  logout = () => {
    // 弹出退出对话框
    Modal.confirm({
      title: '是否确定要退出？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 清除本地 user 用户信息
        storageUtil.removeUser()
        momeryUtil.user = {}
        // 清除状态改变的定时器
        clearInterval(this.intervalId)
        // 跳转路由，到登录页面
        this.props.history.replace('/login')
      },
    });
  }
  componentDidMount() {
    this.getPicUrl()
    this.setCurTime()
  }
  render() {
    const { curTime, dayPictureUrl, weather } = this.state
    const username = momeryUtil.user.username
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>你好，{username}</span>
          <Button type="link" onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">{title}</div>
          <div className="bottom-right">
            <span className="time">{curTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)