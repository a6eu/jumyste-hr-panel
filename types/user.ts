export interface IUser {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string
    profile_picture?: string
    position?: string
    linkedin?: string
    telegram?: string
    github?: string
    is_owner: boolean
    company: {
        name: string
    }
}

export interface ICandidate {
    id: string
    email: string
    first_name: string
    last_name: string
    profile_picture?: string
    column: string
}

