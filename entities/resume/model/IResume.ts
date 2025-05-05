export interface IResume {
    id: number;
    user_id: number;
    vacancy_id: number;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    applied_at: string;
    resume_id: number;
    ai_matching_score: number;
    resume: {
        id: number;
        user_id: number;
        full_name: string;
        desired_position: string;
        skills: string[];
        city: string;
        about: string;
        parsed_data: {
            about_me: string;
            city: string;
            desired_position: string;
            full_name: string;
            skills: string[];
        };
        created_at: string;
    };
    user: {
        id: number;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        profile_picture: string;
        role_id: number;
        company_id: number;
        department_id: number;
    };
}