// 将登录信息保存到浏览器
// import store from 'store'

export default {
  // 保存
  saveUser(user) {
    localStorage.setItem('user_key', JSON.stringify(user))
    // store.set('user_key', user)
  },

  // 获取
  getUser() {
    return JSON.parse(localStorage.getItem('user_key') || '{}')
    // return store.get('user_key') || {}
  },

  // 删除
  removeUser() {
    localStorage.removeItem('user_key')
    // store.remove('user_key')
  }
}