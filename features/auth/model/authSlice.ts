import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from '@/http/setup'
import { IUser } from '@/types/user'

interface AuthState {
    user: IUser | null;
    access_token: string | null;
    refresh_token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    access_token: null,
    refresh_token: null,
    loading: false,
    error: null,
}

export const register = createAsyncThunk(
    'auth/register',
    async (
        { first_name, last_name, email, password }: {
            first_name: string;
            last_name: string;
            email: string;
            password: string
        },
        { rejectWithValue },
    ) => {
        try {
            const response = await $api.post('auth/register', {
                first_name,
                last_name,
                email,
                password,
            })
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed')
        }
    },
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await $api.post('auth/login', { email, password })
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.access_token = null
            state.error = null
            localStorage.removeItem('token')
            window.location.href = '/auth?reg=true'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: IUser; access_token: string }>) => {
                state.loading = false
                state.user = action.payload.user
                state.access_token = action.payload.access_token
                localStorage.setItem('access_token', action.payload.access_token)
                window.location.href = '/auth?reg=true'
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: IUser; access_token: string, refresh_token: string }>) => {
                state.loading = false
                state.user = action.payload.user
                state.access_token = action.payload.access_token
                localStorage.setItem('access_token', action.payload.access_token)
                localStorage.setItem('refresh_token', action.payload.refresh_token)
                window.location.href = '/'

            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
