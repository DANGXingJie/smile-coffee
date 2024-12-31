import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
import type { IloginUser } from '../types/user'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)

//用户登录
export function userLogin(data: IloginUser) {
  return request.post('/user/login', data)
}

//获取用户信息
export function getUserInfo(params: string) {
  return request.get(`/user/getUserInfo/${params}`)
}
//退出登录
export function logout() {
  return request.get('logout')
}
