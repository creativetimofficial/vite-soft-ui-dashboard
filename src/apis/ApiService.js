import axios from 'axios'

// Tạo một instance của axios với các default config
const instance = axios.create({
  baseURL: "http://34.96.176.17:8889/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Tạo một interceptor để thêm token vào header của request
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Tạo một interceptor để xử lý các lỗi trả về từ server
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error
    if (response && response.status === 401) {
      // Nếu token hết hạn hoặc không hợp lệ, thực hiện đăng xuất
      await store.dispatch('logout')
      // Chuyển hướng về trang đăng nhập
      router.push('/sign-in')
    }
    return Promise.reject(error)
  }
)

export const base = {
  async get(url, params = {}) {
    try {
      const response = await instance.get(url, { params })
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async post(url, data) {
    try {
      const response = await instance.post(url, data)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async put(url, data) {
    try {
      const response = await instance.put(url, data)
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async delete(url, params = {}) {
    try {
      const response = await instance.delete(url, { params })
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
