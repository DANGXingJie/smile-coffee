import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
import type { IloginUser } from '../types/user'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)

//加入购物车
export function saveShopCarts(data: any) {
  return request.post('/shopCart/save', data)
}

//购物车列表
export function shopCartList() {
  return request.get('/shopCart/list')
}

//清空购物车
export function removeAll(data: any) {
  return request.post('/shopCart/removeAll', data)
}

//编辑购物车
export function updateShopCarts(data: any) {
  return request.post('/shopCart/update', data)
}
