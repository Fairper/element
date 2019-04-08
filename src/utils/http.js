import axios from 'axios'
export default ({
  method,
  url,
  headers,
  withCredentials,
  params
}) => {
  return axios({
      method,
      url,
      headers,
      withCredentials:false,
      params
      
    })
    .then((result) => {
      return result.data
    })
    .catch((errot) => {
      return errot
    })
}