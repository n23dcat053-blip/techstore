import axios from 'axios'

// Axios instance dùng chung cho toàn bộ project
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Interceptor request: tự gắn JWT (nếu đã đăng nhập) vào mọi request
axiosClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch {
    /* bỏ qua */
  }
  return config
})

// Interceptor response: trả thẳng data, và chuyển lỗi về một message dễ đọc
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'Có lỗi xảy ra, vui lòng thử lại.'
    if (error.response) {
      const data = error.response.data
      const url = error.config?.url || ''
      if (error.response.status === 401 && !url.includes('/auth/login')) {
        // Token hết hạn hoặc không hợp lệ -> đăng xuất
        window.dispatchEvent(new Event('auth:logout'))
        message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.'
      } else if (data?.message) message = data.message
      else if (data?.errors) message = Object.values(data.errors).flat().join(' ')
      else message = `Lỗi ${error.response.status}`
    } else if (error.request) {
      message = 'Không kết nối được tới server. Hãy kiểm tra backend đã chạy chưa.'
    }
    return Promise.reject(new Error(message))
  },
)

export default axiosClient
