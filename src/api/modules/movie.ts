import HttpRequest from '@/utils/request'
import serviceUrls from '@/config/baseURLConfig'
const baseURL = serviceUrls.moviceService
const request = new HttpRequest(baseURL)
//热播电影实时票房榜
export function getTopMovieList() {
  return request.get('/wl/top/movie')
}
//B站视频搜索
export function getBiliSearch(query: object) {
  return request.get('/query/bilibili/video', query)
}
