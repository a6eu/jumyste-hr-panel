'use client'

import ResumeList from '@/entities/resume/resume-list'
import { useState, Suspense } from 'react'
import FilterModal from '@/entities/jobs/filter-modal'

const RecruitingPage = () => {
    const [filter, setFilter] = useState(false)

    return (
        <div className="border-t-[3px]">
            <div className="lg:px-20 px-4 py-7">
                <Suspense fallback={null}>
                    <FilterModal isOpen={filter} setIsOpen={setFilter} />
                </Suspense>
                <Suspense fallback={null}>
                    <ResumeList setFilter={setFilter} />
                </Suspense>
            </div>
        </div>
    )
}

export default RecruitingPage
