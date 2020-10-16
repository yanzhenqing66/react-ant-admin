/*
  接收页面更改
*/
import { reqLogin } from '../api'
import storageUtil from '../utils/storageUtil'
import { SET_HEADER_TITLE, RECEIVE_USER, ERROR_MSG, LOGOUT, ADD_CATEGORYS } from './action-types'

// 触发事件，分发标题
export const setHeaderTitle = (title) => ({ type: SET_HEADER_TITLE, data: title })
// 用户请求成功
export const receiceUser = (user) => ({ type: RECEIVE_USER, user })
// 用户请求失败
export const errorMsg = (errorMsg) => ({ type: ERROR_MSG, errorMsg })
// 退出登录
export const logout = () => {
  storageUtil.removeUser() // 删除local中的信息
  return { type: LOGOUT }
}
// 登录的异步action
export const login = (username, password) => {
  return async dispatch => {
    const res = await reqLogin({ username, password })
    if (res.status === 0) {
      const user = res.data
      storageUtil.saveUser(user)
      dispatch(receiceUser(user))
    } else {
      const msg = res.msg
      dispatch(errorMsg(msg))
    }
  }
}