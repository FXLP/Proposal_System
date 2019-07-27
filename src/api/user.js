import request from '@/utils/request'

export function login(data) { // for mock data
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// conn to backend
// login(data) {
//   return request({
//     url: 'http://localhost:7788/api/login',
//     method: 'post',
//     data
//   })
//     .then(response => {
//       response.token = {
//         token: 'admin-token'
//       }
//       return response.token
//     })
// }

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
