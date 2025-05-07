import { IUser } from '@/types/user'

export interface IChat {
    id: number
    users: Partial<IUser[]>
    last_message: string
    last_message_at: number
    is_read: boolean
}

export interface IMessage {
    chat_id: number,
    sender_id: number,
    id: number
    content: string
    file_data: string
    read_by: number
    created_at: string
}