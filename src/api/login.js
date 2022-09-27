import request from '@/utils/request'
/**
 * 获取用户基本信息
 * @param {*} id
 * @returns Promise
 */
export const getUserInfoAPI = (id) => {
  return request({
    url: `/api/user-service/user/${id}`
  })
}
