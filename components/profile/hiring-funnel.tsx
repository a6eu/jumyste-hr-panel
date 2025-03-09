import ProgressCircle from '@/components/progress-circle'

const HiringFunnel = ({ t }: { t: (key: string) => string }) => {
    return (
        <div className="py-6 px-4 bg-white border border-[#E4E4E4] rounded-2xl flex flex-col gap-12 w-full lg:h-full">
            <h1 className="font-medium text-lg sm:text-xl">
                {t('profile.recruitmentFunnel')}
            </h1>
            <div className="flex flex-col gap-6">
                {[
                    { label: 'profile.totalResumes', percentage: 100, value: 500 },
                    { label: 'profile.passedPhoneScreening', percentage: 50, value: 250 },
                    { label: 'profile.invitedToInterview', percentage: 24, value: 120 },
                    { label: 'profile.gotOffer', percentage: 8, value: 40 },
                ].map((item, index) => (
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
