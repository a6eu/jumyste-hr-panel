import { IChat, IMessage } from '@/features/chat/model'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserChats, getChatMessages, getChatById } from '@/features/chat/api/service'

interface ChatState {
    chats: IChat[] | null
    messages: IMessage[] | null
    selectedChat: IChat | null
    success: boolean
    loading: boolean
    error: string | null
}

const initialState: ChatState = {
    chats: null,
    selectedChat: null,
    messages: null,
    success: false,
    error: null,
    loading: false
}

export const getUserChatsThunk = createAsyncThunk(
    'chat/getUserChats',
    async (_, { rejectWithValue }) => {
        try {
            return await getUserChats()
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
        }
    }
)

export const getChatMessagesThunk = createAsyncThunk(
    'chat/getChatMessages',
    async (chatId: number, { rejectWithValue }) => {
        try {
            return await getChatMessages(chatId)
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
        }
    }
)

export const getChatByIdThunk = createAsyncThunk(
    'chat/getChatById',
    async (chatId: number, { rejectWithValue }) => {
        try {
            return await getChatById(chatId)
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
        }
    }
)

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserChatsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserChatsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.chats = action.payload
                state.success = true
            })
            .addCase(getUserChatsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.success = false
            })

            .addCase(getChatMessagesThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getChatMessagesThunk.fulfilled, (state, action) => {
                state.loading = false
                state.messages = action.payload
                state.success = true
            })
            .addCase(getChatMessagesThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.success = false
            })
            .addCase(getChatByIdThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getChatByIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.selectedChat = action.payload
                state.success = true
            })
            .addCase(getChatByIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.success = false
            })
    }
})

export default chatSlice.reducer
