import { User, ArrowUpRight } from 'lucide-react'

const HiringInfo = () => {
    return (
        <>
            <div className="py-6 px-4 bg-white border-[#E4E4E4] border-[1px] rounded-2xl flex flex-col w-full mt-8">
                <div className="flex gap-2">
                    <User size={27} />
                    <h1 className="font-medium text-xl m-0 p-0 leading-none pt-2">
                        Рост кандидатов
                    </h1>
                </div>
                <div className="flex gap-5 items-baseline">
                    <div className="font-medium text-[40px]">+56.9%</div>
                    <div className="text-white text-sm bg-primaryBlocks rounded-3xl h-7 w-16 justify-center px-2 flex items-center">
                        <ArrowUpRight size={17} color="white" />
                        13%
                    </div>
                </div>
                <p className="text-sm">По сравнению с прошлым месяцем</p>
                <div className="rounded-[15px] w-full h-[50px] bg-primaryLight/50 relative mt-14">
                    <div
                        style={{ width: '56.9%' }}
                        className="progress rounded-[15px] h-[50px] flex items-center pl-2"
                    >
                        <div className="font-medium text-xl text-white">
                            +56.9%
                            <span className="opacity-45 font-normal text-sm">
                                /100
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Графики */}
            <div className="py-6 px-4 bg-white border-[#E4E4E4] border-[1px] rounded-2xl flex flex-col gap-8 w-full">
                <h1 className="font-medium text-xl text-center">
                    Динамика роста количества кандидатов
                </h1>
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-end *:rounded-lg *:w-10 h-44">
                        <div className="bg-primary/70 h-32" />
                        <div className="bg-primary h-40" />
                        <div className="bg-primaryLight h-24" />
                        <div className="bg-primaryBlocks h-36" />
                    </div>
                    <div className="flex justify-between">
                        <div>Ноябрь</div>
                        <div>Декабрь</div>
                        <div>Январь</div>
                        <div>Февраль</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HiringInfo
