//import axios from 'axios'
//https://axios-miniprogram.com/guide/quick-start 文档地址
import axios from 'axios-miniprogram'
import type { AxiosAdapter, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
//import type { CreateRequestConfig } from '@/types/global'
//axios适配小程序
//import mpAdapter from 'axios-miniprogram-adapter'
//axios.defaults.adapter = mpAdapter as AxiosAdapter
// axios.defaults.adapter = axios.createAdapter({
//   request: uni.request as any,
//   download: uni.downloadFile,
//   upload: uni.uploadFile as any,
// })
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
// Request类，可以用来自定义传递配置来创建实例
class HttpRequest {
  baseURL: string
  timeout: number
  constructor(baseURL: string) {
    this.baseURL = baseURL || import.meta.env.VITE_BASE_URL
    this.timeout = 6000
  }

  request<T = any>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // axios 实例
    const instance = axios.create() as unknown as AxiosInstance
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }
  //get请求
  get<T = any>(url: string, data?: any, outHeaders = {}): Promise<AxiosResponse<T>> {
    return this.request<T>({
      method: 'get',
      url,
      params: { ...data }, // get参数可以直接展开
      headers: {},
    })
  }
  // post请求
  post<T = any>(url: string, data: any, outHeaders = {}): Promise<AxiosResponse<T>> {
    return this.request<T>({
      method: 'post',
      url,
      data, // post要求必须传入data属性
    })
  }
  //delete
  delete<T = any>(url: string, data?: any, outHeaders = {}): Promise<AxiosResponse<T>> {
    return this.request<T>({
      method: 'delete',
      url,
      params: { ...data }, // delete参数可以直接展开
      headers: {},
    })
  }
  //put请求
  put<T = any>(url: string, body = {}, outHeaders = {}): Promise<AxiosResponse<T>> {
    let data = {
      body,
      header: {},
    }
    return this.request<T>({
      method: 'put',
      url,
      data, // put要求必须传入data属性
    })
  }

  // 超时取消请求
  abort<T = any>(url: string, timeoutMs: number): Promise<AxiosResponse<T>> {
    const abortController = new AbortController()
    setTimeout(() => abortController.abort(), timeoutMs || 0)
    return this.request<T>({
      method: 'get',
      url,
      params: {},
      signal: abortController.signal,
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
  // 请求拦截器
  setInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        uni.showLoading({
          title: '加载中',
        })
        //请求头添加token或其他参数
        config.headers['Authorization'] = userStore.getToken()
        // console.log('%c [ headers ]-96', 'font-size:13px; background:pink; color:#bf2c9f;', config)
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
        let { status, data } = res
        let responseData
        if (status == 200 && data.code != undefined) {
          switch (data.code) {
            case 1:
            case 200:
              responseData = data
              break
            case 401:
              uni.showToast({
                title: '登录过期，请重新登录',
                icon: 'none',
              })
              setTimeout(() => {
                //跳转到登录页
                uni.navigateTo({
                  url: '/subpkg_pages/login/index',
                })
              }, 1000)
              responseData = Promise.reject(new Error('登录过期')) // 返回一个被拒绝的 Promise
              break
            case 403:
              uni.showToast({
                title: '没有权限',
                icon: 'none',
              })
              responseData = Promise.reject(new Error('没有权限'))
              break
            case 404:
              uni.showToast({
                title: '请求的资源不存在',
                icon: 'none',
              })
              responseData = Promise.reject(new Error('请求的资源不存在'))
              break
            case 500:
              uni.showToast({
                title: '服务器错误',
                icon: 'none',
              })
              responseData = Promise.reject(new Error('服务器错误'))
              break
            default:
              uni.showToast({
                title: '未知错误',
                icon: 'none',
              })
              responseData = Promise.reject(new Error('未知错误'))
              break
          }
        }
        //其他不规则的请求
        if (status == 200 || data.code == undefined) {
          responseData = data
        }
        return responseData
      },
      (err: any) => {
        console.log('axios报错', err)
        uni.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none',
          duration: 2000,
          complete: () => {
            uni.hideLoading()
          },
        })
        return Promise.reject(err)
      }
    )
  }
}
// 默认导出Request实例
export default HttpRequest
