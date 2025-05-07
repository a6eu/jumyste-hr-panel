'use client'

import { useTranslation } from 'react-i18next'
import ProgressCircle from '@/shared/ui/progress-circle'
import { useEffect, useState } from 'react'
import $api from '@/http/setup'

type FunnelStatus = 'invited' | 'interview' | 'accepted' | 'rejected'

interface FunnelItem {
    status: FunnelStatus
    count: number
    percentage: number
}

interface AnalyticsItem {
    label: string
    value: number
    percentage: number
}

const statusToLabelMap: Record<Exclude<FunnelStatus, 'rejected'>, string> = {
    invited: 'profile.passedPhoneScreening',
    interview: 'profile.invitedToInterview',
    accepted: 'profile.gotOffer',
}

const HiringFunnel = () => {
    const { t } = useTranslation()
    const [analytics, setAnalytics] = useState<AnalyticsItem[]>([
        { label: 'profile.totalResumes', percentage: 100, value: 0 },
        { label: 'profile.passedPhoneScreening', percentage: 0, value: 0 },
        { label: 'profile.invitedToInterview', percentage: 0, value: 0 },
        { label: 'profile.gotOffer', percentage: 0, value: 0 },
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await $api.get<FunnelItem[]>('jobs/analytics')
                const data = res.data

                const includedStatuses: FunnelStatus[] = ['invited', 'interview', 'accepted']
                const total = data
                    .filter(item => includedStatuses.includes(item.status))
                    .reduce((sum, item) => sum + item.count, 0)

                const updated: AnalyticsItem[] = analytics.map(item => {
                    if (item.label === 'profile.totalResumes') {
                        return { ...item, value: total }
                    }

                    const match = data.find(
                        entry => statusToLabelMap[entry.status as keyof typeof statusToLabelMap] === item.label
                    )

                    return match
                        ? { ...item, value: match.count, percentage: match.percentage }
                        : item
                })

                setAnalytics(updated)
            } catch (error) {
                console.error('Error fetching hiring funnel data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="py-6 px-4 bg-white border border-[#E4E4E4] rounded-2xl flex flex-col gap-12 w-full lg:h-full">
            <h1 className="font-medium text-lg sm:text-xl">
                {t('profile.recruitmentFunnel')}
            </h1>
            <div className="flex flex-col gap-6">
                {analytics.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[0.7fr,1fr] items-center gap-5 sm:gap-8 text-lg sm:text-2xl"
                    >
                        <div className="shrink-0 w-12 sm:w-16">
                            <ProgressCircle percentage={item.percentage} />
                        </div>
                        <div>
                            <div className="text-sm sm:text-base">{t(item.label)}</div>
                            <div className="text-primary font-medium text-lg sm:text-xl">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HiringFunnel
