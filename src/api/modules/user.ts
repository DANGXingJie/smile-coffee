import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)
//用户登录
export function userLogin(params: IloginUser) {
  return request.post('/public/login', params)
}

//获取用户信息
export function getUserInfo(params: number) {
  return request.get('/user/getUserInfoById/' + params)
}
