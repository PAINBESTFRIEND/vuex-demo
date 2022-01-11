import axios from 'axios'

// 开发环境
// axios.defaults.baseURL = 'http://localhost:3000/api' // 全局baseurl路径
axios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// 配置axios的拦截器
// 拦截请求
axios.interceptors.request.use(config => {
  // 在请求之前进行一些配置
  console.log('...axios.interceptors.request...')
  console.log('...axios.interceptors.request.config...', config) // 单次请求的配置信息对象
  return config // 只有return config后，才能成功发送请求
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 拦截响应,在响应之后对数据进行一些处理
axios.interceptors.response.use(data => {
  console.log('...axios.interceptors.response...')
  console.log('...axios.interceptors.response.data...', data) // 响应数据
  return data // 只有return data后才能完成响应
})

export default axios
