import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        // Bad Request
        break
      case 401:
        // Unauthorized
        break
      case 403:
        // Forbidden
        break
      case 404:
        // Not Found
        break
      case 500:
        // Internal Server Error
        break
      default:
        // Other error
    }
  }
  return Promise.reject(error)
})
