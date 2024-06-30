import request from '@/utils/request'
//测试获取列表
export function getCardList(params: any) {
  return request.get('/v2/yiyan', params)
}

export function getCardList2(params: any) {
  return request.get('/v2/yiyan', params)
}
