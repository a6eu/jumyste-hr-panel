import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from '@/http/setup'
import { IUser } from '@/types/user'

interface AuthState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

export const getUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await $api.get('users/me')
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data')
    }
})

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData: Partial<IUser>, { rejectWithValue }) => {
        try {
            const response = await $api.put('users/me', userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user data')
        }
    },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default userSlice.reducer
