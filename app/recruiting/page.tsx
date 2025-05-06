'use client'

import JobsList from '@/entities/jobs/jobs-list'

const RecruitingPage = () => {
    return (
        <div className="border-t-[3px]">
            <div className="lg:px-20 px-4 py-7">
                <JobsList  />
            </div>
        </div>
    )
}

export default RecruitingPage
