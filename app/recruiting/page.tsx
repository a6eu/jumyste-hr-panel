'use client'

import JobsList from '@/entities/jobs/jobs-list'
import { useState, Suspense, SetStateAction, Dispatch } from 'react'
import { FilterModal } from '@/entities/jobs/filter-modal'

const FilterWrapper = ({ isOpen, setIsOpen }: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => (
    <Suspense fallback={null}>
        <FilterModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Suspense>
)

const RecruitingPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return (
        <div className="border-t-[3px]">
            <div className="lg:px-20 px-4 py-7">
                <JobsList setFilter={setIsFilterOpen} />
                <FilterWrapper isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
            </div>
        </div>
    )
}

export default RecruitingPage
