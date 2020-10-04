import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router'
import momeryUtil from './utils/momeryUtil'
import storageUtil from './utils/storageUtil'

const user = storageUtil.getUser()
momeryUtil.user = user

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);
