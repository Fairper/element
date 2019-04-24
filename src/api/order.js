import axios from 'axios'

export function addSuccessOrder(data) {
  return axios({
    url: '/api/orderMessage/addSuccessOrder',
    method: 'post',
    data
  })
}
export function getShop() {
  return axios({
    url: '/api/shopMessage/findCookStyle',
    method: 'get',
  })
}
export function addCancelOrder(data) {
  return axios({
    url: '/api/orderCancelMessage/addCancelOrder',
    method: 'post',
    data
  })
}
