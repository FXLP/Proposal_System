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
