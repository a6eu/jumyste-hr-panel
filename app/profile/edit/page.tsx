'use client'

import { useState } from 'react'
import { User, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/store'
import { updateProfile } from '@/redux/auth/authSlice'

const EditProfilePage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        name: '',
        position: '',
        phone: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleUpdateProfile = async () => {
        await dispatch(
            updateProfile({
                first_name: formData.name,
            })
        )
    }

    return (
        <div className="relative">
            <div
                onClick={() => router.replace('/profile')}
                className=" absolute top-4 lg:top-6 left-5 lg:left-10 flex justify-center items-center border border-black rounded-full size-[50px] cursor-pointer"
            >
                <ArrowLeft />
            </div>

            <div className="px-4 lg:px-32 pt-20">
                <h1 className="lg:ml-8 font-semibold text-2xl">
                    Редактирование профиля
                </h1>

                <div className="border border-[#E4E4E4] rounded-2xl p-6 mt-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-14">
                    <div className="relative">
                        <div className="bg-secondaryLight size-32 rounded-full flex justify-center items-center">
                            <User size={65} />
                        </div>
                        <div className="bg-[#493D9E] size-[50px] rounded-full flex justify-center items-center absolute -bottom-2 right-0 cursor-pointer">
                            <Image
                                src="/svg/camera.svg"
                                alt=""
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 w-full">
                        <div className="flex flex-col w-full lg:w-[292px]">
                            <label htmlFor="name">ФИО</label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="text"
                                placeholder="Джон Смит Нурланович"
                            />
                        </div>
                        <div className="flex flex-col w-full lg:w-[292px]">
                            <label htmlFor="position">Должность</label>
                            <input
                                id="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="text"
                                placeholder="HR Manager"
                            />
                        </div>
                    </div>
                </div>

                <div className="border border-[#E4E4E4] rounded-2xl p-8 mt-8">
                    <h2 className="font-semibold text-xl mb-4">
                        Общая информация
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="tel"
                                placeholder="+7 777 777 7777"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="linkedin">LinkedIn</label>
                            <input
                                id="linkedin"
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="text"
                                placeholder="linkedin.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="github">Github</label>
                            <input
                                id="github"
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="text"
                                placeholder="github.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="telegram">Telegram</label>
                            <input
                                id="telegram"
                                onChange={handleChange}
                                className="border border-[#9F9F9F] rounded-[5px] pl-[14px] py-3 h-10 w-full"
                                type="text"
                                placeholder="telegram.ru"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-primaryBlocks text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
                    >
                        Сохранить изменения
                    </button>

                    <button className="bg-[#D34343] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                        Удалить аккаунт
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage
