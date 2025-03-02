import $api from '@/http/setup'
import { IUser } from '@/types/user'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

interface InitialState {
    loading: boolean
    user: IUser | null
    accessToken: string | null
    refreshToken: string | null
    error: string | null
    success: boolean
}

const initialState: InitialState = {
    loading: false,
    user: {
        email: '',
        first_name: '',
        last_name: '',
        profile_picture: '',
        phone: '',
    },
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    error: null,
    success: false,
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await $api.post('/api/auth/login', credentials)
            localStorage.setItem('access_token', response.data.token)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
                return rejectWithValue(
                    error.response?.data?.error?.toString() || 'Login failed'
                )
            }
            return rejectWithValue('An unexpected error occurred')
        }
    }
)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (
        userData: {
            email: string
            first_name: string
            last_name: string
            password: string
        },
        { rejectWithValue }
    ) => {
        try {
            await $api
                .post('/api/auth/register', userData)
                .then((r) => console.log(r.data))
            return 'Successfully registered'
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
                return rejectWithValue(
                    error.response?.data?.error?.toString() ||
                        'Registration failed'
                )
            }
            return rejectWithValue('An unexpected error occurred')
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get('/api/users/me')
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
                return rejectWithValue(
                    error.response?.data?.error?.toString() ||
                        'Failed to fetch user'
                )
            }
            return rejectWithValue('An unexpected error occurred')
        }
    }
)
export const updateProfile = createAsyncThunk(
    'auth/updateUser',
    async (profileData: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await $api.patch('/api/users/me', profileData)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
                return rejectWithValue(
                    error.response?.data.error?.toString() ||
                        'An unexpected error occurred'
                )
            }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            state.error = null
            setTimeout(() => {
                window.location.href = '/auth?reg=true'
            }, 100)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
                state.user = action.payload.user
                window.location.href = '/profile'
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false
                window.location.href = '/auth?reg=true'
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
