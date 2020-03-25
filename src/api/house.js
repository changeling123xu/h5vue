import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/house/list',
    method: 'get',
    params,
  })
}

export function fetchLists (params) {
  return request({
    url: '/house/list',
    method: 'get',
    params
  })
}
export function getCityList (params) {
  return request({
    url: '/house/getCityList',
    method: 'get',
    params
  })
}
