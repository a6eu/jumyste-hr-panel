


import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from '@/shared/widgets/models/sidebarSlice'
import authReducer from '@/features/auth/model/authSlice'
import userReducer from '@/entities/profile/model/userSlice'
import jobsReducer from '@/entities/jobs/model/jobsSlice'
import chatReducer from '@/features/chat/api/chatSlice'

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        auth: authReducer,
        user: userReducer,
        jobs: jobsReducer,
        chats: chatReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


