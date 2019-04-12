import axios from 'axios'

export function getOneShop(data) {
  return axios({
    url: '/api/cookMessage/findOneShop',
    method: 'post',
    data
  })
}
