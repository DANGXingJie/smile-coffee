import type { AxiosResponse, InternalAxiosRequestConfig, CreateAxiosDefaults, AxiosRequestConfig } from 'axios'
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}
// 自定义传入的参数
export interface CreateRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}
export interface CancelRequestSource {
  [index: string]: () => void
}

// 定义一个扩展的AxiosInstance类型，包括postForm, putForm, patchForm方法
interface CustomAxiosInstance extends AxiosInstance {
  postForm: typeof axios.post // 假设postForm是对axios.post的封装
  putForm: typeof axios.put // 假设putForm是对axios.put的封装
  patchForm: typeof axios.patch // 假设patchForm是对axios.patch的封装
}
