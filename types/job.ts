export interface IJob {
    id?: string
    title: string
    employment_type: string
    work_format: string
    experience: string
    salary_min: number
    salary_max: number
    location: string
    category: string
    skills: string[]
    status?: string
    description: string
    count_responses?: number
    created_at?: string
    updated_at?: string
}

