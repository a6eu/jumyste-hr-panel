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

export interface ICandidateDetails {
    id: number
    user_id: number
    vacancy_id: number
    first_name: string
    last_name: string
    email: string
    status: string
    applied_at: string
    resume: {
        full_name: string
        desired_position: string
        skills: string[]
        city: string
        about: string
        parsed_data: {
            about_me: string
            city: string
            desired_position: string
            full_name: string
            skills: string[]
        }
        user: {
            id: number
            email: string
            first_name: string
            last_name: string
            profile_picture: string
            role_id: number
        }
    }
    ai_matching_score: number
    ai_strengths: string
    ai_weaknesses: string
}

