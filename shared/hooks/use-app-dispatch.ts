import { useDispatch } from 'react-redux'
import { store } from '@/app/store'

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
