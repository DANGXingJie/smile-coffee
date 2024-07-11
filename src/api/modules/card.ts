import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
const baseURL = serviceUrls.yiyanService
const request = new HttpRequest(baseURL)
//每日一言
export function getCardList() {
  return request.get('/v2/yiyan')
}
