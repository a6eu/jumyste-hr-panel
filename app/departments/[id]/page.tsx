'use client'

import React, { useEffect, useState } from 'react'
import $api from '@/http/setup'
import { useParams } from 'next/navigation'

interface Department {
    id: number;
    color: string;
    company_id: number;
    name: string;
    hr_count: number;
}

interface InvitationRequest {
    dep_id: number;
    email: string;
}

const DepartmentPage: React.FC = () => {
    const params = useParams()
    const [department, setDepartment] = useState<Department | null>(null)
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await $api.get(`departments/${params.id}`)
                setDepartment(response.data)
            } catch (error) {
                console.error('Error fetching department:', error)
                setErrorMessage('Failed to load department data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchDepartment()
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!department) return

        if (!email) {
            setErrorMessage('Please enter an email address')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage('Please enter a valid email address')
            return
        }

        setIsSubmitting(true)
        setErrorMessage('')
        setSuccessMessage('')

        try {
            const invitationData: InvitationRequest = {
                dep_id: department.id,
                email: email
            }

            await $api.post('invitations/', invitationData)

            setSuccessMessage(`Invitation sent successfully to ${email}`)
            setEmail('')

            const updatedDept = await $api.get(`departments/${params.id}`)
            setDepartment(updatedDept.data)
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Failed to send invitation'
            setErrorMessage(errorMsg)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#8E44AD' }}></div>
            </div>
        )
    }

    if (!department) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Failed to load department data</p>
            </div>
        )
    }

    return (
        <div className="mx-auto border-stone-300 border-t-[2.5px]">
            <div className="p-6">
                {/* Department Header */}
                <div className="flex items-center mb-8">
                    <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-6"
                        style={{ backgroundColor: department.color }}
                    >
                        {department.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{department.name} Department</h1>
                        <p className="text-gray-600">Department ID: {department.id}</p>
                    </div>
                </div>

                {/* Department Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">HR Count</h3>
                        <p className="text-3xl font-bold" style={{ color: department.color }}>
                            {department.hr_count}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">Company ID</h3>
                        <p className="text-3xl font-bold" style={{ color: department.color }}>
                            {department.company_id}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-500 mb-2">Color</h3>
                        <div className="flex items-center">
                            <div
                                className="w-8 h-8 rounded-full mr-3 border border-gray-200"
                                style={{ backgroundColor: department.color }}
                            ></div>
                            <p className="text-lg font-mono">{department.color}</p>
                        </div>
                    </div>
                </div>

                {/* Add HR Form */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: department.color }}>
                        Invite HR to Department
                    </h2>

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                HR Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: department.color,
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hr@example.com"
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md text-white font-medium disabled:opacity-50"
                            style={{ backgroundColor: department.color }}
                            disabled={isSubmitting || !department}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
                            ) : (
                                'Send Invitation'
                            )}
                        </button>
                    </form>
                </div>

                {/* Department Description */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: department.color }}>
                        About {department.name} Department
                    </h2>
                    <p className="text-gray-700">
                        This department focuses on {department.name.toLowerCase()} development. The team works on creating
                        user interfaces and ensuring a smooth user experience across all company products.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DepartmentPage