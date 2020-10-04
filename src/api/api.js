// 封装 axios

import axios from 'axios'
import { message } from 'antd'

export default function api(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      // axios.get() 相当于 new promise，后面直接使用.then() 方法
      promise = axios.get(url, {
        params: data // 指定请求参数
      })
    } else { // 发POST请求
      promise = axios.post(url, data)
    }
    promise.then(res => { // 成功
      resolve(res.data)
    }).catch(err => {  // 失败
      message.error('请求出错了: ' + err.message)
    })
  })
}
