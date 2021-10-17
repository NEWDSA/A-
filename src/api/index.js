import axios from "axios";
import router from "@/router";
import store from '@/router/index';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 10000,
    responseType: 'json'
})

api.interceptors.response.use(
    response => {
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 假设返回数据格式为：{ status: 1, error: '', data: '' }
         * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 error 会返回错误信息
         * 则代码如下
         */
        if (response.data.status === 1) {
            if (response.data.error === '') {
                // 请求成功并且没有报错
                return Promise.resolve(response.data)
            } else {
                // 这里做错误提示，如果使用了 element ui 则可以使用 Message 进行提示
                // Message.error(options)
                return Promise.reject(response.data)
            }
        } else {
            toLogin()
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default api