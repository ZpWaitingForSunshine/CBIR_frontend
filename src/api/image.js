import request from '@/utils/request'

export function imgUpdate(query) {
  return request({
    url: '/image/imgupdate',
    method: 'post',
    params: query
  })
}
