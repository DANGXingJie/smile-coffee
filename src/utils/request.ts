import axios from 'axios'
import type { AxiosAdapter, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
//axios适配小程序
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter as any

// 导出Request类，可以用来自定义传递配置来创建实例
class HttpRequest {
  baseURL: string
  timeout: number
  constructor(baseURL: string) {
    this.baseURL = baseURL || import.meta.env.VITE_BASE_URL
    this.timeout = 6000
  }
  request<T = any>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // axios 实例
    const instance: AxiosInstance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }
  get<T = any>(url: string, data?: any, outHeaders = {}): Promise<AxiosResponse<T>> {
    return this.request<T>({
      method: 'get',
      url,
      params: { ...data }, // get参数可以直接展开
      headers: {},
    })
  }

  post<T = any>(url: string, body = {}, outHeaders = {}): Promise<AxiosResponse<T>> {
    let data = {
      body,
      header: {},
    }
    return this.request<T>({
      method: 'post',
      url,
      data, // post要求必须传入data属性
    })
  }
  mergeOptions(options: AxiosRequestConfig) {
    //console.log('合并参数', options)
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    }
  }
  // 设置拦截器
  setInterceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        uni.showLoading({
          title: '加载中...',
        })
        // 一般会请求拦截里面加token，用于后端的验证
        /*  const token = localStorage.getItem("token")
            config!.headers!.Authorization = token
            //租户id 
            config.headers = Object.assign(config.headers, { ...config.headers, token }); */
        return config
      },
      (err: any) => {
        console.log(err, '请求拦截报错')
        uni.hideLoading()
        return Promise.reject(err)
      }
    )
    // 响应拦截器
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log(res)
        uni.hideLoading()
        let { status, data } = res as AxiosResponse
        switch (status) {
          case 200:
            return data
          case 401:
            uni.showToast({
              title: '登录过期，请重新登录',
              icon: 'none',
            })
            break
          case 403:
            uni.showToast({
              title: '没有权限',
              icon: 'none',
            })
            break
          case 404:
            uni.showToast({
              title: '请求的资源不存在',
              icon: 'none',
            })
            break
          case 500:
            uni.showToast({
              title: '服务器错误',
              icon: 'none',
            })
            break
          default:
            uni.showToast({
              title: '未知错误',
              icon: 'none',
            })
            break
        }
      },
      (err) => {
        console.log('axios报错', err)
        uni.showToast({
          title: '未知错误',
          icon: 'none',
        })
        uni.hideLoading()
        return Promise.reject(err)
      }
    )
  }
}
// 默认导出Request实例
export default HttpRequest
