import axios from 'axios'

const API_BASE_URL = 'https://jumyste-app-backend-production.up.railway.app'

const $api = axios.create({
    baseURL: API_BASE_URL,
})

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

$api.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== 'undefined'
                ? localStorage.getItem('access_token')
                : null
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        resolve($api(originalRequest))
                    })
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = localStorage.getItem('refresh_token')
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    { refreshToken }
                )

                const newAccessToken = response.data.accessToken
                localStorage.setItem('access_token', newAccessToken)

                $api.defaults.headers.Authorization = `Bearer ${newAccessToken}`
                onRefreshed(newAccessToken)

                return $api(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                 if (window.location.pathname !== '/auth') {
                     window.location.href = '/auth?reg=true'
                 }
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error)
    }
)

export default $api
