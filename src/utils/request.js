import axios from 'axios'
import store from '@/store'

//引入 vant 消息提示
import { Toast } from 'vant'
import {
  getToken
} from '@/utils/auth'
import defaultSettings from '@/settings'
import md5 from 'js-md5' // 引入 md5加密
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.

(async () => {
  // Get the visitor identifier when you need it.
  const localCode = localStorage.getItem('deviceCode')
  if (localCode !== undefined && localCode !== null && localCode !== '') {
    return localCode
  } else {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    var visitorId = result.visitorId
    localStorage.setItem('deviceCode', visitorId)
  }

})()

//判断 state 对象是否包含某个属性
// let lc_info= store.getters.userInfo
var staffNo = '2010195'
//vue 产生10位时间戳
let lc_timestamp = (new Date().getTime().toString());
lc_timestamp = lc_timestamp.substr(0, 10);
// end vue 产生10位时间戳
// MD5加密
let lc_sign = "CYDAP_com-group~Centa@" + lc_timestamp + staffNo;
let lc_md5 = md5(lc_sign);
// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //  baseURL: 'aplus_test',
  baseURL: process.env.NODE_ENV === 'production' ? 'aplus_test' : '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'platform': 'ios',
    'platform' : navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 ? 'android' : 'ios',
    'Centaline': '9527',
    'number': lc_timestamp,
    'sign': lc_md5,
    // 'staffno': 2016090007, 
    'staffno':staffNo,
    'token': `A2FC2F70-20E1-CFA7-7C5B-08D3F0C31277|AD757BE8-0886-CA9F-FE83-08D5A43679ED|${staffNo}|0A0EA5B4-571E-4B4A-B9AC-0157CBA85942|3F4374B7-35CA-473F-A471-CF34B8333211`,
    'phoneId': localStorage.getItem('deviceCode') // brwser only code
  }
  //timeout: 5000 // request timeout
})


// 移除空白參數
const removeEmpty = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}


// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {

    const {
      success,
      error_msg,
      data
    } = response.data
    if (success !== undefined && error_msg !== undefined && data !== undefined) {
      if (success) {
        return Promise.resolve(data)
      } else {
        // Message({
        //   message: error_msg || 'Error',
        //   type: 'error',
        //   duration: 0, //5 * 1000
        //   showClose: true,
        // })
        Toast.fail(error_msg || 'Error')
        return Promise.reject(new Error(error_msg || 'Error'))
      }
    } else { //非标准返回格式 直接放回data对象
      return Promise.resolve(response.data)
    }

  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

//在請求頭中移除空白參數
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (config.method === 'post') {
      config.data = removeEmpty(config.data)
    } else if (config.method === 'get') {
      config.params = removeEmpty(config.params)
    }
    return config
  }
  
)

export default service
