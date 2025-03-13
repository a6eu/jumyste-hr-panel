import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToastState {
    show: boolean;
    content: string;
    type: 'info' | 'success' | 'warning' | 'danger';
}

const initialState: ToastState = {
    show: false,
    content: '',
    type: 'info',
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{ content: string; type: ToastState['type'] }>) => {
            state.show = true
            state.content = action.payload.content
            state.type = action.payload.type
        },
        hideToast: (state) => {
            state.show = false
            state.content = ''
        },
    },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
