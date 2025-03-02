import ProgressCircle from '@/components/progress-circle'

const HiringFunnel = () => {
    return (
        <div className="py-6 px-4 bg-white border-[#E4E4E4] border-[1px] rounded-2xl flex flex-col gap-20 w-full lg:h-full">
            <h1 className="font-medium text-xl">Воронка найма</h1>
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-8 text-2xl">
                    <div className="shrink-0">
                        <ProgressCircle percentage={100} />
                    </div>
                    <div>
                        <div>Получено резюме</div>
                        <div className="text-primary font-medium">500</div>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-2xl">
                    <div className="shrink-0">
                        <ProgressCircle percentage={50} />
                    </div>
                    <div>
                        <div>Прошли телефонный скрининг</div>
                        <div className="text-primary font-medium">250</div>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-2xl">
                    <div className="shrink-0">
                        <ProgressCircle percentage={24} />
                    </div>
                    <div>
                        <div>Приглашены на интервью</div>
                        <div className="text-primary font-medium">120</div>
                    </div>
                </div>
                <div className="flex items-center gap-8 text-2xl">
                    <div className="shrink-0">
                        <ProgressCircle percentage={8} />
                    </div>
                    <div>
                        <div>Получили оффер</div>
                        <div className="text-primary font-medium">40</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HiringFunnel