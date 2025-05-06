'use client'

import { Button } from '@/shared/ui'
import { ArrowRight, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import $api from '@/http/setup'
import Link from 'next/link'

export default function Departments() {
    const [isLoading, setIsLoading] = useState(false)
    const [departments, setDepartments] = useState<{ id?: number, name: string, color: string }[]>()

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setIsLoading(true)
                const response = await $api.get('/departments/all')
                setDepartments(response.data)
            } catch (error) {
                console.error('Error fetching departments:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDepartments()
    }, [])

    return (
        <div className="py-10 border-t-[2.5px] border-gray-200  px-12">
            <div className="flex w-full justify-between px-4">
                <h1 className="font-semibold text-2xl">Departments list</h1>
            </div>
            <div className="grid grid-cols-4 mt-8 gap-x-3 gap-y-4">
                {departments?.map((department) => (
                    <Link
                        key={department.id}
                        className="w-full flex flex-col gap-2 py-5 px-3 text-sm border border-stone-400 rounded-lg"
                        href={`/departments/${department.id}`}
                    >
                        <div className="size-9 rounded-lg text-white flex justify-center items-center font-medium" style={{ backgroundColor: department.color }} >
                            {department.id}
                        </div>
                        <div className="flex items-end w-full justify-between px-1 h-8">
                            {department.name}
                            <ArrowRight size={17} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}