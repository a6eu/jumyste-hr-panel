import { createSlice } from '@reduxjs/toolkit'

interface SidebarState {
    isOpen: boolean
}

const initialState: SidebarState = {
    isOpen: false,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
        },
        openSidebar: (state) => {
            state.isOpen = true
        },
    },
})

export const { toggleSidebar, openSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
