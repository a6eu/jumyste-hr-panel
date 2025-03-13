'use client'

import React, { createContext, ReactNode, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastType = 'success' | 'error' | 'info'

interface ToastContextProps {
    showToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const showToast = (type: ToastType, message: string) => {
        toast(message, {
            type,
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: 'light',
        })
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    )
}

const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

export { ToastProvider, useToast }
