import axiosClient from './axiosClient.js'

const authApi = {
  // POST /api/auth/login
  login: (username, password) => axiosClient.post('/auth/login', { username, password }),

  // POST /api/auth/register
  register: (data) => axiosClient.post('/auth/register', data),
}

export default authApi
