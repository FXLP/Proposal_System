import request from '@/utils/request'
// export function login(data) { // for mock data
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// conn to backend
export function login(data) {
  return request({
    url: 'http://localhost:7788/api/login',
    method: 'post',
    data
  })
    .then(response => {
      console.log('response.roles:' + response.permission)
      response.token = {
        token: 'admin-token'
      }
      return response
    })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
