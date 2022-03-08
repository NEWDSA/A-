import axios from 'axios'

//引入 vant 消息提示
import {
  Toast
} from 'vant'
import defaultSettings from '@/settings'
import md5 from 'js-md5' // 引入 md5加密
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {
  getUser
} from '@/utils/auth'

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

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'aplus_test' : '',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'platform': navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 ? 'android' : 'ios',
    'Centaline': '9527',
    'phoneId': localStorage.getItem('deviceCode') // brwser only code

  }
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

// request interceptor
service.interceptors.request.use(
  config => {
    // 获取缓存的用户信息
    var userInfo = getUser();
    // 如果已经跳转获取用户的，则请求Header中传递StaffNo和Token参数
    if (userInfo && userInfo != null) {
      // end vue 产生10位时间戳
      let lc_timestamp = (new Date().getTime().toString());
      lc_timestamp = lc_timestamp.substr(0, 10);
      // MD5加密
      let lc_sign = "CYDAP_com-group~Centa@" + lc_timestamp + userInfo.StaffNo;
      let lc_md5 = md5(lc_sign);
      // 时间搓及加密用户认证
      config.headers['number'] = lc_timestamp;
      config.headers['sign'] = lc_md5;
      // 用户工号及用户Token
      config.headers['staffno'] = userInfo.StaffNo;
      config.headers['token'] = userInfo.Token;
    }
    //在請求頭中移除空白參數
    if (config.method === 'post') {
      config.data = removeEmpty(config.data)

    } else if (config.method === 'get') {
      config.params = removeEmpty(config.params)
    }
    // 設置請求超時
    config.timeout = 10000

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error).then(err => {
      Toast.fail(err.message)
    })

  }
)

// response interceptor
service.interceptors.response.use(
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
        Toast.fail(error_msg || 'Error')
        return Promise.reject(new Error(error_msg || 'Error'))
      }
    } else { //非标准返回格式 直接放回data对象
      return Promise.resolve(response.data)
    }

  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)
export default service
