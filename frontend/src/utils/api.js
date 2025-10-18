import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: (token) => api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProfile: (token, userData) => api.put('/auth/profile', userData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const chatAPI = {
  sendMessage: (message, sessionId, token) => {
    // Prefer backend chat route; include sessionId and auth when available
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    return api.post('/chat/message', { message, sessionId }, { headers })
      .catch(err => {
        // Fallback to root server endpoint if route not found or method not allowed
        const status = err?.response?.status
        if (status === 404 || status === 405) {
          return api.post('/chat', { message }, { headers })
        }
        throw err
      })
  },
  getChatHistory: (sessionId, token) => {
    // For now, return empty history since our simple server doesn't store history
    return Promise.resolve({ data: { messages: [] } })
  },
  getUserChats: (token) => {
    // For now, return empty chats since our simple server doesn't store history
    return Promise.resolve({ data: { chats: [] } })
  }
}

export const recommendationAPI = {
  getRecommendations: (token) => api.get('/recommendations', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  generateRecommendations: (token) => api.post('/recommendations/generate', {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateFeedback: (token, recommendationId, feedback) => api.put(
    `/recommendations/feedback/${recommendationId}`,
    feedback,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

export const userAPI = {
  getProfile: (token) => api.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProfile: (token, userData) => api.put('/user/profile', userData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export default api




