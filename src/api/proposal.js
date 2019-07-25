import request from '@/utils/request'

export function fetchProposalList(query) {
    return request({
      url: '/proposal/list',
      method: 'get',
      params: query
    })
  }