import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalOptions {
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
}

interface ModalContextType {
    openModal: (options: ModalOptions) => void
    closeModal: () => void
    modalOptions: ModalOptions | null
    isOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = (options: ModalOptions) => {
        setModalOptions(options)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setTimeout(() => setModalOptions(null), 300)
    }

    return (
        <ModalContext.Provider
            value={{ openModal, closeModal, modalOptions, isOpen }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context)
        throw new Error('useModal must be used within a ModalProvider')
    return context
}
