import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import AppRouter from './router'
import store from './store/store'
import momeryUtil from './utils/momeryUtil'
import storageUtil from './utils/storageUtil'

const user = storageUtil.getUser()
momeryUtil.user = user

ReactDOM.render(
  (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  ),
  document.getElementById('root')
);
