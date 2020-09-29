import React, { Component } from 'react';
import './login.less'
import Logo from '../../assets/images/logo.png'

class Login extends Component {
  
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={Logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section>

        </section>
      </div>
    );
  }
}

export default Login;