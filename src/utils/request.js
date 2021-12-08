import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'


/**
 * @description: 请求方法
 * @param {type} 
 * @return: 
 */
// create an axios instance
var service = axios.create({
  baseURL: "", // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  function (config) {
    // do something before request is sent
    return config
  },
  function (error) {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  function (response) {
    var res = response.data
    return res
  },
  function (error) {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
