import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PerKey = 'Permission-Key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getPer() {
  return Cookies.get(PerKey)
}

export function setPer(token) {
  return Cookies.set(PerKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
