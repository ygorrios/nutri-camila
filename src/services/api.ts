import axios from 'axios'

const axiosApi = axios.create({})

axiosApi.interceptors.response.use(
  (response) => {
    // if (response.status === 200) return response.data
    return response
  },
  async (error) => {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    return Promise.reject(error)
  },
)

export default axiosApi
