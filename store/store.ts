import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import sidebarReducer from './ui/sidebarSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
