import request from '@/utils/request'

export function login(data) {
  console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  // console.log(token)
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
