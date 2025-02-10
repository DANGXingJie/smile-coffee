import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
import type { IloginUser } from '../types/user'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)

//预订单
export function preOrderDetail(params: any) {
  return request.post('/order/preOrderDetail', params)
}
