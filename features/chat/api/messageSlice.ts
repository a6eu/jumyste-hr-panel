import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getChatMessages } from '@/features/chat/api/service'
import { IMessage } from '@/features/chat/model'
import $api from '@/http/setup'

interface SendMessageParams {
    chatId: number
    type: string
    content?: string
    fileData?: string
}

export const getChatMessagesThunk = createAsyncThunk(
    'chat/getMessages',
    async (chatId: number, { rejectWithValue }) => {
        try {
            return await getChatMessages(chatId)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const sendMessageThunk = createAsyncThunk(
    'chat/sendMessage',
    async ({ chatId, type, content, fileData }: SendMessageParams, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            formData.append('chat_id', chatId.toString())
            formData.append('type', type)
            if (content) formData.append('content', content)
            if (fileData) formData.append('file_data', fileData)

            const response = await $api.post('messages/', formData)

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to send message')
        }
    }
)

interface ChatState {
    messages: IMessage[]
    loading: boolean
    error: string | null
}

const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChatMessagesThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getChatMessagesThunk.fulfilled, (state, action) => {
                state.loading = false
                state.messages = action.payload
            })
            .addCase(getChatMessagesThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(sendMessageThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.loading = false
                state.messages.push(action.payload)
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default chatSlice.reducer
