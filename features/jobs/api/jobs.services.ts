import { IJob } from '@/types/job'
import $api from '@/shared/http/setup'
import { isAxiosError } from 'axios'

class JobsServices {
    public async getJobs(): Promise<IJob[]> {
        try {
            const response = await $api.get<IJob[]>('/vacancies/')
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }

    public async postJob(job: IJob): Promise<IJob> {
        try {
            const response = await $api.post<IJob>('/vacancies/', job)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }

    public async updateJob(id: number, data: Partial<IJob>): Promise<IJob> {
        try {
            const response = await $api.patch<IJob>(`/vacancies/${id}`, data)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }

    public async deleteJob(id: number): Promise<void> {
        try {
            await $api.delete(`/vacancies/${id}`)
        } catch (error) {
            if (isAxiosError(error)) {
                return Promise.reject(error)
            }
            throw error
        }
    }
}

export const jobsServices = new JobsServices()
