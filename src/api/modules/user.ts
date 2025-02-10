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
export function getUserInfo() {
  return request.get('/user/getUserInfo')
}
//退出登录
export function logout() {
  return request.get('logout')
}

//新增收货地址
export function saveAddress(data: any) {
  return request.post('/addresses/sava', data)
}

//收货地址列表
export function getAddressList(params: any) {
  return request.get('/addresses/list/' + params)
}
