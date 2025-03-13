import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './ui/sidebarSlice'
import toastReducer from './ui/toastSlice'
import { useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
