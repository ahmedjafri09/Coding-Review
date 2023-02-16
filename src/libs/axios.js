import axios from 'axios'
import config from '../config'
const API = axios.create({
  baseURL: config.API_BASE_URL,
})

API.defaults.headers.common['Accept'] = 'application/json'
API.defaults.headers.common['Content-Type'] = 'application/json'
API.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.clear();
    }
    throw err
  },
)

export default API
