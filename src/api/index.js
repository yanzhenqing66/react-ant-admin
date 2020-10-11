// 请求接口，导出函数方法

import api from './api'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''
// 登录请求
export const reqLogin = payload => api(BASE + '/login', payload, 'POST')

// 天气请求 jsonp跨域
export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (!err) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}


/*
品类管理
*/
// 一级分类列表
export const reqCategorys = payload => api(BASE + '/manage/category/list', payload)
// 添加分类列表
export const reqAddcate = payload => api(BASE + '/manage/category/add', payload, 'POST')
// 更新品类名称
export const reqUpdatecate = payload => api(BASE + '/manage/category/update', payload, 'POST')

/*
商品管理
*/
// 商品列表
export const reqProducts = payload => api(BASE + '/manage/product/list', payload)
// 搜索商品
export const reqSearchproducts = payload => api(BASE + '/manage/product/search', payload)
// 删除图片 
export const reqDelPic = payload => api(BASE + '/manage/img/delete', payload, 'POST')
// 上传商品
export const reqAddproduct = payload => api(BASE+ '/manage/product/add', payload, 'POST')
// 改变状态
export const reqUpdStatus = payload => api('/manage/product/updateStatus', payload, 'POST')