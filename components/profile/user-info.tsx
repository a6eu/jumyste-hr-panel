import { Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const UserInfo = ({
    user,
}: {
    user: { first_name: string; last_name: string; email: string }
}) => {
    return (
        <div className="py-6 px-4 bg-white border-[#E4E4E4] border-[1px] rounded-2xl flex flex-col w-full mt-8">
            <h2 className="self-center mb-2.5 font-medium text-2xl">
                Общие сведения
            </h2>
            <div className="space-y-2 flex flex-col">
                <div>
                    <span className="text-primary font-semibold">ФИО:</span>{' '}
                    <span>{user?.first_name + ' ' + user?.last_name}</span>
                </div>
                <div>
                    <span className="text-primary font-semibold">
                        Должность:
                    </span>{' '}
                    <span>HR Manager</span>
                </div>
                <div>
                    <span className="text-primary font-semibold">
                        Контактные данные:
                    </span>
                    <div className="*:flex *:items-center *:gap-2 space-y-2">
                        <p>
                            <Mail color="#A3A2A2" />
                            {user?.email}
                        </p>
                        <p>
                            <Phone color="#A3A2A2" /> +7 777 77 77
                        </p>
                        <p className="underline">
                            <Linkedin color="#A3A2A2" /> linkedin.com
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[90%] bg-[#9F9F9F] h-[1px] self-center mt-6 mb-4 rounded-full" />
            <div className="mt-2 space-y-2">
                <div className="flex items-start text-sm gap-1">
                    <div className="bg-primaryBlocks size-4 rounded-md shrink-0 inline-block"></div>
                    <p className="-mt-[2px]">
                        Среднее время закрытии вакансии 25 дней
                    </p>
                </div>
                <div className="flex items-start text-sm gap-1">
                    <div className="bg-primaryBlocks size-4 rounded-md shrink-0 inline-block"></div>
                    <p className="-mt-[2px]">
                        Количество нанятых сотрудников: 105
                    </p>
                </div>
            </div>
            <div className="w-[90%] bg-[#9F9F9F] h-[1px] self-center mt-6 mb-4 rounded-full" />
            <div className="flex justify-between">
                <div
                    onClick={() => (window.location.href = '/profile/edit')}
                    className="size-10 bg-gray flex justify-center items-center rounded-xl cursor-pointer"
                >
                    <Image src="/svg/edit.svg" width={24} height={24} alt="" />
                </div>
                <div className="w-24 flex justify-between">
                    <div className="size-10 bg-primaryBlocks flex justify-center items-center rounded-xl cursor-pointer">
                        <Image
                            src="/svg/github.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                    <div className="size-10 bg-primaryBlocks flex justify-center items-center rounded-xl cursor-pointer">
                        <Image
                            src="/svg/telegram.svg"
                            width={21}
                            height={17.5}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
