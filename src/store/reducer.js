/*
  接收状态返回，新的状态，处理状态的地方
*/
import { combineReducers } from 'redux'
import { SET_HEADER_TITLE, RECEIVE_USER, ERROR_MSG, LOGOUT } from './action-types'
const { default: storageUtil } = require("../utils/storageUtil")


// 头部标题状态
const initHeaderTitle = '首页'
const headerTitle = (state = initHeaderTitle, action) => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}

// 用户信息状态
const initUser = storageUtil.getUser()
const user = (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case ERROR_MSG:
      const errorMsg = action.errorMsg
      return { ...state, errorMsg }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  headerTitle,
  user
})