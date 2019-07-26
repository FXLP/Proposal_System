import request from '@/utils/request'

export function fetchWaitCommanderReviewList(query) {
  return request({
    url: '/proposal/waitCommanderReviewlist',
    method: 'get',
    params: query
  })
}

export function fetchWaitGroupReviewList(query) {
  return request({
    url: '/proposal/waitGroupReviewlist',
    method: 'get',
    params: query
  })
}

export function fetchWaitHandleList(query) {
  return request({
    url: '/proposal/waitHandlelist',
    method: 'get',
    params: query
  })
}

export function fetchHandlingList(query) {
  return request({
    url: '/proposal/handlinglist',
    method: 'get',
    params: query
  })
}

export function fetchFinishedList(query) {
  return request({
    url: '/proposal/finishedlist',
    method: 'get',
    params: query
  })
}
