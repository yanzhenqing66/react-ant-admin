// 请求接口，导出函数方法

import api from './api'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''
// 登录请求
export const reqLogin = payload => api(BASE + '/login', payload, 'POST')

// 天气请求
export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if(!err) {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else {
        message.error('获取天气信息失败')
      }
    })
  })
}