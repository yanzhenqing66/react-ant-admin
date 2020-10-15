import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { login } from '../../store/actions'
import './login.less'
import logo from '../../assets/images/logo.png'

class Login extends Component {
  // 表单验证，获取请求
  onFinish = async (values) => {
    const { username, password } = values
    this.props.login(username, password)
  }
  render() {
    const user = this.props.user
    if (user && user._id) {
      return <Redirect to='/home'></Redirect>
    }
    const errorMsg = this.props.user.errorMsg
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <section className="login-content">
          <div className="errmsg">{errorMsg}</div>
          <h2>用户登录</h2>
          <Form
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              initialValue="admin"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 4, message: '密码长度不能小于4位' },
                { max: 12, message: '密码长度不能大于12位' },
                { max: 12, message: '密码长度不能大于12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)