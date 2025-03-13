import $api from '@/shared/http/setup'
import { IUser } from '@/types/user'
import { redirect } from 'next/navigation'

class AuthServices {
    public async signUp(first_name: string, last_name: string, email: string, password: string) {
        try {
            return await $api.post('auth/register', { first_name, last_name, email, password })
        } catch (error) {
            throw new Error('Authentication failed')
        }
    }

    public async signIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
        try {
            const response = await $api.post('auth/login', { email, password })
            const { user, token } = response.data
            localStorage.setItem('access_token', token)
            return { user, token }
        } catch (error) {
            throw new Error('Authentication failed')
        }
    }

    public signOut() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        redirect('/auth')
    }
}

export const authServices = new AuthServices()