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

export function fetchWaitImplementList(query) {
  return request({
    url: '/proposal/waitImplementlist',
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

export function getProposalFormalById(data) {
  return request({
    url: 'http://localhost:7788/api' + '/proposalFormal/getProposalFormalByID',
    method: 'get',
    params: data
  })
}

export function getProposalDraftById(data) {
  return request({
    url: 'http://localhost:7788/api' + '/proposalDraft/getProposalDraftByID',
    method: 'get',
    params: data
  })
}
