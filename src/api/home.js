import axios from 'axios'

export function getCookStyle() {
  return axios({
    url: '/api/iconMessage/findIcon',
    method: 'get',
  })
}
export function getShop() {
  return axios({
    url: '/api/shopMessage/findCookStyle',
    method: 'get',
  })
}