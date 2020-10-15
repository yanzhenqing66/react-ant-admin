/*
  redux 最核心的，管理状态的地方
*/
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'   // 实现异步加载
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))