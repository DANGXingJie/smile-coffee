declare module 'axios' {
  //返回参数类型，如遇到request()方法里的retuen报类型错误，放开这段注释采用这种形式定义返回类型,将上方的Result接口注释
  interface AxiosResponse<T = any> {
    code: number | string
    msg: string
    data: T
  }
  type Result<T = any> = AxiosResponse<T>
}
// declare interface Response<T = any> {
//   code: number | string
//   msg: string
//   data: T
// }
