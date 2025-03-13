import $api from '@/shared/http/setup'
import { isAxiosError } from 'axios'
import { IUser } from '@/types/user'

class UserServices {
    public async getProfile(): Promise<IUser> {
        try {
            const response = await $api.get('users/me')
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }

    public async updateProfile(profileData: Partial<IUser>): Promise<IUser> {
        try {
            const response = await $api.patch('users/me', profileData)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }

    public async deleteProfile() {
        try {
            const response = await $api.delete('users/me')
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
        }
    }
}

export const userServices = new UserServices()