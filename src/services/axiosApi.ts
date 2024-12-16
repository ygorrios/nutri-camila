import axios from 'axios'

const api = axios.create({})

api.interceptors.response.use(
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

export default api
