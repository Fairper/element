import axios from 'axios'

export function getCookStyle() {
  return axios({
    url: '/api/shopMessage/findCookStyle',
    method: 'get',
  })
}
