import axios from 'axios'

export function userLogin(data) {
  return axios({
    url: '/api/user/sign',
    method: 'post',
    data
  })
}
export function userSignup(data) {
    return axios({
      url: '/api/user/signup',
      method: 'post',
      data
    })
  }