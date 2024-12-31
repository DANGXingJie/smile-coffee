import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
import type { IloginUser } from '../types/user'
const baseURL = serviceUrls.baseService
const request = new HttpRequest(baseURL)

//五月榜单
export function getbillboards() {
  return request.get('/products/billboards')
}
//大师推荐
export function getRecommend() {
  return request.get('/products/recommend')
}

//咖啡分类
export function getCategory() {
  return request.get('/products/category')
}

//咖啡分类搜索
export function searchCategory(params: any) {
  return request.get('/products/searchProduct', params)
}
