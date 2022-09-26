import request from '@/utils/request'
/**
 * 登录
 * @param {Object} data 登录的数据
 * @returns Promise
 */
export function login(data) {
  return request({
    method: 'POST',
    url: '/api/user-service/user/login',
    data
  })
}
/**
 * 图片验证码
 */
export const photo = (random) => {
  return request({
    url: `/api/user-service/user/imageCode/${random}`,
    responseType: 'blob'
  })
}
