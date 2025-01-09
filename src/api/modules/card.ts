import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)
//每日一言
export function getCouponList(parmas: any) {
  return request.get('/coupon/list', parmas)
}
