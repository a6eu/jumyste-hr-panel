import $api from '@/http/setup'
import { IChat, IMessage } from '@/features/chat/model'
import { isAxiosError } from 'axios'

export const getUserChats = async (): Promise<IChat[]> => {
    try {
        const response = await $api.get<IChat[]>('chats/user')
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error
        }
        throw new Error("Unexpected error occurred")
    }
}

export const getChatMessages = async (chatId: number): Promise<IMessage[]> => {
    try {
        const response = await $api.get<IMessage[]>(`messages/chat/${chatId}`)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error
        }
        throw new Error("Unexpected error occurred")
    }
}

export const getChatById = async (chatId: number): Promise<IChat> => {
    try {
        const response = await $api.get<IChat>(`chats/${chatId}`)
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error
        }
        throw new Error("Unexpected error occurred")
    }
}
