import request from '@/utils/request'

export function fetchList (params) {
  return request({
    url: '/house/list',
    method: 'get',
    params
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

export function getLandmark (params) {
  return request({
    url: '/house/getlandmark',
    method: 'get',
    params
  })
}

export function getHouseDetail (params) {
  return request({
    url: '/house/getHouseDetail',
    method: 'get',
    params
  })
}

export function getHouseComment (params) {
  return request({
    url: '/houseAbout/houserComment',
    method: 'get',
    params
  })
}

export function addHouseOrder (data) {
  return request({
    url: '/houseOrder/addHouseOrder',
    method: 'post',
    data
  })
}

export function getHouseOrder (params) {
  return request({
    url: '/houseOrder/getHouseOrder',
    method: 'get',
    params
  })
}

export function updateHouseOrder (data) {
  return request({
    url: '/houseOrder/updateHouseOrder',
    method: 'post',
    data
  })
}
