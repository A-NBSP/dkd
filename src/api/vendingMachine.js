import request from '@/utils/request'

export const sidbarListAPI = () => {
  return request({
    url: '/api/vm-service/vmType/search',
    params: {
      pageIndex: ''
    }
  })
}
