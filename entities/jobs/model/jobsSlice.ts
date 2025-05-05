import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from '@/http/setup'
import { IJob } from '@/types/job'
import { ICandidate } from '@/types/user'

interface JobsState {
    jobs: IJob[]
    loading: boolean
    error: string | null
    success: boolean
    selectedJob: IJob | null
    applications: ICandidate | null
}

const initialState: JobsState = {
    jobs: [],
    loading: false,
    error: null,
    success: false,
    selectedJob: null,
    applications: null
}

export const getCompanyJobs = createAsyncThunk(
    'jobs/getCompanyJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get('vacancies/my')
            return response.data
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || 'Failed to fetch jobs')
        }
    },
)

export const getJobById = createAsyncThunk(
    'jobs/getJobById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await $api.get('vacancies/hr/' + id)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data || 'Failed to fetch jobs')
        }
    },
)

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get('vacancies/')
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs')
        }
    },
)


export const postJob = createAsyncThunk('jobs/postJob', async (jobData: IJob, { rejectWithValue }) => {
    try {
        const response = await $api.post('vacancies/', jobData)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to post job')
    }
})

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, updates }: {
    id: string;
    updates: Partial<IJob>
}, { rejectWithValue }) => {
    try {
        const response = await $api.patch(`vacancies/${id}`, updates)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update job')
    }
})

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id: string, { rejectWithValue }) => {
    try {
        await $api.delete(`vacancies/${id}`)
        return id
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete job')
    }
})

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobById.pending, (state) => {
                state.loading = true
                state.selectedJob = null
            })
            .addCase(getJobById.fulfilled, (state, action: PayloadAction<IJob>) => {
                state.loading = false
                state.selectedJob = action.payload
                state.success = true
            })
            .addCase(getJobById.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.selectedJob = null
            })
            .addCase(getJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getJobs.fulfilled, (state, action: PayloadAction<IJob[]>) => {
                state.loading = false
                state.jobs = action.payload
                state.success = true
            })
            .addCase(getJobs.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getCompanyJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getCompanyJobs.fulfilled, (state, action: PayloadAction<IJob[]>) => {
                state.loading = false
                state.jobs = action.payload
                state.success = true
            })
            .addCase(getCompanyJobs.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(postJob.pending, (state) => {
                state.loading = true
            })
            .addCase(postJob.fulfilled, (state, action: PayloadAction<IJob>) => {
                state.loading = false
                state.jobs.push(action.payload)
                state.success = true
            })
            .addCase(postJob.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateJob.pending, (state) => {
                state.loading = true
            })
            .addCase(updateJob.fulfilled, (state, action: PayloadAction<IJob>) => {
                state.loading = false
                const index = state.jobs.findIndex((job) => job.id === action.payload.id)
                if (index !== -1) {
                    state.jobs[index] = action.payload
                }
                state.success = true
            })
            .addCase(updateJob.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteJob.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteJob.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false
                state.jobs = state.jobs.filter((job) => job.id !== action.payload)
                state.success = true
            })
            .addCase(deleteJob.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default jobsSlice.reducer
